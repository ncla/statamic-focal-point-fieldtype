# Focal Point Fieldtype

The Statamic control panel has very useful focal point selection tool, unfortunately you can only set one focal point only for one asset. Fortunately this addon provides a fieldtype that allows you to set focal point in a separate field for an asset that has been linked in an assets field.

This addon can be useful in situations such as:
- You want to change focal point between responsive breakpoints
- Your site has the same asset appearing in multiple places and you do not want them all to share the same focal point

## Installation

Require it using Composer.

```
composer require ncla/statamic-focal-point-fieldtype
```

## Fieldtype

As any fieldtype, you can add it through control panel interface. You will find the fieldtype in the "Media" category. In field options, you wil just have to define "Assets Field Handle" and that is it.

Alternatively if you are feeling hacker vibes, you can of course add this fieldtype to your fields by editing blueprint file directly:
```yaml
-
    handle: focal_point_field
    field:
        display: 'Focal Point'
        type: focalpoint
        icon: assets
        listable: hidden
        instructions_position: above
        visibility: visible
        always_save: false
        # Here you specify the handle of the asset field that we will be getting image from for focal point setter
        assets_field_handle: assets_field
-
    handle: assets_field
    field:
        # ..
```

## Templating

Once focal point is set, you can pass it in your templates to Glide tag like this:

```antlers
{{
    glide
    :src="assets_field"
    fit="crop-{ focal_point_field }"
}}
```

If you are using [Responsive Images addon](https://github.com/spatie/statamic-responsive-images) then here is an example of having two different focal points for two breakpoints:

```antlers
{{
    responsive:assets_field
    glide:fit="crop-{ focal_point_mobile }"
    lg:glide:fit="crop-{ focal_point_desktop }"
}}
```

