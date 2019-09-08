<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div>
      <div class="pagecontainer container">
        <div class="row justify-content-center mt-5 clearfix">
          <div class="col-11 col-md-6 p-0 mt-5 mr-md-5 float-left">
            <div class="product_pageImage">
              <img :src="productAlone.imageUrl" class="w-100" alt="">
            </div>
          </div>
          <div class="col-11 col-md-5 border float-left mt-5 p-3 position-relative">
            <div class="category bg-dark text-light rounded-pill text-center">{{ productAlone.category }}</div>
            <h1 class="display-4"><strong>{{ productAlone.title }}</strong></h1>
            <p class="lead">{{ productAlone.description }}</p>
            <h6 class="text-secondary">出自：</h6>
            <h5>{{ productAlone.content }}</h5>
            <h5>{{ productAlone.email }}</h5>
            <hr class="my-4">
            <div class="ml-auto p-0 mr-4 clearfix">
              <div class="d-inline-block">現有庫存：{{ productAlone.stock }}{{ productAlone.unit }}</div>
              <div class="h4" v-if="!productAlone.price">{{ productAlone.origin_price }} 元</div>
              <h4 class="text-body float-right" v-if="productAlone.price">NT${{ productAlone.price }}</h4>
              <del class="mr-3 text-muted float-right" v-if="productAlone.price">NT$ {{ productAlone.origin_price }}</del>
            </div>
            <div class="row ml-auto py-3 d-flex justify-content-end">
              <select v-if="productAlone.stock > 0" id="productqty" class="form-control col-5 mr-3" @change="selectNum()">
                <option :value="qty" v-for="qty in productAlone.stock" :key="qty">
                  選購{{ qty }}{{productAlone.unit}}
                </option>
              </select>
              <div class="text-muted  mt-1 col-6 col-md-4" v-if="productAlone.num">總計
                <strong>{{ productAlone.num * productAlone.price }}</strong> 元
              </div>
            </div>
            <div class="">
              <div class="product_pagePrepage float-left" @click="prePage">Back</div>
              <h3 v-if="productAlone.stock == 0" class="text-danger col-6 col-md-4 ml-auto mt-3 d-block">已售完</h3>
              <a v-if="!productAlone.stock == 0" class="btn btn-danger btn-lg col-6 col-md-4 ml-auto mt-3 d-block" @click="addToCart(productAlone.id, productAlone.qty)" href="#" role="button">
                加入購物車</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal/>
  </div>
</template>

<script>
import $ from 'jquery'
import Modal from './customer_modal'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      productId: ''
    }
  },
  components: {
    Modal
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('productsModules', ['productAlone'])
  },
  methods: {
    getProduct () {
      const id = this.productId
      let num = 1
      this.$store.dispatch('productsModules/getProductAlone', { id, num })
    },
    addToCart (id) {
      const cart = {
        product_id: id,
        qty: this.productAlone.num
      }
      this.$store.dispatch('cartsModules/addCart', cart)
      $('#addedCart').modal('show')
    },
    prePage () {
      this.$router.go(-1)
    },
    selectNum () {
      const sel = document.getElementById('productqty')
      const id = this.productId
      let num = sel.value
      if (num > 1) {
        this.$store.dispatch('productsModules/getProductAlone', { id, num })
      }
    }
  },
  created () {
    this.productId = this.$route.params.id
    this.getProduct()
  }
}
</script>
