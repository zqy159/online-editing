import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        buildData: {

        }
    },
    mutations: {
        muBuildData(state, valueData) {
            console.log(valueData)
            state.buildData = valueData
        }
    },
    actions: {
    },
    modules: {
    }
})
