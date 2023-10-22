<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserFieldResource;
use App\Filament\Resources\UserResource;
use App\Filament\Resources\UserResource\Widgets\UserStats;
use Filament\Actions\Action;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListUsers extends ListRecords
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('userfields')->label('User Fields')->url(UserFieldResource::getUrl('index')),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            //UserStats::class
        ];
    }
}
