<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FlightResource\Pages;
use App\Filament\Resources\FlightResource\RelationManagers;
use App\Models\Enums\Days;
use App\Models\Enums\FlightType;
use App\Models\Flight;
use App\Repositories\AirlineRepository;
use App\Repositories\AirportRepository;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FlightResource extends Resource
{
    protected static ?string $model = Flight::class;

    protected static ?string $navigationGroup = 'Operations';
    protected static ?int $navigationSort = 2;

    protected static ?string $navigationLabel = 'Flights';

    protected static ?string $navigationIcon = 'heroicon-o-adjustments-vertical';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        $airportRepo = app(AirportRepository::class);
        $airports = $airportRepo->all()->mapWithKeys(fn ($item) => [$item->id => $item->icao.' - '.$item->name]);

        return $form
            ->schema([
                Forms\Components\Grid::make()->schema([
                    Forms\Components\Section::make('flight_information')->heading('Flight Information')->schema([
                        Forms\Components\Select::make('airline_id')
                            ->label('Airline')
                            ->options(app(AirlineRepository::class)->all()->pluck('name', 'id'))
                            ->searchable()
                            ->required()
                            ->native(false),

                        Forms\Components\Select::make('flight_type')
                            ->searchable()
                            ->native(false)
                            ->required()
                            ->options(FlightType::select()),

                        Forms\Components\TextInput::make('callsign')->string()->maxLength(4),

                        Forms\Components\TextInput::make('flight_number')->integer()->required(),
                        Forms\Components\TextInput::make('route_code')->string()->maxLength(5),
                        Forms\Components\TextInput::make('route_leg')->integer(),

                        Forms\Components\TextInput::make('hours')->label('Flight Time Hours')->integer()->required(),
                        Forms\Components\TextInput::make('minutes')->label('Flight Time Minutes')->integer()->required(),

                        Forms\Components\TextInput::make('pilot_pay')->numeric()->helperText('Fill this in to pay a pilot a fixed amount for this flight.'),
                        Forms\Components\Grid::make()->schema([
                            Forms\Components\TextInput::make('load_factor')->numeric()->helperText('Percentage value for pax/cargo load, leave blank to use the default value.'),
                            Forms\Components\TextInput::make('load_factor_variance')->numeric()->helperText('Percentage of how much the load can vary (+/-), leave blank to use the default value.'),

                        ])->columnSpan(3),
                    ])->columns(3)->columnSpan(['lg' => 2]),
                    Forms\Components\Section::make('scheduling')->heading('Scheduling')->schema([
                        Forms\Components\DatePicker::make('start_date')->native(false)->minDate(now()),
                        Forms\Components\DatePicker::make('end_date')->native(false)->minDate(now()),

                        Forms\Components\Select::make('days')
                            ->options(Days::labels())
                            ->multiple()
                            ->native(false),

                        Forms\Components\TimePicker::make('dpt_time')->seconds(false)->label('Departure Time'),
                        Forms\Components\TimePicker::make('arr_time')->seconds(false)->label('Arrival Time'),
                    ])->columnSpan(1),
                ])->columns(3),

                Forms\Components\Section::make('route')->heading('Route')->schema([
                    Forms\Components\Grid::make()->schema([
                        // If we want to use an async search we need to change the dpt_airport relationship from hasOne to belongsTo (to use the relationship() method)
                        Forms\Components\Select::make('dpt_airport_id')
                            ->label('Departure Airport')
                            ->options($airports)
                            ->searchable()
                            ->required()
                            ->native(false),

                        Forms\Components\Select::make('arr_airport_id')
                            ->label('Arrival Airport')
                            ->options($airports)
                            ->searchable()
                            ->required()
                            ->native(false),
                    ])->columns(2),

                    Forms\Components\Textarea::make('route'),

                    Forms\Components\Grid::make('')->schema([
                        Forms\Components\Select::make('alt_aiport_id')
                            ->label('Alternate Airport')
                            ->options($airports)
                            ->searchable()
                            ->native(false),

                        Forms\Components\TextInput::make('flight_type')->integer()->hint('In feet'),
                        Forms\Components\TextInput::make('distance')->integer()->hint('In nautical miles'),
                    ])->columns(3),
                ]),

                Forms\Components\Section::make('remarks')->heading('Remarks')->schema([
                    Forms\Components\RichEditor::make('notes')->columnSpanFull(),
                    Forms\Components\Toggle::make('active')->offIcon('heroicon-m-x-circle')->offColor('danger')->onIcon('heroicon-m-check-circle')->onColor('success'),
                    Forms\Components\Toggle::make('visible')->offIcon('heroicon-m-x-circle')->offColor('danger')->onIcon('heroicon-m-check-circle')->onColor('success'),
                ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('ident')->label('Flight #'),
                TextColumn::make('dpt_airport_id')->label('Dep')->searchable(),
                TextColumn::make('arr_airport_id')->label('Arr')->searchable(),
                TextColumn::make('dpt_time')->label('Dpt Time'),
                TextColumn::make('arr_time')->label('Arr Time'),
                TextColumn::make('notes')->label('Notes'),
                IconColumn::make('active')->label('Active')->color(fn ($record) => $record->active ? 'success' : 'danger')->icon(fn ($state) => $state ? 'heroicon-o-check-circle' : 'heroicon-o-x-circle'),
                IconColumn::make('visible')->label('Visible')->color(fn ($record) => $record->visible ? 'success' : 'danger')->icon(fn ($record) => $record->visible ? 'heroicon-o-check-circle' : 'heroicon-o-x-circle'),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\ForceDeleteAction::make(),
                Tables\Actions\RestoreAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ])
            ->emptyStateActions([
                Tables\Actions\CreateAction::make()->label('Add Flight'),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\SubfleetsRelationManager::class,
            RelationManagers\FieldValuesRelationManager::class,
            RelationManagers\FaresRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListFlights::route('/'),
            'create' => Pages\CreateFlight::route('/create'),
            'edit'   => Pages\EditFlight::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
