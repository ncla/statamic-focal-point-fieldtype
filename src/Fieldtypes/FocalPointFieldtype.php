<?php

namespace Ncla\FocalPoint\Fieldtypes;

use Statamic\Fields\Fieldtype;

class FocalPointFieldtype extends Fieldtype
{
    protected static $title = 'Focal Point';

    protected static $handle = 'focalpoint';  
    
    protected $categories = ['media'];

    protected $defaultValue = null;

    protected $defaultable = false;

    protected $icon = 'assets';

    protected $listable = 'hidden';

    public function configFieldItems(): array
    {
        return [
            'assets_field_handle' => [
                'display' => 'Assets Field Handle',
                'instructions' => 'Choose which asset field handle to use for the focal point editor.',
                'type' => 'text',
                'width' => 50,
                'required' => true,
            ],
            'default_value' => [
                'display' => 'Default Value',
                'instructions' => 'The focal point to preview when none has been set (e.g. 50-50-1).',
                'type' => 'text',
                'width' => 50,
                'placeholder' => '50-50-1',
            ],
        ];
    }
}
