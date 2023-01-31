import FocalPointFieldtype from "./FocalPointFieldtype";

Statamic.booting(() => {
    Statamic.$components.register('focalpoint-fieldtype', FocalPointFieldtype);
})
