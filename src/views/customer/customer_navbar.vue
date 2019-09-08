<template>
  <div>
  <!-- 小視窗模式 -->
    <div class="m_navbar pos-f-t fixed-top">
      <nav class="navbar navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link class="m_nev" to="/">Home</router-link>
        <router-link class="m_nev" to="/cart"><i class="fas pr-3 fa-shopping-cart position-relative"><div class="cartq">{{ cartQty }}</div></i></router-link>
      </nav>
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4 text-light">
          <router-link class="nav-item nav-link m_nev" data-toggle="collapse" data-target="#navbarToggleExternalContent" to="/products"><i class="fas pr-2 fa-gift"></i>Products</router-link>
          <router-link class="nav-item nav-link m_nev" data-toggle="collapse" data-target="#navbarToggleExternalContent" to="/order_page"><i class="fas pr-2 fa-clipboard-list"></i>Order</router-link>
          <router-link class="nav-item nav-link m_nev" data-toggle="collapse" data-target="#navbarToggleExternalContent" to="/contact"><i class="far pr-2 fa-envelope"></i>Contact Us</router-link>
          <router-link class="nav-item nav-link m_nev" data-toggle="collapse" data-target="#navbarToggleExternalContent" to="/admin"><i class="fas pr-2 fa-cog"></i>Admin</router-link>
        </div>
      </div>
    </div>
  <!-- 小視窗模式 -->
  <!-- 正常模式 -->
    <div class="pc_navbar fixed-top">
      <div class="navbar navbar-light flex-md-nowrap p-0">
        <router-link class="brand nav-link col-2 mr-auto" href="#" to="/"><strong>Home</strong></router-link>
        <router-link class="nav-item nav-link" href="#" to="/products"><i class="fas ml-5 pr-2 fa-gift"></i>Products</router-link>
        <router-link class="nav-item nav-link" href="#" to="/cart"><i class="fas pr-2 fa-shopping-cart position-relative"><div class="cartq">{{ cartQty }}</div></i>Cart</router-link>
        <router-link class="nav-item nav-link" href="#" to="/order_page"><i class="fas pr-2 fa-clipboard-list"></i>Order</router-link>
        <router-link class="nav-item nav-link" href="#" to="/contact"><i class="far pr-2 fa-envelope"></i>Contact Us</router-link>
        <router-link class="nav-item nav-link" href="#" to="/admin" title="管理員"><i class="fas pr-2 fa-cog"></i></router-link>
      </div>
      <div class="lg"></div>
    </div>
  <!-- 正常模式 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('cartsModules', ['cartQty'])
  },
  methods: {
    getCartQ () {
      this.$store.dispatch('cartsModules/getCart')
    }
  },
  created () {
    this.getCartQ()
  }
}
</script>

<style lang="scss">
  @import "@/assets/index.scss";
</style>
