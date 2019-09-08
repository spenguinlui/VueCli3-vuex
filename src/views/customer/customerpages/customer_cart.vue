<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div id="cart" class="pagecontainer cart container mx-auto">
      <Progress :now="progress"></Progress>
  <!-- 購物車 -->
      <div class="row justify-content-center">
        <table class="table cart-table col-11 col-sm-10 col-xl-8 mx-auto">
          <thead class="thead-dark">
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th class="text-right pr-3">單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle">
              <button @click="removeCartItem(item.id)" type="button" class="btn btn-outline-danger btn-sm">
              <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">
              已套用優惠券
              </div>
            </td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right pr-3">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
            <td></td>
            <td><button v-if="!cart.carts.length == 0" class="btn btn-outline-danger" @click="clearCart">清空購物車</button></td>
            <td class="text-right">總計</td>
            <td class="text-right pr-3">NT$&emsp;{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success pr-3">NT$&emsp;{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
    <!-- 購物車 -->
      </div>
      <div class="row justify-content-center">
    <!-- 套用折價券 -->
        <table class="table cart-table mb-3 mt-5 col-11 col-sm-10 col-xl-6 mx-auto">
          <thead class="thead-dark">
            <th>優惠券</th>
            <th>
              <button class="btn btn-outline-light" @click="searchCoupons">查詢可用優惠券</button>
            </th>
          </thead>
          <tbody>
            <td class="ml-2">請輸入優惠券序號&emsp;
              <input class="border border-dark" type="text" v-model="coupon_code" @keydown.enter="addCouponCode">
            </td>
            <td>
              <button class="btn btn-outline-dark" type="button" @click="addCouponCode">套用優惠碼</button>
            </td>
          </tbody>
        </table>
    <!-- 套用折價券 -->
      </div>
      <div class="row justify-content-center">
    <!-- 下方三按鈕 -->
        <div class="col-11 col-sm-10 col-xl-6 my-5 mx-auto d-flex justify-content-between">
          <Back></Back>
          <router-link class="textbutton" v-if="!cart.carts.length == 0" to="/order_form">Next</router-link>
          <router-link class="btn btn-outline-success" v-if="cart.carts.length == 0" to="/products">重新選購</router-link>
        </div>
    <!-- 下方三按鈕 -->
      </div>
    </div>
    <SearchCoupon/>
  </div>
</template>

<script>
import $ from 'jquery'
import Back from './customer_back'
import Progress from './customer_cart_progress'
import SearchCoupon from './customer_coupons'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      coupon_code: '',
      progress: 1
    }
  },
  components: {
    Back,
    Progress,
    SearchCoupon
  },
  computed: {
    ...mapGetters('cartsModules', ['cart']),
    ...mapGetters(['isLoading'])
  },
  methods: {
    ...mapActions('cartsModules', ['getCart']),
    removeCartItem (id) {
      this.$store.dispatch('cartsModules/removeCartItem', id)
    },
    addCouponCode () {
      const vm = this
      const coupon = {
        code: vm.coupon_code
      }
      this.$store.dispatch('cartsModules/addCouponCode', { coupon, vm })
    },
    clearCart () {
      let cartAll = this.cart.carts
      this.$store.dispatch('cartsModules/clearCart', cartAll)
    },
    searchCoupons () {
      $('#SeachCoupons').modal('show')
    }
  },
  created () {
    this.getCart()
  }
}
</script>
