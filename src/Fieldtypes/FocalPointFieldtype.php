<?php

namespace Ncla\FocalPoint\Fieldtypes;

use Statamic\Fields\Fieldtype;

class FocalPointFieldtype extends Fieldtype
{
    protected static $title = 'Focal Point';

    protected static $handle = 'focalpoint';

    protected $categories = ['media'];

    protected $defaultValue = [];

    protected $defaultable = false;

    protected $icon = 'assets';

    public function configFieldItems(): array
    {
        return [
            'assets_field_handle' => [
                'display' => 'Assets Field Handle',
                'instructions' => 'Choose which asset field handle to use for focal point editor.',
                'type' => 'text',
                'width' => 50
            ],
        ];
    }
}