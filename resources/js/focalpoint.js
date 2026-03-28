import FocalPointFieldtype from './FocalPointFieldtype.vue';

Statamic.booting(() => {
    Statamic.$components.register('focalpoint-fieldtype', FocalPointFieldtype);
});
