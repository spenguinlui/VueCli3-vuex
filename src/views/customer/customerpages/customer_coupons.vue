<template>
  <div>
    <div class="modal" id="SeachCoupons" tabindex="-1" role="dialog">
      <div class="modal-dialog w-100 h-75 d-flex justify-content-center align-items-center" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <table class="table">
              <thead class="thead-dark">
                <th>折價券名稱</th>
                <th>折價券序號</th>
              </thead>
              <tbody>
                <tr v-for=" coupon in this.coupons" :key="coupon.code">
                  <td>{{ coupon.name }}</td>
                  <td>{{ coupon.code }}</td>
                </tr>
              </tbody>
            </table>
            <div class="mx-auto text-right pr-4">
                <button type="button" class="btn btn-dark" data-dismiss="modal">確定</button>
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
  computed: {
    coupons () {
      return this.$store.state.coupons
    },
    ...mapGetters('cartsModules', ['coupons'])
  },
  methods: {
    getCoupons () {
      this.$store.commit('cartsModules/GETCOUPONS')
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
