<template>
  <div>
    <div class="modal" id="addedCart" tabindex="-1" role="dialog">
      <div class="modal-dialog w-100 h-75 d-flex justify-content-center align-items-center" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <p class="text-center">商品已加入購物車</p>
            <div class="text-center">
              <button type="button" class="btn btn-dark mr-5" data-dismiss="modal">確定</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="goToCart">結帳</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToCart () {
      this.$router.push('/cart')
    }
  }
}
</script>
