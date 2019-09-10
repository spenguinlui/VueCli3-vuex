<template>
  <div class="pagecontainer">
  <!-- 建立訂單 -->
    <Progress :now="progress"></Progress>
    <div class="row justify-content-center">
      <form class="col-10 col-md-6 mx-auto p-3 cart-table" @submit.prevent="creatOrder">
        <div class="form-group">
          <label for="username">Your name</label>
          <input type="text" class="form-control" name="name" id="username"
            :class="{'is-invalid': errors.has('name')}"
            v-model="form.user.name" v-validate="'required'" placeholder="請填寫姓名">
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-validate="'required|email'" :class="{'is-invalid': errors.has('email')}"
            v-model="form.user.email" placeholder="請輸入 Email">
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <label for="usertel">Your phone</label>
          <input type="tel" class="form-control" id="usertel" name="phone"
            :class="{'is-invalid': errors.has('phone')}"
            v-validate="'required'" v-model="form.user.tel" placeholder="請輸入電話">
          <span class="text-danger" v-if="errors.has('phone')">手機欄位不得留空</span>
        </div>
        <div class="form-group">
          <label for="useraddress">Your address</label>
          <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
            placeholder="請輸入地址" v-validate="'required'" :class="{'is-invalid': errors.has('address')}">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>
        <div class="form-group">
          <label for="comment">message</label>
          <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="d-flex justify-content-between px-5">
          <Back/>
          <div class="textbutton" @click="creatOrder">Next</div>
        </div>
      </form>
    </div>
  <!-- 建立訂單 -->
  </div>
</template>

<script>
import Back from './customer_back'
import Progress from './customer_cart_progress'

export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      progress: 2
    }
  },
  components: {
    Back,
    Progress
  },
  methods: {
    creatOrder () {
      const vm = this
      const order = vm.form
      vm.$validator.validate().then((valid) => {
        if (valid) {
          vm.$store.dispatch('orderModules/creatOrder', { order, vm })
        } else {
          const message = '欄位不完整'
          const status = 'danger'
          this.$store.dispatch('messagePush', { message, status })
        }
      })
    }
  }
}
</script>
