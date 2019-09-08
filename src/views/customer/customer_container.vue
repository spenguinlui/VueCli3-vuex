<template>
    <div>
        <CustomerNavbar/>
        <Alert/>
        <div class="container-fluid p-0">
            <router-view></router-view>
        </div>
        <Footer/>
    </div>
</template>

<script>

import CustomerNavbar from './customer_navbar'
import Alert from '@/components/alertMessage'
import Footer from './customer_footer'

export default {
  components: {
    CustomerNavbar,
    Alert,
    Footer
  }
}
</script>

<style lang="scss">
    @import "@/assets/index.scss";
</style>
