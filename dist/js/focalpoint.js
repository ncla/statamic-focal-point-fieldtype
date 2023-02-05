(()=>{"use strict";function t(t,e,s,i,n,a,o,r){var c,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=s,l._compiled=!0),i&&(l.functional=!0),a&&(l._scopeId="data-v-"+a),o?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},l._ssrRegister=c):n&&(c=r?function(){n.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:n),c)if(l.functional){l._injectStyles=c;var m=l.render;l.render=function(t,e){return c.call(e),m(t,e)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,c):[c]}return{exports:t,options:l}}var e=t({props:["x","y","z","imageUrl","imageDimensions"],data:function(){return{frameDimensions:{w:100,h:100}}},mounted:function(){var t=this.$refs.frame;this.frameDimensions={w:t.clientWidth,h:t.clientHeight}},computed:{bgImageDimensions:function(){var t=function(t){return t.w/t.h};return t(this.imageDimensions)>t(this.frameDimensions)?{h:this.frameDimensions.h,w:this.frameDimensions.h/this.imageDimensions.h*this.imageDimensions.w}:{w:this.frameDimensions.w,h:this.frameDimensions.w/this.imageDimensions.w*this.imageDimensions.h}},frameWidthPercent:function(){return this.frameDimensions.w/this.bgImageDimensions.w*100},frameHeightPercent:function(){return this.frameDimensions.h/this.bgImageDimensions.h*100},relOffsetLeft:function(){var t=this.x-this.frameWidthPercent/2;return t=Math.max(t,0),Math.min(t,100-this.frameWidthPercent)},offsetLeft:function(){return this.relOffsetLeft*this.bgImageDimensions.w/100},relOffsetTop:function(){var t=this.y-this.frameHeightPercent/2;return t=Math.max(t,0),Math.min(t,100-this.frameHeightPercent)},offsetTop:function(){return this.relOffsetTop*this.bgImageDimensions.h/100},backgroundPosition:function(){return"-".concat(this.offsetLeft,"px -").concat(this.offsetTop,"px")},transformOrigin:function(){var t={x:(this.x-this.relOffsetLeft)/this.frameWidthPercent*100,y:(this.y-this.relOffsetTop)/this.frameHeightPercent*100};return"".concat(t.x,"% ").concat(t.y,"%")}}},(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{ref:"frame",staticClass:"frame-image",style:{backgroundImage:"url("+encodeURI(t.imageUrl)+")",backgroundPosition:t.backgroundPosition,transform:"scale("+t.z+")",transformOrigin:t.transformOrigin}})}),[],!1,null,null,null);var s=t({components:{FocalPointPreviewFrame:e.exports},props:["data","image"],data:function(){return{x:50,y:50,z:1,imageDimensions:null}},mounted:function(){var t=(this.data||"50-50-1").split("-");this.x=t[0],this.y=t[1],this.z=t[2]||1},computed:{reticleSize:function(){return this.imageDimensions&&this.z?Math.min(this.imageDimensions.w,this.imageDimensions.h)/this.z:0}},methods:{setImageDimensions:function(){var t=this.$refs.image;this.imageDimensions={w:t.clientWidth,h:t.clientHeight}},define:function(t){var e=$(t.target),s=e.width(),i=e.height(),n=t.pageX-e.offset().left,a=t.pageY-e.offset().top;this.x=(n/s*100).toFixed(),this.y=(a/i*100).toFixed()},select:function(){this.$emit("selected",this.x+"-"+this.y+"-"+this.z),this.close()},close:function(){this.$emit("closed")},reset:function(){this.x=50,this.y=50,this.z=1}}},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"focal-point"},[s("div",{staticClass:"focal-point-toolbox card p-0"},[s("div",{staticClass:"p-2"},[s("label",[t._v(t._s(t.__("Focal Point")))]),t._v(" "),s("small",{staticClass:"help-block"},[t._v(t._s(t.__("messages.focal_point_instructions")))]),t._v(" "),s("div",{staticClass:"focal-point-image"},[s("img",{ref:"image",attrs:{src:t.image},on:{click:t.define,load:t.setImageDimensions}}),t._v(" "),s("div",{staticClass:"focal-point-reticle",class:{zoomed:t.z>1},style:{top:t.y+"%",left:t.x+"%",width:t.reticleSize+"px",height:t.reticleSize+"px",marginTop:"-"+t.reticleSize/2+"px",marginLeft:"-"+t.reticleSize/2+"px"}})])]),t._v(" "),s("div",{staticClass:"flex items-center text-sm justify-center mb-2"},[s("div",{staticClass:"flex items-center mx-2"},[s("div",{staticClass:"mr-sm"},[t._v("X")]),t._v(" "),s("div",{staticClass:"value"},[t._v(t._s(t.x)),s("sup",[t._v("%")])])]),t._v(" "),s("div",{staticClass:"flex items-center mx-2"},[s("div",{staticClass:"mr-sm"},[t._v("Y")]),t._v(" "),s("div",{staticClass:"value"},[t._v(t._s(t.y)),s("sup",[t._v("%")])])]),t._v(" "),s("div",{staticClass:"flex items-center mx-2"},[s("div",{staticClass:"mr-sm"},[t._v("Z")]),t._v(" "),s("div",{staticClass:"value"},[t._v(t._s(t.z))])])]),t._v(" "),s("div",{staticClass:"px-2"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.z,expression:"z"}],staticClass:"w-full mb-2",attrs:{type:"range",min:"1",max:"10",step:"0.1"},domProps:{value:t.z},on:{__r:function(e){t.z=e.target.value}}}),t._v(" "),s("div",{staticClass:"mb-1 flex flex-wrap items-center justify-center"},[s("button",{staticClass:"btn mb-1",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.close(e)}}},[t._v(t._s(t.__("Cancel")))]),t._v(" "),s("button",{staticClass:"btn mb-1 btn-default mx-1",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.reset(e)}}},[t._v(t._s(t.__("Reset")))]),t._v(" "),s("button",{staticClass:"btn mb-1 btn-primary",attrs:{type:"button"},on:{click:t.select}},[t._v(t._s(t.__("Finish")))])])]),t._v(" "),s("h6",{staticClass:"p-2 text-center bg-grey-30 rounded-b"},[t._v(t._s(t.__("messages.focal_point_previews_are_examples")))])]),t._v(" "),t._l(9,(function(e){return s("div",{key:e,class:"frame frame-"+e},[t.imageDimensions?s("focal-point-preview-frame",{attrs:{x:t.x,y:t.y,z:t.z,"image-url":t.image,"image-dimensions":t.imageDimensions}}):t._e()],1)}))],2)}),[],!1,null,null,null);const i=t({components:{FocalPointEditor:s.exports},mixins:[Fieldtype],inject:["storeName"],data:function(){return{showFocalPointEditor:!1,error:null}},computed:{coordinates:function(){if(!this.value)return null;if(this.value instanceof Array&&0===this.value.length)return null;var t=this.value.split("-");return{x:t[0],y:t[1],z:t[2]}},coordinatesString:function(){return this.coordinates?"".concat(this.coordinates.x,"-").concat(this.coordinates.y,"-").concat(this.coordinates.z):""},targetAssetFieldHandle:function(){return this.config.assets_field_handle},assetImageUrl:function(){try{return this.$store.state.publish[this.storeName].meta[this.targetAssetFieldHandle].data[0].url}catch(t){return null}},isEditingDisabled:function(){return!1!==this.error},showFocalPointEditor:function(){return this.showFocalPointEditor&&!1===this.error&&this.assetImageUrl}},watch:{assetImageUrl:function(){this.reset(),this.updateErrors()}},mounted:function(){this.updateErrors()},methods:{openFocalPointEditor:function(){this.showFocalPointEditor=!0},closeFocalPointEditor:function(){this.showFocalPointEditor=!1},selectFocalPoint:function(t){this.update(t)},reset:function(){this.update(null)},updateErrors:function(){this.error=this.findErrors()},findErrors:function(){if(!this.config.assets_field_handle)return __("No asset field handle has been set in the field options");var t=this.$store.state.publish[this.storeName].meta;if(!t.hasOwnProperty(this.targetAssetFieldHandle))return __("Linked asset field was not found");var e=t[this.targetAssetFieldHandle];return e.hasOwnProperty("data")?e.data.length>1?__("Focal focus fieldtype only supports a single asset"):1!==e.data.length&&__("No asset has been set"):__("No asset field meta data is available")}}},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("button",{staticClass:"btn w-full flex flex-row items-center justify-center gap-1",attrs:{type:"button",disabled:t.isEditingDisabled},on:{click:t.openFocalPointEditor}},[s("svg-icon",{staticClass:"w-4 h-4",attrs:{name:"pin"}}),t._v(" "),t.error?s("span",{domProps:{textContent:t._s(t.error)}}):t.coordinates?s("span",[s("span",[t._v(t._s(t.__("X"))+": "+t._s(t.coordinates.x)+"%")]),t._v(" "),s("span",{staticClass:"ml-1"},[t._v(t._s(t.__("Y"))+": "+t._s(t.coordinates.y)+"%")]),t._v(" "),s("span",{staticClass:"ml-1"},[t._v(t._s(t.__("Z"))+": "+t._s(t.coordinates.z))])]):s("span",[t._v(t._s(t.__("Set Focal Point")))])],1),t._v(" "),s("portal",{attrs:{to:"outside"}},[t.showFocalPointEditor?s("FocalPointEditor",{attrs:{data:t.coordinatesString,image:t.assetImageUrl},on:{selected:t.selectFocalPoint,closed:t.closeFocalPointEditor}}):t._e()],1)],1)}),[],!1,null,null,null).exports;Statamic.booting((function(){Statamic.$components.register("focalpoint-fieldtype",i)}))})();