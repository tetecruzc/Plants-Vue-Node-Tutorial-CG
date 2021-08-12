<template>
  <b-modal centered v-model="show" >
            <template #modal-title>
                Add new plant
            </template>
            <b-card no-body class="p-3 fs-small">
            <div class="d-flex">
                <div class="d-flex flex-column w-50 mx-1">
                    <b-form-group
                    id="fieldset-1"
                    label="Plant name"
                    label-for="name"
                    >
                    <b-form-input id="name" v-model="newPlant.name"  trim></b-form-input>
                </b-form-group>
                <div class="form-group--invalid fs-small" :style="{ visibility: $v.newPlant.name.$error ? 'visible' : 'hidden'}">Required field</div>
                </div>
                <div class="d-flex flex-column w-50 mx-1">
                    <b-form-group
                        id="fieldset-2"
                        label="Plant specie"
                        label-for="species"
                        >
                        <b-form-input id="species" v-model="newPlant.species"  trim></b-form-input>
                    </b-form-group>
                    <div class="form-group--invalid fs-small" :style="{ visibility: $v.newPlant.species.$error ? 'visible' : 'hidden'}">Required field</div>
                </div>
            </div>
            <div class="d-flex flex-column mx-1">
                <label class="fs-small mx-1 mt-3">Choose the habitat</label>
                <b-dropdown
                    :text="newPlant.habitat"
                    block
                    class="mt-1 w-100"
                >
                    <b-dropdown-item v-for="(item, i) in habitats" :key="i" href="#" @click="()=>{newPlant.habitat = item.name; newPlant.idHabitat = item.idHabitat}">{{item.name}}</b-dropdown-item>
                   
                </b-dropdown>
                <div class="form-group--invalid fs-small" :style="{ visibility: $v.newPlant.habitat.$error ? 'visible' : 'hidden'}">Required field</div>
            </div>
                <InputFile class="mt-3" @getImage="getImage" />
                <b-form-rating v-model="newPlant.valuation" variant="warning" class="my-3"></b-form-rating>
                <div class="form-group--invalid fs-small" :style="{ visibility: $v.newPlant.valuation.$error ? 'visible' : 'hidden'}">Required field</div>
            </b-card>
            <template #modal-footer>
                <div class="w-100 d-flex justify-content-around mx-4">
                    <button class="button cancel-button" @click="show = false">Cancelar</button>
                    <button class="button primary-button" @click="addPlant()">Añadir</button>
                </div>
            </template>
  </b-modal>  
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import InputFile from '../../../components/InputFile.vue';
import {habitats, plants} from '../../../store/namespaces';
import PlantsMethods from '../../../store/plants/methods/plants.methods';
import HabitatsMethods from '../../../store/habitats/methods/habitats.methods';
import { Plant } from '../interfaces/plant.interface';
import {Habitat} from '../../habitats/interfaces/habitats.interface';
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

@Component({
    components:{
        InputFile
    },
    mixins: [validationMixin],
    validations:{
        newPlant:{
            name: {required},
            species: {required},
            valuation: {required},
            idHabitat: {required},
            habitat: {required},
            image: {required}
        }
    }
})
export default class TermsPopup extends Vue {
    @Prop() showModal!: boolean;
    show: boolean = false;
    newPlant: Plant = {
        name: '',
        species: '',
        valuation: undefined,
        idHabitat: undefined,
        habitat: '',
        image: ''
    }

    async mounted(){
        if (!await this.fetchHabitats()){
            // SHOW ERROR MESSAGE
        }
    }

    
/* MODAL */
    @Watch('showModal')
     renderModal(){
        this.show = this.showModal;
    }

    @Watch('show')
    sendToParent(newVal: boolean){
        this.$emit('changeModalStatus', newVal)
    }
/* END MODAL */
      state(attr: string) {
        return attr.length >= 4
      }
      invalidFeedback(attr: string) {
        if (attr.length > 0) {
          return 'Debe contener al menos 4 caracteres.'
        }
        return 'Por favor escriba algo.'
      }

      getImage(image: string){
          this.newPlant.image = image
      }

      async addPlant(){  
        this.$v.$touch();
        if (this.$v.newPlant.image!.$error){
            this.showError('Debe anexar la imagen de la planta');
        }
        else if (!this.$v.$invalid){
            if (await this.savePlant(this.newPlant)){
                this.show = false;
                Vue.$toast.open({
                    message: 'Se ha añadido la planta exitosamente',
                    type: 'success',
                })
            this.$emit('plantAdded')
            }else 
                this.showError('Ha ocurrido un error al añadir la planta');
        }
      }

        showError(message: string){
            Vue.$toast.open({
                message: message,
                type: 'error',
            })
        }


  @plants.Action(PlantsMethods.actions.SAVE_PLANT)
  savePlant!: (plant: Plant) => Promise<boolean>
  @habitats.Action(HabitatsMethods.actions.FETCH_HABITATS)
  fetchHabitats!: () => Promise<boolean>
  @habitats.Getter(HabitatsMethods.getters.GET_HABITATS)
  habitats!: Habitat[];
}

</script>

<style lang="scss" >
</style>