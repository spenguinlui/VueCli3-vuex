import axios from 'axios'

export default {
  namespaced: true,
  state: {
    cart: { carts: [] },
    coupons: []
  },
  actions: {
    getCart (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true, { root: true })
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('GETCART', response.data.data)
        } else {
          console.log('失敗!')
        }
        context.commit('LOADING', false, { root: true })
      })
    },
    addCart (context, cart) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true, { root: true })
      axios.post(url, { data: cart }).then((response) => {
        if (response.data.success) {
          context.dispatch('getCart')
        } else {
          console.log('失敗!')
        }
        context.commit('LOADING', false, { root: true })
      })
    },
    removeCartItem (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true, { root: true })
      axios.delete(url).then((response) => {
        if (response.data.success) {
          context.commit('LOADING', false, { root: true })
          context.dispatch('getCart')
        } else {
          context.commit('LOADING', false, { root: true })
        }
      })
    },
    addCouponCode (context, { coupon, vm }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      context.commit('LOADING', true, { root: true })
      axios.post(url, { data: coupon }).then((response) => {
        if (response.data.success) {
          context.commit('LOADING', false, { root: true })
          context.dispatch('getCart')
        } else {
          vm.$bus.$emit('messagePush', '折價券無效！', 'warning')
          context.commit('LOADING', false, { root: true })
        }
      })
    },
    clearCart (context, cartAll) {
      context.commit('LOADING', true, { root: true })
      cartAll.forEach(function (e) {
        let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${e.id}`
        axios.delete(url).then((response) => {
          if (response.data.success) {
            context.dispatch('getCart')
            context.commit('LOADING', false, { root: true })
          } else {
            context.commit('LOADING', false, { root: true })
          }
        })
      })
    }
  },
  mutations: {
    GETCART (state, carts) {
      state.cart = carts
    },
    GETCOUPON (state, reward) {
      let addcoupon = state.coupons.every(item => reward !== item)
      if (addcoupon) {
        state.coupons.push(reward)
        localStorage.setItem('coupons', JSON.stringify(state.coupons))
      }
    },
    GETCOUPONS (state) {
      state.coupons = JSON.parse(localStorage.getItem('coupons'))
    }
  },
  getters: {
    cart: state => state.cart,
    cartQty: state => state.cart.carts.length,
    coupons: state => state.coupons
  }
}
