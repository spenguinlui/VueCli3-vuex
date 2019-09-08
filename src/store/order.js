import axios from 'axios'

export default {
  namespaced: true,
  state: {
    orders: [],
    orderEmail: '',
    order: { user: {} }
  },
  actions: {
    getAllOrders (context, page) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`
      axios.get(url).then((response) => {
        context.commit('GETALLORDERS', response.data.orders)
      })
    },
    creatOrder (context, { order, vm }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      context.commit('LOADING', true, { root: true })
      axios.post(url, { data: order }).then((response) => {
        context.commit('LOADING', false, { root: true })
        vm.$router.push(`checkout/${response.data.orderId}`)
      })
    },
    getOrder (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`
      context.commit('LOADING', true, { root: true })
      axios.get(url).then((response) => {
        context.commit('LOADING', false, { root: true })
        context.commit('GETORDER', response.data.order)
      })
    },
    payOrder (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`
      context.commit('LOADING', true, { root: true })
      axios.post(url).then((response) => {
        context.commit('LOADING', false, { root: true })
        context.dispatch('getOrder', id)
        /* context.dispatch('cartsModules/getCart') */
      })
    }
  },
  mutations: {
    GETALLORDERS (state, orders) {
      state.orders = orders
    },
    ORDERFILTER (state, email) {
      state.orderEmail = email
    },
    GETORDER (state, order) {
      state.order = order
    }
  },
  getters: {
    order: state => state.order,
    orderFilter: state => {
      return state.orders.filter(item =>
        item.user.email === state.orderEmail)
    }
  }
}
