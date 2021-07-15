import { createStore } from 'vuex'
import { UserModule } from './User'
export default createStore({
  state: { },

  // Mutations are functions that affect the STATE
  mutations: { },

  // Actions are functions that yhou call throughout yhour app
  //that call mutations
  actions: { },

  //modularize store - divide different modules into different files
  modules: {
    User: UserModule
  }
})
