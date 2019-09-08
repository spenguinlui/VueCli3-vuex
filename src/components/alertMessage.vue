<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data () {
    return {
    }
  },
  computed: {
    messages () {
      return this.$store.state.messages
    }
  },
  methods: {
    removeMessage (num) {
      this.$store.commit('MESSAGESClOSE')
    }
  }
}
</script>

<style scoped>
.message-alert {
  position: fixed;
  width: 300px;
  /* max-width: 50%; */
  top: 120px;
  right: calc(100% / 2 - 150px);
  z-index: 1100;
}
</style>
