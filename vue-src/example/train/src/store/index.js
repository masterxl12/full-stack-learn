import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '../vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '张三',
    age: 29
  },
  getters: {
    getAge(state) {
      return state.age;
    }
  },
  mutations: {
    changeAge(state, payload) {
      state.age += payload;
    }
  },
  actions: {
    changeAgeAsync({ commit }, payload) {
      return new Promise((resolve) => {
        commit("changeAge", payload)
        resolve(payload)
      })
    }
  },
  modules: {
  }
})