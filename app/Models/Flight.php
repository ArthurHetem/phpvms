<?php

namespace App\Models;

use App\Contracts\Model;
use App\Models\Casts\DistanceCast;
use App\Models\Enums\Days;
use App\Models\Traits\HashIdTrait;
use App\Support\Units\Distance;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;

/**
 * @property string     id
 * @property mixed      ident
 * @property Airline    airline
 * @property int        airline_id
 * @property mixed      flight_number
 * @property mixed      callsign
 * @property mixed      route_code
 * @property int        route_leg
 * @property bool       has_bid
 * @property Collection field_values
 * @property Collection fares
 * @property Collection subfleets
 * @property int        days
 * @property Distance   distance
 * @property Distance   planned_distance
 * @property int        flight_time
 * @property string     route
 * @property string     dpt_time
 * @property string     arr_time
 * @property string     flight_type
 * @property string     notes
 * @property int        level
 * @property float      load_factor
 * @property float      load_factor_variance
 * @property float      pilot_pay
 * @property Airport    dpt_airport
 * @property Airport    arr_airport
 * @property Airport    alt_airport
 * @property string     dpt_airport_id
 * @property string     arr_airport_id
 * @property string     alt_airport_id
 * @property int        event_id
 * @property int        user_id
 * @property int        active
 * @property Carbon     start_date
 * @property Carbon     end_date
 */
class Flight extends Model
{
    use HashIdTrait;
    use HasFactory;
    use SoftDeletes;

    public $table = 'flights';

    /** The form wants this */
    public $hours;

    public $minutes;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'airline_id',
        'flight_number',
        'callsign',
        'route_code',
        'route_leg',
        'dpt_airport_id',
        'arr_airport_id',
        'alt_airport_id',
        'dpt_time',
        'arr_time',
        'days',
        'level',
        'distance',
        'flight_time',
        'flight_type',
        'load_factor',
        'load_factor_variance',
        'pilot_pay',
        'route',
        'notes',
        'start_date',
        'end_date',
        'has_bid',
        'active',
        'visible',
        'event_id',
        'user_id',
    ];

    protected $casts = [
        'flight_number'        => 'integer',
        'days'                 => 'integer',
        'level'                => 'integer',
        'distance'             => DistanceCast::class,
        'flight_time'          => 'integer',
        'start_date'           => 'date',
        'end_date'             => 'date',
        'load_factor'          => 'double',
        'load_factor_variance' => 'double',
        'pilot_pay'            => 'float',
        'has_bid'              => 'boolean',
        'route_leg'            => 'integer',
        'active'               => 'boolean',
        'visible'              => 'boolean',
        'event_id'             => 'integer',
        'user_id'              => 'integer',
    ];

    public static $rules = [
        'airline_id'           => 'required|exists:airlines,id',
        'flight_number'        => 'required',
        'callsign'             => 'string|max:4|nullable',
        'route_code'           => 'nullable',
        'route_leg'            => 'nullable',
        'dpt_airport_id'       => 'required|exists:airports,id',
        'arr_airport_id'       => 'required|exists:airports,id',
        'load_factor'          => 'nullable|numeric',
        'load_factor_variance' => 'nullable|numeric',
        'level'                => 'nullable',
        'event_id'             => 'nullable|numeric',
        'user_id'              => 'nullable|numeric',
    ];

    /**
     * Return all of the flights on any given day(s) of the week
     * Search using bitmasks
     *
     * @param Days[] $days List of the enumerated values
     *
     * @return Flight
     */
    public static function findByDays(array $days)
    {
        /** @noinspection DynamicInvocationViaScopeResolutionInspection */
        $flights = self::where('active', true);
        foreach ($days as $day) {
            $flights = $flights->where('days', '&', $day);
        }

        return $flights;
    }

    /**
     * Get the flight ident, e.,g JBU1900/C.nn/L.yy
     */
    public function ident(): Attribute
    {
        return Attribute::make(
            get: function ($_, $attrs) {
                $flight_id = optional($this->airline)->code;
                $flight_id .= $this->flight_number;

                if (filled($this->route_code)) {
                    $flight_id .= '/C.'.$this->route_code;
                }

                if (filled($this->route_leg)) {
                    $flight_id .= '/L.'.$this->route_leg;
                }

                return $flight_id;
            }
        );
    }

    /**
     * @param $day
     *
     * @return bool
     */
    public function on_day($day): bool
    {
        return ($this->days & $day) === $day;
    }

    /**
     * Return a custom field value
     *
     * @param $field_name
     *
     * @return string
     */
    public function field($field_name): string
    {
        $field = $this->field_values->where('name', $field_name)->first();
        if ($field) {
            return $field['value'];
        }

        return '';
    }

    /**
     * Set the days parameter. If an array is passed, it's
     * AND'd together to create the mask value
     *
     * @return Attribute
     */
    public function days(): Attribute
    {
        return Attribute::make(
            set: function ($value) {
                if (\is_array($value)) {
                    $value = Days::getDaysMask($value);
                }

                return $value;
            }
        );
    }

    /*
     * Relationships
     */
    public function airline(): BelongsTo
    {
        return $this->belongsTo(Airline::class, 'airline_id');
    }

    public function dpt_airport(): HasOne
    {
        return $this->hasOne(Airport::class, 'id', 'dpt_airport_id');
    }

    public function arr_airport(): HasOne
    {
        return $this->hasOne(Airport::class, 'id', 'arr_airport_id');
    }

    public function alt_airport(): HasOne
    {
        return $this->hasOne(Airport::class, 'id', 'alt_airport_id');
    }

    public function fares(): BelongsToMany
    {
        return $this->belongsToMany(Fare::class, 'flight_fare')->withPivot('price', 'cost', 'capacity');
    }

    public function field_values(): HasMany
    {
        return $this->hasMany(FlightFieldValue::class, 'flight_id', 'id');
    }

    public function simbrief(): BelongsTo
    {
        return $this->belongsTo(SimBrief::class, 'id', 'flight_id');
    }

    public function subfleets(): BelongsToMany
    {
        return $this->belongsToMany(Subfleet::class, 'flight_subfleet');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'id', 'event_id');
    }
}
