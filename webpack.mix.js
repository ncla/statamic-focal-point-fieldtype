let mix = require("laravel-mix");

mix.js("resources/js/focalpoint.js", "dist/js").vue();
mix.styles("resources/css/focalpoint.css", "dist/css/focalpoint.css");
