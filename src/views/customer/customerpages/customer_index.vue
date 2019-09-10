<template>
  <div>
    <div class="index-contain d-flex align-items-center">
      <div class="col-10 col-sm-6 col-lg-4  mt-5 mx-auto align-self-center">
        <div class="index-img" @click.prevent="playGame"><img class="w-100 position-relative" src="@/assets/img/indexbg.png" alt="">
          <div class="dialog">
            點我玩遊戲
            <span class="bot"></span>
            <span class="top"></span>
          </div>
        </div>
        <div class="title mt-3">生活中有不需要的小東西嗎？<br>這裡回收了許多二手小物<br>快來逛逛吧！
        <h3 class="pt-2 text-danger">開幕期間另有翻牌拿禮券活動唷！</h3>
        </div>
      </div>
    </div>
    <Game/>
  </div>
</template>

<script>
import $ from 'jquery'
import Game from './customer_game'
export default {
  components: {
    Game
  },
  methods: {
    playGame () {
      this.$bus.$emit('cardReset')
      $('#gameModal').modal('show')
    }
  }
}
</script>
