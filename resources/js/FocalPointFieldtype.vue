<template>
    <div>
        <div v-if="error" class="help-block text-red-500">
            <p>{{ error }}</p>
        </div>

        <template v-else>
            <div
                class="inline-block w-[130px] overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-850"
                :class="{ 'opacity-75': isDisabled }"
            >
                <!-- Image area -->
                <div class="relative aspect-square bg-gray-100 dark:bg-gray-900">
                    <div v-if="isDisabled" class="absolute inset-0 flex items-center justify-center p-2">
                        <p class="text-center text-xs text-gray-500 dark:text-gray-400">
                            {{ __('The :attribute field must contain an image.').replace(':attribute', targetAssetFieldHandle) }}
                        </p>
                    </div>
                    <div v-else class="absolute inset-0" :style="previewStyle" />

                    <!-- Hover overlay -->
                    <div v-if="!isDisabled" class="absolute inset-0 flex items-center justify-center gap-2 opacity-0 duration-100 hover:opacity-100">
                        <Button size="sm" icon="focus" icon-only @click="openFocalPointEditor" :aria-label="coordinates ? __('Edit Focal Point') : __('Set Focal Point')" />
                        <Button v-if="coordinates" size="sm" icon="x" icon-only @click="reset" :aria-label="__('Reset')" />
                    </div>
                </div>

                <!-- Coordinates footer -->
                <div class="border-t border-gray-300 px-2 py-1 dark:border-gray-700">
                    <div class="truncate text-center text-xs text-gray-600 dark:text-gray-400">
                        <template v-if="effectiveCoordinates">
                            {{ effectiveCoordinates.x }}% {{ effectiveCoordinates.y }}% {{ effectiveCoordinates.z }}&times;
                        </template>
                        <template v-else>
                            50% 50% 1&times;
                        </template>
                    </div>
                </div>
            </div>

            <FocalPointEditor
                v-if="showFocalPointEditor && assetImageUrl"
                :data="coordinatesString || defaultCoordinatesString"
                :image="assetImageUrl"
                @selected="selectFocalPoint"
                @closed="closeFocalPointEditor"
            />
        </template>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { Fieldtype } from '@statamic/cms';
import { Button, injectPublishContext } from '@statamic/cms/ui';
import FocalPointEditor from '@statamic-src/components/assets/Editor/FocalPointEditor.vue';

const emit = defineEmits(Fieldtype.emits);
const props = defineProps(Fieldtype.props);
const { expose, update } = Fieldtype.use(emit, props);
defineExpose(expose);

const THUMBNAIL_SIZE = 130;

const showFocalPointEditor = ref(false);
const error = ref(null);
const imageDimensions = ref(null);

const publishContext = injectPublishContext();

const targetAssetFieldHandle = computed(() => props.config?.assets_field_handle);

const assetFieldMeta = computed(() => {
    if (!targetAssetFieldHandle.value || !publishContext) {
        return null;
    }

    const meta = publishContext.meta?.value ?? publishContext.meta;
    const key = [props.metaPathPrefix, targetAssetFieldHandle.value].filter(Boolean).join('.');

    return data_get(meta, key, null);
});

const assetImageUrl = computed(() => {
    try {
        return assetFieldMeta.value.data[0].url;
    } catch (e) {
        return null;
    }
});

const parseCoordinates = (value) => {
    if (!value || typeof value !== 'string') {
        return null;
    }

    const parts = value.split('-');

    if (parts.length < 3) {
        return null;
    }

    return {
        x: Number(parts[0]),
        y: Number(parts[1]),
        z: Number(parts[2]),
    };
};

const coordinates = computed(() => parseCoordinates(props.value));

const defaultCoordinates = computed(() => parseCoordinates(props.config?.default_value));

const effectiveCoordinates = computed(() => coordinates.value ?? defaultCoordinates.value);

const coordinatesString = computed(() => {
    if (!coordinates.value) {
        return '';
    }

    return `${coordinates.value.x}-${coordinates.value.y}-${coordinates.value.z}`;
});

const defaultCoordinatesString = computed(() => {
    if (!defaultCoordinates.value) {
        return '';
    }

    return `${defaultCoordinates.value.x}-${defaultCoordinates.value.y}-${defaultCoordinates.value.z}`;
});

const isDisabled = computed(() => {
    if (error.value) return true;

    const data = assetFieldMeta.value?.data ?? [];

    return data.length === 0 || data.length > 1;
});

// Replicates Glide's runCropResize algorithm exactly.
// resolveCropResizeDimensions → scale by zoom → resolveCropOffset → crop.
const previewStyle = computed(() => {
    if (!assetImageUrl.value) {
        return {};
    }

    const base = {
        backgroundImage: `url('${assetImageUrl.value}')`,
        backgroundRepeat: 'no-repeat',
    };

    if (!effectiveCoordinates.value || !imageDimensions.value) {
        return { ...base, backgroundSize: 'cover', backgroundPosition: '50% 50%' };
    }

    const { x, y, z } = effectiveCoordinates.value;
    const { w: Sw, h: Sh } = imageDimensions.value;
    const W = THUMBNAIL_SIZE;
    const H = THUMBNAIL_SIZE;

    // Step 1: resolveCropResizeDimensions — cover resize (no zoom yet)
    let Rw, Rh;
    if (H > W * (Sh / Sw)) {
        Rw = H * (Sw / Sh);
        Rh = H;
    } else {
        Rw = W;
        Rh = W * (Sh / Sw);
    }

    // Step 2: apply zoom
    const bgW = Math.round(Rw * z);
    const bgH = Math.round(Rh * z);

    // Step 3: resolveCropOffset — center crop on focal point, clamped
    const offsetX = Math.max(0, Math.min((bgW * x / 100) - (W / 2), bgW - W));
    const offsetY = Math.max(0, Math.min((bgH * y / 100) - (H / 2), bgH - H));

    return {
        ...base,
        backgroundSize: `${bgW}px ${bgH}px`,
        backgroundPosition: `${-offsetX}px ${-offsetY}px`,
    };
});

const findErrors = () => {
    if (!props.config?.assets_field_handle) {
        return __('No asset field handle has been set in the field options');
    }

    if (assetFieldMeta.value === null) {
        return __('Linked asset field was not found');
    }

    return false;
};

const updateErrors = () => {
    error.value = findErrors();
};

watch(
    assetImageUrl,
    (newUrl, oldUrl) => {
        if (oldUrl !== undefined && newUrl !== oldUrl) {
            reset();
            imageDimensions.value = null;
        }

        updateErrors();

        if (newUrl) {
            const img = new Image();
            img.onload = () => { imageDimensions.value = { w: img.naturalWidth, h: img.naturalHeight }; };
            img.src = newUrl;
        }
    },
    { immediate: true },
);

const openFocalPointEditor = () => {
    showFocalPointEditor.value = true;
};

const closeFocalPointEditor = () => {
    showFocalPointEditor.value = false;
};

const selectFocalPoint = (point) => {
    update(point);
    closeFocalPointEditor();
};

const reset = () => {
    update(null);
};
</script>
