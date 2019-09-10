<template>
  <div class="pagecontainer">
    <loading :active.sync="isLoading"></loading>
    <Progress :now="progress" :paid="order.is_paid"/>
    <div class="row justify-content-center">
      <form class="col-11 col-md-6" @submit.prevent="payOrder">
      <!-- 訂單商品 -->
        <table class="table cart-table">
          <thead class="thead-dark">
            <th>品名</th>
            <th>數量</th>
            <th class="text-right pr-3">單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">
                {{ item.product.title }}
            </td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right pr-3">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right pr-3 text-success"><strong>NT$&emsp;{{ order.total }}</strong></td>
            </tr>
          </tfoot>
        </table>
      <!-- 訂單商品 -->
      <!-- 訂單資料 -->
          <table class="table cart-table my-5">
          <tbody>
              <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
              </tr>
              <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
              </tr>
              <tr>
              <th>電話</th>
              <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
              <th>地址</th>
              <td>{{ order.user.address }}</td>
              </tr>
              <tr>
              <th>付款狀態</th>
              <td>
                  <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
              </td>
              </tr>
          </tbody>
          </table>
          <div class="mx-auto d-flex justify-content-between pl-5 pr-5">
              <Back v-if="!order.is_paid"></Back>
              <div class="ml-5">
                  <button class="btn btn-danger" v-if="!order.is_paid === true" @click="payOrder">確認付款</button>
              </div>
          </div>
      <!-- 訂單資料 -->
      </form>
    </div>
  </div>
</template>

<script>
import Back from './customer_back'
import Progress from './customer_cart_progress'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      orderId: '',
      progress: 3
    }
  },
  components: {
    Back,
    Progress
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('orderModules', ['order'])
  },
  methods: {
    getOrder () {
      this.$store.dispatch('orderModules/getOrder', this.orderId)
    },
    payOrder () {
      this.$store.dispatch('orderModules/payOrder', this.orderId)
      this.$store.dispatch('cartsModules/getCart')
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
