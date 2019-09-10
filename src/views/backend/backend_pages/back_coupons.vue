<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <h3 class="my-4">優惠券管理</h3>
        <div class="text-right mt-4">
            <button class="btn btn-info" @click="openModal(true)" type="button">新增優惠券</button>
        </div>
    <!-- 優惠券列表 -->
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th class="text-center" width="180">代碼</th>
                    <th class="text-center" width="180">折扣百分比</th>
                    <th class="text-center" width="180">到期日</th>
                    <th class="text-center" width="180">是否啟用</th>
                    <th class="text-center" width="180">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in coupons" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td class="text-center">{{ item.code }}</td>
                    <td class="text-center">{{ item.percent }}</td>
                    <td class="text-center">{{ item.due_date}}</td>
                    <td class="text-center">
                        <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
                        <span v-else class="text-warning">未啟用</span>
                    </td>
                    <td class="text-center">
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                        <button type="button" class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    <!-- 優惠券列表 -->
    <!-- 分頁元件 -->
        <Pagination :pages="pagination" v-on:emitpage="getCoupons"></Pagination>
    <!-- 分頁元件 -->
    <!-- 新增優惠券Modal -->
        <div class="modal fade" id="couponsModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true" @keydown.enter="updateCoupons">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">折價券名稱</label>
                                    <input type="text" class="form-control" id="title"
                                    placeholder="折價券名稱" v-model="tempCoupons.title">
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                    <label for="category">折扣百分比</label>
                                    <input type="number" class="form-control" id="percent"
                                        placeholder="請輸入折扣百分比" v-model="tempCoupons.percent">
                                    </div>
                                    <div class="form-group col-md-6">
                                    <label for="price">到期日</label>
                                    <input type="date" class="form-control" id="due_date"
                                        v-model="tempCoupons.due_date">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                    <label for="origin_price">優惠券代碼</label>
                                    <input type="text" class="form-control" id="code"
                                        placeholder="請輸入優惠券代碼" v-model="tempCoupons.code">
                                    </div>
                                </div>
                                <hr>
                                <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                    id="is_enabled" v-model="tempCoupons.is_enabled"
                                    :true-value="1" :false-value="0"
                                    >
                                <label class="form-check-label" for="is_enabled">
                                    是否啟用
                                </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-info" @click="updateCoupons">確認</button>
                    </div>
                </div>
            </div>
        </div>
    <!-- 新增優惠券Modal -->
    <!-- 刪除優惠卷Modal -->
        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempCoupons.title }}</strong> 優惠券(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
    <!-- 刪除優惠卷Modal -->
    </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/pagination'

export default {
  data () {
    return {
      coupons: [],
      pagination: {},
      tempCoupons: {
        title: '',
        percent: 100,
        due_date: 0,
        code: '',
        is_enabled: 0
      },
      isNew: false,
      isLoading: true
    }
  },
  methods: {
    getCoupons (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        vm.isLoading = false
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempCoupons = {}
        this.isNew = true
      } else {
        this.tempCoupons = Object.assign({}, item)
        this.isNew = false
      }
      $('#couponsModal').modal('show')
    },
    delModal (item) {
      this.tempCoupons = item
      $('#delCouponModal').modal('show')
    },
    delCoupon () {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.tempCoupons.id}`
      const vm = this
      this.$http.delete(url).then((response) => {
        if (response.data.success) {
          $('#delCouponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#delCouponModal').modal('hide')
          vm.getCoupons()
        }
      })
    },
    updateCoupons () {
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      const vm = this
      let httpMethods = 'post'
      if (!vm.isNew) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.tempCoupons.id}`
        httpMethods = 'put'
      }
      this.$http[httpMethods](url, { data: vm.tempCoupons }).then((response) => {
        if (response.data.success) {
          $('#couponsModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponsModal').modal('hide')
          vm.getCoupons()
        }
      })
    }
  },
  components: {
    Pagination
  },
  created () {
    this.getCoupons()
  }
}
</script>
