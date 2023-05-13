<template>
  <div
    class="focal-point-fieldtype"
    :class="{
      'narrow-level-1': containerWidth < 220,
      'narrow-level-2': containerWidth < 170
    }"
  >
    <element-container @resized="containerWidth = $event.width;">
      <div>
        <button
          class="btn w-full flex flex-row items-center justify-center text-center gap-1"
          type="button"
          :disabled="isEditingDisabled"
          @click="openFocalPointEditor"
        >
          <svg-icon name="pin" class="pin-icon flex-shrink-0 w-4 h-4"/>
          <span
            class="error overflow-hidden truncate"
            :title="error"
            v-if="error"
            v-text="error"
          ></span>
          <span
            class="call-to-action"
            v-else-if="!coordinates"
          >{{ __('Set Focal Point') }}</span>
          <span class="coordinates flex-row gap-1" v-else>
            <span>{{ __('X') }}: {{ coordinates.x }}%</span>
            <span>{{ __('Y') }}: {{ coordinates.y }}%</span>
            <span>{{ __('Z') }}: {{ coordinates.z }}</span>
          </span>
          <span
            class="coordinates-simple"
            v-if="coordinates"
            v-text="coordinatesString"
          ></span>
        </button>
      </div>
    </element-container>

    <FocalPointEditor
      v-if="showFocalPointEditor"
      :data="coordinatesString"
      :image="assetImageUrl"
      @selected="selectFocalPoint"
      @closed="closeFocalPointEditor"
    ></FocalPointEditor>
  </div>
</template>

<style type="text/css" scoped>
.gap-1 {
  gap: 0.25rem;
}

.coordinates-simple {
  display: none;
}

.coordinates {
  display: flex;
}

.focal-point-fieldtype.narrow-level-2 .coordinates {
  display: none;
}

.focal-point-fieldtype.narrow-level-2 .coordinates-simple {
  display: inline;
}

.focal-point-fieldtype.narrow-level-1 svg {
  display: none;
}
</style>

<script>
// TODO: Check if there is better way to import from core
import FocalPointEditor from "../../vendor/statamic/cms/resources/js/components/assets/Editor/FocalPointEditor";

export default {
  components: {FocalPointEditor},
  mixins: [Fieldtype],
  inject: ['storeName'],
  data() {
    return {
      showFocalPointEditor: false,
      error: null,
      containerWidth: null
    };
  },
  computed: {
    coordinates() {
      if (!this.value) {
        return null;
      }

      if (this.value instanceof Array && this.value.length === 0) {
        return null;
      }

      const coordinatesString = this.value.split('-');

      return {
        x: coordinatesString[0],
        y: coordinatesString[1],
        z: coordinatesString[2],
      }
    },
    coordinatesString() {
      if (!this.coordinates) {
        return '';
      }

      return `${this.coordinates.x}-${this.coordinates.y}-${this.coordinates.z}`;
    },
    targetAssetFieldHandle() {
      return this.config.assets_field_handle;
    },
    assetImageUrl() {
      try {
        return this.meta[this.targetAssetFieldHandle].data[0].url
      } catch (e) {
        return null;
      }
    },
    isEditingDisabled() {
      return this.error !== false
    },
    showFocalPointEditor() {
      return this.showFocalPointEditor && this.error === false && this.assetImageUrl;
    },
    meta() {
      if (!this.namePrefix) {
        return this.$store.state.publish[this.storeName].meta
      }

      let parent = this.$parent.$parent

      while (parent.meta === undefined) {
        parent = parent.$parent
      }

      return parent.meta
    }
  },
  watch: {
    assetImageUrl() {
      this.reset();
      this.updateErrors();
    }
  },
  mounted() {
    this.updateErrors();
  },
  methods: {
    openFocalPointEditor() {
      this.showFocalPointEditor = true;
    },
    closeFocalPointEditor() {
      this.showFocalPointEditor = false;
    },
    selectFocalPoint(point) {
      this.update(point)
    },
    reset() {
      this.update(null);
    },
    updateErrors() {
      this.error = this.findErrors();
    },
    findErrors() {
      if (!this.config.assets_field_handle) {
        return __('No asset field handle has been set in the field options');
      }

      if (!this.meta.hasOwnProperty(this.targetAssetFieldHandle)) {
        return __('Linked asset field was not found');
      }

      const fieldMeta = this.meta[this.targetAssetFieldHandle];

      if (!fieldMeta.hasOwnProperty('data')) {
        return __('No asset field meta data is available');
      }

      if (fieldMeta.data.length > 1) {
        return __('Focal focus fieldtype only supports a single asset');
      }

      if (fieldMeta.data.length !== 1) {
        return __('No asset has been set');
      }

      return false;
    },
  },
};
</script>