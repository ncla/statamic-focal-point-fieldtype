<?php

namespace Ncla\FocalPoint;

use Ncla\FocalPoint\Fieldtypes\FocalPointFieldtype;
use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $translations = true;

    protected $fieldtypes = [
        FocalPointFieldtype::class,
    ];

    protected $stylesheets = [
        __DIR__.'/../dist/css/focalpoint.css',
    ];

    protected $scripts = [
        __DIR__.'/../dist/js/focalpoint.js',
    ];
}
