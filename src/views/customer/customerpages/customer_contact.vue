<template>
  <div>
    <div class="cotact d-flex align-items-center" :style="{ backgroundImage: 'url(' + bg + ')' }">
      <div class="cotact_content col-12 col-md-5 mx-auto align-self-center text-center">
        <div class="cotact_text h4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero neque iusto exercitationem quas inventore iste saepe velit id? Magnam vero quod ipsum eum, excepturi pariatur dolor amet tenetur eos modi?
        </div>
        <button type="button" class="btn btn-outline-dark btn-lg my-4" @click.prevent="goUpdate">我要提供商品</button>
        <div class="cotact_text h4">
          <span>商品一直無法上架嗎？請聯絡我們</span>
          <div class="icon d-inline-block"><i class="far fa-envelope"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contactBg from '@/assets/img/contactbg.jpg'
export default {
  data () {
    return {
      bg: contactBg
    }
  },
  methods: {
    goUpdate () {
      this.$router.push('/contact_update')
    }
  }
}
</script>
