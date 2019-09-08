<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="pagecontainer container">
      <div class="row justify-content-center">
        <Sliderbar/>
        <div class="col-11 col-md-9 mx-lg-auto">
          <div class="row justify-content-center mt-4">
            <div class="col-12 col-md-8 col-lg-6 col-xl-4 mb-4" v-for="item in products" :key="item.id">
              <div class="product_card border p-3">
                <div class="card_tag">{{ item.category }}</div>
                <div class="mt-2" style="height: 150px; background-size: cover; background-position: center"
                  :style="{backgroundImage: `url(${item.imageUrl})`}" @click="goProductPage(item.id)">
                  <div class="card_image w-100 h-100">
                  </div>
                </div>
                <h4 class="card-title py-2">
                  <a href="#" class="text-decoration-none" @click="goProductPage(item.id)">{{ item.title }}</a>
                </h4>
                <div class="card-text">提供：{{ item.content }}</div>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div class="h5 ml-auto" v-if="!item.price">NT${{ item.origin_price }}</div>
                  <del class="text-muted" v-if="item.price">NT${{ item.origin_price }}</del>
                  <div class="h5" v-if="item.price">NT${{ item.price }}</div>
                </div>
                <div class="d-flex justify-content-around">
                  <div class="stock flex-fill text-success" v-if="item.stock > 0">in stock</div>
                  <del class="stock flex-fill text-danger" v-if="item.stock <= 0">out of stock</del>
                  <div class="product_card_icon more mx-2" @click="goProductPage(item.id)">More</div>
                  <div class="product_card_icon cart" v-if="item.stock > 0" @click="addToCart(item.id)"><i class="fas fa-shopping-cart"></i></div>
                </div>
              </div>
            </div>
          </div>
          <Pagination id="pagination" :pages="pagination" v-on:emitpage="getProducts"></Pagination>
          <Modal/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/pagination'
import Sliderbar from './customer_slidebar'
import Modal from './customer_modal'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  components: {
    Pagination,
    Sliderbar,
    Modal
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('productsModules', ['products', 'productsAll', 'pagination'])
  },
  methods: {
    getProducts (page = 1) {
      this.$store.dispatch('productsModules/getProducts', page)
    },
    goProductPage (id) {
      const vm = this
      this.$store.dispatch('productsModules/goProductPage', { vm, id })
    },
    ...mapActions('productsModules', ['getProductsAll']),
    addToCart (id, qty = 1) {
      const cart = {
        product_id: id,
        qty
      }
      this.$store.dispatch('updateLoading', true)
      this.$store.dispatch('cartsModules/addCart', cart)
      this.$store.dispatch('updateLoading', false)
      $('#addedCart').modal('show')
    }
  },
  created () {
    this.getProducts()
    this.getProductsAll()
  }
}
</script>
