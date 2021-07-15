export const UserModule = {
    namespaced: true, //be able to reference the module first then we can move
                        // the normal incex store portion here


    state: {
        user: null
    },

    // Mutations are functions that affect the STATE
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        }
    },

    // Actions are functions that yhou call throughout yhour app
    //that call mutations
    actions: {
        setUser({ commit }, user) {
            commit('SET_USER', user);
        }
    },
}