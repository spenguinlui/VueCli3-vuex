<template>
    <div>
        <BackNavbar/>
        <Alert/>
        <div class="container-fluid">
            <div class="row">
                <BackSlidebar/>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 mt-5">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script>

import BackNavbar from './back_navbar'
import BackSlidebar from './back_slidebar'
import Alert from '@/components/alertMessage'

export default {
  components: {
    BackNavbar,
    BackSlidebar,
    Alert
  }
}
</script>

<style lang="scss">
@import "@/assets/back.scss";
</style>
