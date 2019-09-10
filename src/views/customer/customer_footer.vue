<template>
    <div>
        <footer class="bg-dark text-light fixed-bottom py-3">
            <div class="footer container text-center">
                <a href="#"><i class="fab fa-facebook-square"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-twitter-square"></i></a>
                作品僅供練習使用
            </div>
            <div class="top position-absolute" @click="top">Top</div>
        </footer>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  methods: {
    top () {
      let gotop = $('.top')
      $(window).scroll(function () {
        if ($(window).scrollTop() > $(window).height()) {
          gotop.fadeIn(600)
        } else if ($(window).scrollTop() < $(window).height()) {
          gotop.fadeOut(600)
        }
      })
      gotop.click(function () {
        $('body,html').animate({
          scrollTop: 0
        }, 600)
        return false
      })
    }
  }
}
</script>
