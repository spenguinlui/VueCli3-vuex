<template>
  <div>
    <div class="textbutton" @click="prePage">Back</div>
  </div>
</template>

<script>
export default {
  methods: {
    prePage () {
      this.$router.go(-1)
    }
  }
}
</script>
