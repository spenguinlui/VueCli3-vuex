<template>
  <div>
    <div class="cart-progress row col-12 col-sm-10 col-xl-8 d-flex justify-content-center mx-auto my-5">
      <div class="cart-progress-sign" :class="{active: now == 1}">
        <i class="fas fa-shopping-cart"></i>
      </div>
    <div class="col-3 col-xl-2 cart-progress-line" :class="{active: now == 1}">購物明細</div>
    <div class="cart-progress-sign" :class="{active: now == 2}">
      <i class="fas fa-clipboard-list"></i>
    </div>
      <div class="col-3 col-xl-2 cart-progress-line" :class="{active: now == 2}">填寫資料</div>
      <div class="cart-progress-sign" :class="{active: now == 3 && !paid}">
        <i class="fas fa-donate"></i>
      </div>
      <div class="col-3 col-xl-2 cart-progress-line" :class="{active: now == 3 && !paid}">確認付款</div>
      <div class="cart-progress-sign" :class="{haspaid: paid}">
        <i class="fas fa-check-circle"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['now', 'paid']
}
</script>
