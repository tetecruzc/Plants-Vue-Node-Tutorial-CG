import Vue from 'vue'
import Vuex from 'vuex'
import plants from '@/store/plants/plants'
import habitats from '@/store/habitats/habitats'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    plants,
    habitats
  }
})
