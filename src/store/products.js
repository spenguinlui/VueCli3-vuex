import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    productsAll: [],
    productAlone: {},
    pagination: {},
    price1: 0,
    price2: 99999999999999,
    categories: 'all'
  },
  actions: {
    getProducts (context, page) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      context.commit('LOADING', true, { root: true })
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products)
        context.commit('PAGINATION', response.data.pagination)
        context.commit('LOADING', false, { root: true })
      })
    },
    goProductPage (context, { vm, id }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      context.commit('LOADING', true, { root: true })
      axios.get(url).then((response) => {
        context.commit('PRODUCTALONE', response.data.product)
        context.commit('LOADING', false, { root: true })
        vm.$router.push(`product_page/${id}`)
      })
    },
    getProductAlone (context, { id, num }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      context.commit('LOADING', true, { root: true })
      axios.get(url).then((response) => {
        response.data.product.num = num
        context.commit('PRODUCTALONE', response.data.product)
        context.commit('LOADING', false, { root: true })
      })
    },
    getProductsAll (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true, { root: true })
      axios.get(url).then((response) => {
        context.commit('PRODUCTSALL', response.data.products)
        context.commit('LOADING', false, { root: true })
      })
    }
  },
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PRODUCTALONE (state, payload) {
      state.productAlone = payload
    },
    SELECTNUM (state, qty) {
      state.productAlone.qty = qty
    },
    PAGINATION (state, page) {
      state.pagination = page
      if (page !== 0) {
        localStorage.setItem('pagination', JSON.stringify(state.pagination))
      }
    },
    PRODUCTSALL (state, payload) {
      state.productsAll = payload
      localStorage.setItem('productsAll', JSON.stringify(state.productsAll))
    },
    PRICECHANGE (state, { price1, price2 }) {
      state.price1 = price1
      state.price2 = price2
      state.products = JSON.parse(localStorage.getItem('productsAll'))
    },
    CATEGORIESCHANGE (state, categories) {
      state.categories = categories
      state.products = JSON.parse(localStorage.getItem('productsAll'))
    }
  },
  getters: {
    products: state => {
      return state.products
        .filter(item => item.category === state.categories || state.categories === 'all')
        .filter(item => state.price1 < item.origin_price && item.origin_price < state.price2)
        .filter(item => item.is_enabled === 1)
    },
    productsAll: state => {
      return state.productsAll.filter(item => item.is_enabled === 1)
    },
    productAlone: state => state.productAlone,
    productAloneId: state => state.productAlone.id,
    pagination: state => state.pagination
  }
}
