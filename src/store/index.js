import Vue from 'vue'
import Vuex from 'vuex'
import characters from './modules/characters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        characters,
    },
    strict: debug,
})