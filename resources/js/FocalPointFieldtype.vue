<template>
  <div>
    <button
        class="btn w-full flex flex-row items-center justify-center gap-1"
        type="button"
        :disabled="isEditingDisabled"
        @click="openFocalPointEditor"
    >
      <svg-icon name="pin" class="w-4 h-4"/>
      <span v-if="error" v-text="error"></span>
      <span v-else-if="!coordinates">{{ __('Set Focal Point') }}</span>
      <span v-else>
        <span>{{ __('X') }}: {{ coordinates.x }}%</span>
        <span class="ml-1">{{ __('Y') }}: {{ coordinates.y }}%</span>
        <span class="ml-1">{{ __('Z') }}: {{ coordinates.z }}</span>
      </span>
    </button>

    <portal to="outside">
      <FocalPointEditor
          v-if="showFocalPointEditor"
          :data="coordinatesString"
          :image="assetImageUrl"
          @selected="selectFocalPoint"
          @closed="closeFocalPointEditor"
      ></FocalPointEditor>
    </portal>
  </div>
</template>

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
        return this.$store.state.publish[this.storeName].meta[this.targetAssetFieldHandle].data[0].url
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

      const meta = this.$store.state.publish[this.storeName].meta;

      if (!meta.hasOwnProperty(this.targetAssetFieldHandle)) {
        return __('Linked asset field was not found');
      }

      const fieldMeta = meta[this.targetAssetFieldHandle];

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