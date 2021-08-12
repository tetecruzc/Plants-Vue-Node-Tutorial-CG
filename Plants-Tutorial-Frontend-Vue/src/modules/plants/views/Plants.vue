<template>
    <b-container>
      <b-row class="mt-5">
        <b-col sm="12" md="6" >
            <b-form-group
                label-for="filter-input"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Filter"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                  </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-col>
        <b-col sm="12" md="3" class="ml-auto">
          <button class="button primary-button" @click="addPlantModal = true">Add a new plant</button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
          <b-table :filter="filter" :per-page="itemsPerPage" :current-page="currentPage" striped hover sortable :items="plants" :fields="plantFields" bordered :busy="isLoading">
            <template #cell(verified)="data">
              <b class="badges" :class="getStatus(data.value)">{{ getStatusName(data.value)  }}</b>
            </template>
            <template #cell(valuation)="data">
               {{data.value}} / 5
            </template>
            <template #cell()="row" style="width: 7rem;">
                {{row.value}}
            </template>
            <template #cell(actions)="data">
                <b-button size="sm" variant="outline-danger" class="mx-1">
                  <b-icon icon="trash" aria-label="Help"></b-icon>
                </b-button>
                {{data.value}}
                <b-button size="sm" variant="outline-primary" class="mx-1">
                  <b-icon icon="pencil" aria-label="Help"></b-icon>
                </b-button>
            </template> 
            <template #table-busy>
              <div class="text-center text-danger my-5">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>       
        </b-table>
      </b-row>
      <b-row>
          <b-col sm="7" md="4" class="my-1 mx-auto">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="itemsPerPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
      </b-row>
       <AddPlantPopup
                    :showModal="addPlantModal"
                    @changeModalStatus="changeAddPlantModalStatus"
                    @plantAdded="plantAdded"
                />
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddPlantPopup from '../components/AddPlantPopup.vue';
import {plants} from '../../../store/namespaces';
import PlantsMethods from '../../../store/plants/methods/plants.methods';
import {Plant} from '../interfaces/plant.interface';
import { Socket } from 'vue-socket.io-extended'

@Component({
  components: {
    AddPlantPopup
  },
})
export default class Plants extends Vue {
        addPlantModal : boolean = false;
        isLoading : boolean = true;
        plantFields: Array<any> = []
        currentPage: number = 1;
        itemsPerPage: number = 5;
        totalRows: number = 0;
        filter = null;
        
    @Socket()
      connect(){
    }

    listenVerifications(plant : Plant) {
        let index = this.plants.findIndex(el => el.idPlant === plant.idPlant);
        this.plants[index].verified = plant.verified;
        this.plants[index].valuation = plant.valuation;
    }

    created(){ 
       this.$socket.client.on('plant_verify',this.listenVerifications)
    }

      mounted(){
        this.plantAdded();        
      }

      async plantAdded(){
          this.isLoading = true;
        if (await this.fetchPlants()){
            this.plantFields = Object.keys(this.plants[0]);
            this.plantFields.push('actions');
            this.isLoading = false;
            this.totalRows = this.plants.length;
        }else{
        //     Vue.$toast.open({
        //         message: 'Ha ocurrido un error consultando las plantas',
        //         type: 'error',
        // });
        }
      }

      getStatus(status: boolean) : string{
          return 'badge--'+status.toString()
      }
      getStatusName(status: boolean) : string{
        switch(status) {
          case true:
            return 'Verificado'
          case false:
            return 'No verificado'
          default:
            return 'No verificado'
        }
      }

    /* MODAL */
    changeAddPlantModalStatus(newVal: boolean) {
        this.addPlantModal = newVal;
    }

    /* END MODAL */


  @plants.Action(PlantsMethods.actions.FETCH_PLANTS)
  fetchPlants!: () => Promise<boolean>;
  
  @plants.Getter(PlantsMethods.getters.GET_PLANTS)
    plants!: Plant[];
}
</script>

<style scoped>
.home{
  height: 100vh;
}
.table{
  font-size: 13px;
  background-color:  #fff;
}
</style>