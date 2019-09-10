<template>
  <div>
    <div class="pagecontainer container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 mx-auto mt-3">
          <h3 class="text-center">查詢我的訂單</h3>
          <div class="mx-auto order_search">
            <input class="border border-dark mr-2" type="text" v-model="isEmail" placeholder="請輸入您的E-mail" @keydown.enter="getOrder">
            <button class="btn btn-dark btn-sm" @click="getOrder">查詢</button>
          </div>
          <div class="cart-table mt-4 p-3" v-for=" (item, key) in orderFilter" :key="item.id">
            <div v-if="orderFilter.length !== 0">
              <div class="mb-3 d-flex justify-content-between">
                <h4>＃我的訂單 - 編號{{ key + 1 }}</h4>
                <button type="button" class="btn btn-outline-dark btn-sm text-center" @click="goOrder(item.id)">進入頁面</button>
              </div>
              <div class="list-group list-group-flush">
                <div class="list-group-item list-group-item-dark">訂單成立日期</div>
                <div class="list-group-item">{{ item.create_at | date }}</div>
              </div>
              <div class="list-group list-group-flush">
                <div class="list-group-item list-group-item-dark">訂購人訊息</div>
                <div class="list-group-item">
                  <ul class="list-unstyled">
                    <li>姓名：{{ item.user.name }}</li>
                    <li>電話：{{ item.user.tel }}</li>
                    <li>信箱：{{ item.user.email }}</li>
                    <li>地址：{{ item.user.address }}</li>
                  </ul>
                </div>
              </div>
              <div class="list-group list-group-flush">
                <div class="list-group-item list-group-item-dark">訂單內容</div>
                <div class="list-group-item">
                  <ul class="list-unstyled">
                    <li v-for="(product, i) in item.products" :key="i">
                      {{ product.product.title }} 數量：{{ product.qty }}
                      {{ product.product.unit }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="list-group list-group-flush">
                <div class="list-group-item list-group-item-dark">訂單金額</div>
                <div class="list-group-item">{{ item.total | currency }}</div>
              </div>
              <div class="list-group list-group-flush">
                <div class="list-group-item list-group-item-dark">是否付款</div>
                <div class="list-group-item">
                  <div v-if="item.is_paid" class="text-success">已付款</div>
                  <div v-else class="text-danger">未付款</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isEmail: ''
    }
  },
  computed: {
    ...mapGetters('orderModules', ['orderFilter'])
  },
  methods: {
    getAllOrders (page = 1) {
      this.$store.dispatch('orderModules/getAllOrders', page)
    },
    getOrder () {
      let orderEmail = this.isEmail
      this.$store.commit('orderModules/ORDERFILTER', orderEmail)
    },
    goOrder (id) {
      const vm = this
      vm.$router.push(`/checkout/${id}`)
    }
  },
  created () {
    this.getAllOrders()
  }
}
</script>
