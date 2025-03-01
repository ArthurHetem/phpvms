<?php

namespace App\Http\Controllers\Frontend;

use App\Contracts\Controller;
use App\Models\Bid;
use App\Models\Enums\FlightType;
use App\Models\Flight;
use App\Repositories\AirlineRepository;
use App\Repositories\AirportRepository;
use App\Repositories\Criteria\WhereCriteria;
use App\Repositories\FlightRepository;
use App\Repositories\SubfleetRepository;
use App\Repositories\UserRepository;
use App\Services\GeoService;
use App\Services\ModuleService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use Laracasts\Flash\Flash;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;

class FlightController extends Controller
{
    /**
     * @param AirlineRepository  $airlineRepo
     * @param AirportRepository  $airportRepo
     * @param FlightRepository   $flightRepo
     * @param GeoService         $geoSvc
     * @param ModuleService      $moduleSvc
     * @param SubfleetRepository $subfleetRepo
     * @param UserRepository     $userRepo
     * @param UserService        $userSvc
     */
    public function __construct(
        private readonly AirlineRepository $airlineRepo,
        private readonly AirportRepository $airportRepo,
        private readonly FlightRepository $flightRepo,
        private readonly GeoService $geoSvc,
        private readonly ModuleService $moduleSvc,
        private readonly SubfleetRepository $subfleetRepo,
        private readonly UserRepository $userRepo,
        private readonly UserService $userSvc
    ) {
    }

    /**
     * @param Request $request
     *
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     *
     * @return View
     */
    public function index(Request $request): View
    {
        return $this->search($request);
    }

    /**
     * Make a search request using the Repository search
     *
     * @param Request $request
     *
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     *
     * @return View
     */
    public function search(Request $request): View
    {
        $where = [
            'active'  => true,
            'visible' => true,
        ];

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->loadMissing('current_airport');

        if (setting('pilots.restrict_to_company')) {
            $where['airline_id'] = $user->airline_id;
        }

        // default restrictions on the flights shown. Handle search differently
        if (setting('pilots.only_flights_from_current')) {
            $where['dpt_airport_id'] = $user->curr_airport_id;
        }

        $this->flightRepo->resetCriteria();

        try {
            $this->flightRepo->searchCriteria($request);
            $this->flightRepo->pushCriteria(new WhereCriteria($request, $where, [
                'airline' => ['active' => true],
            ]));

            $this->flightRepo->pushCriteria(new RequestCriteria($request));
        } catch (RepositoryException $e) {
            Log::emergency($e);
        }

        // Filter flights according to user capabilities (by rank or by type rating etc)
        $filter_by_user = (setting('pireps.restrict_aircraft_to_rank', true) || setting('pireps.restrict_aircraft_to_typerating', false)) ? true : false;

        if ($filter_by_user) {
            // Get allowed subfleets for the user
            $user_subfleets = $this->userSvc->getAllowableSubfleets($user)->pluck('id')->toArray();
            // Get flight_id's from relationships (group by flight id to reduce the array size)
            $allowed_flights = DB::table('flight_subfleet')
            ->select('flight_id')
            ->whereIn('subfleet_id', $user_subfleets)
                ->groupBy('flight_id')
                ->pluck('flight_id')
                ->toArray();
        } else {
            $allowed_flights = [];
        }

        // Get only used Flight Types for the search form
        // And filter according to settings
        $usedtypes = Flight::select('flight_type')
            ->where($where)
            ->groupby('flight_type')
            ->orderby('flight_type')
            ->get();

        // Build collection with type codes and labels
        $flight_types = collect('', '');
        foreach ($usedtypes as $ftype) {
            $flight_types->put($ftype->flight_type, FlightType::label($ftype->flight_type));
        }

        $flights = $this->flightRepo->searchCriteria($request)
            ->with([
                'airline',
                'alt_airport',
                'arr_airport',
                'dpt_airport',
                'subfleets.airline',
                'simbrief' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                },
            ])
            ->when($filter_by_user, function ($query) use ($allowed_flights) {
                return $query->whereIn('id', $allowed_flights);
            })
            ->orderBy('flight_number')
            ->orderBy('route_leg')
            ->paginate();

        $saved_flights = [];
        $bids = Bid::where('user_id', Auth::id())->get();
        foreach ($bids as $bid) {
            if (!$bid->flight) {
                $bid->delete();
                continue;
            }

            $saved_flights[$bid->flight_id] = $bid->id;
        }

        return view('flights.index', [
            'user'          => $user,
            'airlines'      => $this->airlineRepo->selectBoxList(true),
            'airports'      => $this->airportRepo->selectBoxList(true),
            'flights'       => $flights,
            'saved'         => $saved_flights,
            'subfleets'     => $this->subfleetRepo->selectBoxList(true),
            'flight_number' => $request->input('flight_number'),
            'flight_types'  => $flight_types,
            'flight_type'   => $request->input('flight_type'),
            'arr_icao'      => $request->input('arr_icao'),
            'dep_icao'      => $request->input('dep_icao'),
            'subfleet_id'   => $request->input('subfleet_id'),
            'simbrief'      => !empty(setting('simbrief.api_key')),
            'simbrief_bids' => setting('simbrief.only_bids'),
            'acars_plugin'  => $this->moduleSvc->isModuleActive('VMSAcars'),
        ]);
    }

    /**
     * Find the user's bids and display them
     *
     * @param Request $request
     *
     * @return View
     */
    public function bids(Request $request): View
    {
        $user = $this->userRepo
            ->with(['bids', 'bids.flight'])
            ->find(Auth::user()->id);

        $flights = collect();
        $saved_flights = [];
        foreach ($user->bids as $bid) {
            // Remove any invalid bids (flight doesn't exist or something)
            if (!$bid->flight) {
                $bid->delete();
                continue;
            }

            $flights->add($bid->flight);
            $saved_flights[$bid->flight_id] = $bid->id;
        }

        return view('flights.bids', [
            'user'          => $user,
            'airlines'      => $this->airlineRepo->selectBoxList(true),
            'airports'      => $this->airportRepo->selectBoxList(true),
            'flights'       => $flights,
            'saved'         => $saved_flights,
            'subfleets'     => $this->subfleetRepo->selectBoxList(true),
            'simbrief'      => !empty(setting('simbrief.api_key')),
            'simbrief_bids' => setting('simbrief.only_bids'),
            'acars_plugin'  => $this->moduleSvc->isModuleActive('VMSAcars'),
        ]);
    }

    /**
     * Show the flight information page
     *
     * @param string $id
     *
     * @return mixed
     */
    public function show(string $id): View
    {
        $user_id = Auth::id();
        // Support retrieval of deleted relationships
        $with_flight = [
            'airline' => function ($query) {
                return $query->withTrashed();
            },
            'alt_airport' => function ($query) {
                return $query->withTrashed();
            },
            'arr_airport' => function ($query) {
                return $query->withTrashed();
            },
            'dpt_airport' => function ($query) {
                return $query->withTrashed();
            },
            'subfleets.airline',
            'simbrief' => function ($query) use ($user_id) {
                $query->where('user_id', $user_id);
            },
        ];

        $flight = $this->flightRepo->with($with_flight)->find($id);
        if (empty($flight)) {
            Flash::error('Flight not found!');
            return redirect(route('frontend.dashboard.index'));
        }

        $map_features = $this->geoSvc->flightGeoJson($flight);

        // See if the user has a bid for this flight
        $bid = Bid::where(['user_id' => $user_id, 'flight_id' => $flight->id])->first();

        return view('flights.show', [
            'flight'       => $flight,
            'map_features' => $map_features,
            'bid'          => $bid,
            'acars_plugin' => $this->moduleSvc->isModuleActive('VMSAcars'),
        ]);
    }
}
