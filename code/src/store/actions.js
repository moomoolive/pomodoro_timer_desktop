export default {
    changeInterval({ commit }, payload) {
        commit('changeInterval', payload)
    },
    changeAppMode({ commit }, mode) {
        commit('changeAppmode', mode)
    },
    incrementSesssionNumber({ commit }, number) {
        commit('incrementSesssionNumber', number)
    },
    updatedSelectedTime({ commit }, payload) {
        commit('updatedSelectedTime', payload)
    },
    screenSize({ commit }, boolean) {
        commit('screenSize', boolean)
    },
    updateCurrentSession({ commit }, value) {
        commit('updateCurrentSession', value)
    },
    setDefaults({ commit }, payload) {
        commit('setDefaults', payload)
    },
    changeSound({ commit }, payload) {
        commit('changeSound', payload)
    }
}