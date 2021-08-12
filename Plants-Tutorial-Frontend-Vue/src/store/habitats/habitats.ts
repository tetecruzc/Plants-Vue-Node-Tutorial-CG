import { Module } from 'vuex';
import HabitatsMethods from '@/store/habitats/methods/habitats.methods';
import { HABITATS_EMPTY_STATE } from './habitats.state';
import { HabitatstateInterface } from './interfaces/habitats.state.interface';
import { Habitat } from '@/modules/habitats/interfaces/habitats.interface';
import { habitatsHttpRepository } from '@/modules/habitats/repositories/habitats.repository';

const habitats: Module<HabitatstateInterface, any> = {
    namespaced: true,
    state: HABITATS_EMPTY_STATE,
    getters: {
        [HabitatsMethods.getters.GET_HABITATS](state): Habitat[] {
            return state.habitats;
        }
    },
    mutations: {
        [HabitatsMethods.mutations.SET_HABITATS](state, habitats: Habitat[]): void {
            state.habitats = habitats;
        }
    },
    actions: {
        async [HabitatsMethods.actions.FETCH_HABITATS]({ commit }): Promise<boolean> {
            try {
                const habitats: Habitat[] = await habitatsHttpRepository.getHabitats();
                if (habitats.length){
                    commit(HabitatsMethods.mutations.SET_HABITATS, habitats);
                    return true;
                }
                return false
            } catch (e) {
                return false;
            }
        }
    },
};

export default habitats;
