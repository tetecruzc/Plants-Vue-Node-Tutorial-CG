<template>
  <div class="file-input-container">
     <div class="no-image" v-if="!hasImage">
          <SvgIcon name="upload" styles="icon" />
          <label class="mt-3 text-align-center fs-small">Arrastra y suelta el archivo para subirlo</label>
          <label class="text-align-center">o</label>             
     </div>
      <div class="image-container" v-else>
          <img v-if="!showDoc" :src="imageSrc" @error="showDoc = true" />
          <SvgIcon v-else name="document" styles="document"/>
          <div class="mx-3">
              <label for="" class="fs-small">{{image.name}}</label>
              <div class="flex flex-column">
                  <div  class="progress-bar mt-1"><div class="percent" :style="'width:'+progress.width"></div></div>
                  <label class="mt-2 fs-small text-align-end">{{progress.width}}</label>
              </div>
             <div class="icon-close-container" @click="clearImage()">
                  <SvgIcon name="x-close" styles="icon-close"  />
             </div>
          </div>
      </div>
      <b-form-file class="file-input" v-model="image" :state="Boolean(image)" placeholder="Choose an image"  drop-placeholder="Drop file here..." :accept="formatString"></b-form-file>
      <button class="button dark-button mt-3 fs-small" v-if="!hasImage">Selecciona archivo</button>
      <div class="size fs-smaller fst-italic fw-light mt-2">Tamaño sugerido. Máx 10 MB. Formato JPG, PNG, PDF</div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop} from 'vue-property-decorator';
import SvgIcon from '@/components/SvgIcon.vue';
 
@Component({
    components: {
        SvgIcon,
    },
})
export default class InputFile extends Vue {
    @Prop() formats? : Array<string>;
    image : any = null;
    imageSrc : any = null
    progress = {
        width: '0%',
    };
    imageType = false;
    showDoc = false;
    get hasImage() {
      return !!this.image;
    }




    @Watch('image')
    watchImage(newValue : any, oldValue : any) {
      if (newValue !== oldValue) {
        if (newValue) {
          this.base64Encode(newValue)
            .then(value => {
              this.imageSrc = value;
            })
            .catch(() => {
              this.imageSrc = null;
            });
        } else {
          this.imageSrc = null;
        }
      }
    }

    base64Encode(data: any){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onprogress = this.updateProgress;
            reader.onload = () => {
                this.progress.width = '100%'
                resolve(reader.result)
                this.imageType = this.isImage(reader.result!)
                this.docReady()
            };
            reader.onerror = error => reject(error);
        })
    };

    isImage(content: string | ArrayBuffer ) : boolean{
        if (typeof content !== 'string') content = content.toString();
        if (content.includes('data:image/')) return true
        return false
    }

    updateProgress(evt: ProgressEvent) {
        if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        // Increase the progress bar length.
        if (percentLoaded < 100) {
            this.progress.width = percentLoaded + '%';
        }
        }
    }

    get formatString() : string{
      let result = '';
      if (this.formats)
      this.formats.forEach(el =>{
          result += el+', '
      })
      return result
    }

    clearImage() {
      this.image = null;
    }
    docReady() {
      let maxSixe = 10000000; //10MB
      if (this.image.size > maxSixe){
        Vue.$toast.open({
                message: 'La imagen debe ser menor a 10MB.',
                type: 'error',
        });
        this.image = null;
      }
      else if (this.formats && !this.formats.includes(this.image.type)){
         Vue.$toast.open({
                message: 'La imagen debe ser del tipo mencionado.',
                type: 'error',
        });
        this.image = null;
      }
      else  this.$emit('getImage', this.image)
    }
}
</script>


<style lang="scss">

</style>


