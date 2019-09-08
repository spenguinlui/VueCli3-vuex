import axios from 'axios'

export default {
  namespaced: true,
  state: {
    bproducts: [],
    bpagination: {}
  },
  actions: {
    getBProducts (context, page) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      context.commit('LOADING', true, { root: true })
      axios.get(url).then((response) => {
        context.commit('LOADING', false, { root: true })
        context.commit('BPRODUCTS', response.data.products)
        context.commit('BPAGINATION', response.data.pagination)
      })
    },
    delProduct (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`
      context.commit('LOADING', true, { root: true })
      axios.delete(url).then((response) => {
        context.dispatch('getBProducts')
        context.commit('LOADING', false, { root: true })
      })
    },
    uploadFile (context, { formData, vm }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      context.commit('LOADING', true, { root: true })
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        if (response.data.success) {
          let data = response.data.imageUrl
          context.commit('TEMPPRODUCTIMG', { vm, data })
        } else {
          const message = response.data.message
          const status = 'danger'
          this.$store.dispatch('messagePush', { message, status })
        }
      })
      context.commit('LOADING', false, { root: true })
    },
    updateProduct (context, { updateFile, httpMethod }) {
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${updateFile.id}`
      axios[httpMethod](url, { data: updateFile }).then((response) => {
        if (response.data.success) {
          context.dispatch('getBProducts')
        } else {
          console.log('上傳失敗')
        }
      })
    }
  },
  mutations: {
    BPRODUCTS (state, products) {
      state.bproducts = products
    },
    BPAGINATION (state, pagination) {
      state.bpagination = pagination
    },
    TEMPPRODUCTIMG (state, { vm, data }) {
      vm.$set(vm.tempProducts, 'imageUrl', data)
    }
  },
  getters: {
    products: state => state.bproducts,
    pagination: state => state.bpagination
  }
}
