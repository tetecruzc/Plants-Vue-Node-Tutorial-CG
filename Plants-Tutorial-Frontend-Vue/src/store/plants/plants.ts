import { Module } from 'vuex';
import PlantsMethods from '@/store/plants/methods/plants.methods';
import { PLANTS_EMPTY_STATE } from './plants.state';
import { PlantStateInterface } from './interfaces/plants.state.interface';
import { Plant } from '@/modules/plants/interfaces/plant.interface';
import { plantsHttpRepository } from '@/modules/plants/repositories/plant.repository';

const plants: Module<PlantStateInterface, any> = {
    namespaced: true,
    state: PLANTS_EMPTY_STATE,
    getters: {
        [PlantsMethods.getters.GET_PLANTS](state): Plant[] {
            return state.plants;
        }
    },
    mutations: {
        [PlantsMethods.mutations.SET_PLANTS](state, plants: Plant[]): void {
            state.plants = plants;
        }
    },
    actions: {
        async [PlantsMethods.actions.FETCH_PLANTS]({ commit }): Promise<boolean> {
            try {
                const plants: Plant[] = await plantsHttpRepository.getPlants();
                if (plants.length){
                    commit(PlantsMethods.mutations.SET_PLANTS, plants);
                    return true;
                }
                return false
            } catch (e) {
                return false;
            }
        },
        async [PlantsMethods.actions.SAVE_PLANT]({ commit }, plant : Plant ): Promise<boolean> {
            try {
                const response: {status?: string} = await plantsHttpRepository.savePlant(plant)
                if (response.status === "Plant saved"){
                    return true;
                }
                return false
            } catch (e) {
                return false;
            }
        }
    },
};

export default plants;
