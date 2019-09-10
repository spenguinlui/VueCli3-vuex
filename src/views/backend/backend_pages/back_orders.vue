<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <h3 class="my-4">訂單管理</h3>
    <!-- 訂單列表 -->
        <table class="table mt-4">
            <thead>
                <tr>
                    <td width="60">序號</td>
                    <td>訂單成立日期</td>
                    <td>訂購人訊息</td>
                    <td>訂單內容</td>
                    <td>訂單金額</td>
                    <td class="text-center">是否付款</td>
                    <td class="text-center">編輯</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for=" (item) in orders" :key="item.id">
                    <td>{{ item.num }}</td>
                    <td>{{ item.create_at | date }}</td>
                    <td>
                        <ul class="list-unstyled">
                            <li>姓名：{{ item.user.name }}</li>
                            <li>電話：{{ item.user.tel }}</li>
                            <li>信箱：{{ item.user.email }}</li>
                            <li>地址：{{ item.user.address }}</li>
                        </ul>
                    <td>
                        <ul class="list-unstyled">
                            <li v-for="(product, i) in item.products" :key="i">
                                {{ product.product.title }} 數量：{{ product.qty }}
                                {{ product.product.unit }}
                            </li>
                        </ul>
                    </td>
                    <td>{{ item.total | currency }}</td>
                    <td v-if="item.is_paid" class="text-success text-center">已付款</td>
                    <td v-else class="text-danger text-center">未付款</td>
                    <td class="text-center">
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="openMadel(item)">編輯</button>
                        <button type="button" class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    <!-- 訂單列表 -->
    <Pagination :pages="pagination" v-on:emitpage="getOrders"></Pagination>
    <!-- 編輯訂單Modal -->
        <div class="modal fade" id="ordertModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>修改訂單序號_{{ tempOrder.num }}</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-8">
                                <div class="form-group">
                                <h6>訂購人資訊</h6>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="title">訂購人姓名</label>
                                            <input v-model="tempOrder.user.name" type="text" class="form-control" id="title">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="title">聯絡電話</label>
                                            <input v-model="tempOrder.user.tel" type="text" class="form-control" id="title">
                                        </div>
                                    </div>
                                    <label for="title">電子信箱</label>
                                    <input v-model="tempOrder.user.email" type="text" class="form-control" id="title">
                                    <label for="title">收件地址</label>
                                    <input v-model="tempOrder.user.address" type="text" class="form-control" id="title">
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <h6>結帳資訊</h6>
                                    <label for="order-total">訂單金額</label>
                                    <input v-model="tempOrder.total" type="text" class="form-control" id="order-total">
                                    <div class="form-check mt-3">
                                    <input class="form-check-input" type="checkbox"
                                        id="is_paid" v-model="tempOrder.is_paid"
                                        :true-value="1" :false-value="0"
                                        >
                                    <label class="form-check-label" for="is_paid">
                                        是否付款
                                    </label>
                                    </div>
                                    <label for="message">訂單備註</label>
                                    <textarea v-model="tempOrder.message" cols="5" rows="3" class="form-control" id="message"></textarea>
                                </div>
                            </div>
                        </div>
                            <hr>
                            <h6>訂單內容</h6>
                            <div class="form-grop" v-for="(product, i) in tempOrder.products" :key="i">
                                {{ product.product.title }}
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                    <label for="product-price">單價</label>
                                    <input type="number" class="form-control" id="product-price"
                                        v-model="product.product.price">
                                    </div>
                                    <div class="form-group col-md-6">
                                    <label for="product-number">數量</label>
                                    <input type="number" class="form-control" id="product-number"
                                        v-model="product.qty">
                                    </div>
                                    <div :v-text="product.total">總計{{ product.product.price * product.qty}}</div>
                                </div>
                            </div>
                            <label for="product-total">訂單總額</label>
                            <input type="number" class="form-control" id="product-total"
                                v-model="tempOrder.total">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateOrder">確認</button>
                    </div>
                </div>
            </div>
        </div>
    <!-- 編輯訂單Modal -->
    <!-- 刪除訂單Modal -->
        <div class="modal fade" id="delOrderModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>取消訂單</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    是否刪除 <strong class="text-danger">序號{{ tempOrder.num }}</strong> 訂單(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="delOrder">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
    <!-- 刪除訂單Modal -->
    </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/pagination'
export default {
  data () {
    return {
      orders:
        [
          {
            create_at: '',
            is_paid: false,
            message: '',
            paid_date: '',
            payment_method: '信用卡付款',
            products: [],
            total: '',
            num: '',
            user:
            {
              address: '',
              email: '',
              name: '',
              tel: ''
            }
          }
        ],
      tempOrder: {
        user: {
          address: '',
          email: '',
          name: '',
          tel: ''
        }
      },
      edit: false,
      pagination: {},
      isLoading: false
    }
  },
  methods: {
    getOrders (page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        vm.isLoading = false
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
      })
    },
    openMadel (item) {
      this.tempOrder = item
      $('#ordertModal').modal('show')
    },
    delModal (item) {
      this.tempOrder = item
      $('#delOrderModal ').modal('show')
    },
    delOrder () {
      /* 研究中 */
    },
    updateOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`
      vm.isLoading = true
      this.$http.put(url, { data: vm.tempOrder }).then((response) => {
        if (response.data.success) {
          vm.getOrders()
          vm.isLoading = false
          $('#ordertModal').modal('hide')
        } else {
          console.log(response)
        }
      })
    }
  },
  components: {
    Pagination
  },
  created () {
    this.getOrders()
  }
}
</script>
