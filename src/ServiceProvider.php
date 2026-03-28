<?php

namespace Ncla\FocalPoint;

use Ncla\FocalPoint\Fieldtypes\FocalPointFieldtype;
use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $fieldtypes = [
        FocalPointFieldtype::class,
    ];

    protected $vite = [
        'input' => [
            'resources/js/focalpoint.js',
            'resources/css/focalpoint.css',
        ],
        'publicDirectory' => 'resources/dist',
    ];
}
