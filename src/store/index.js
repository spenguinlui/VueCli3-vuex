import Vue from 'vue'
import Vuex from 'vuex'

import productsModules from './products'
import cartsModules from './cart'
import orderModules from './order'
import backModules from './back'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    messages: []
  },
  actions: {
    updateLoading (context, states) {
      context.commit('LOADING', states)
    },
    messagePush (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('MESSAGES', { message, status, timestamp })
      setTimeout(() => {
        context.commit('MESSAGESClOSE')
      }, 5000)
    }
  },
  mutations: {
    LOADING (state, states) {
      state.isLoading = states
    },
    MESSAGES (state, { message, status, timestamp }) {
      state.messages.push({
        message,
        status,
        timestamp
      })
    },
    MESSAGESClOSE (state) {
      state.messages.splice(0, 1)
    }
  },
  getters: {
    isLoading: state => state.isLoading,
    messages: state => state.messages
  },
  modules: {
    productsModules,
    cartsModules,
    orderModules,
    backModules
  }
})
