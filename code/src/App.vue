<template>
  <div class="appContainer" id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import soundsHTML from './components/commonComponents/sounds.js'

export default {
  components: {
    Header
  },
  methods: {
    getUserSettings() {
      const defaults = JSON.parse(localStorage.getItem('default'))
      const sound = JSON.parse(localStorage.getItem('sound'))
      if (defaults) this.$store.dispatch('setDefaults', defaults)
      if (sound) {
        const payload = {
          name: sound,
          audio: soundsHTML[sound]
        }
        this.$store.dispatch('changeSound', payload)
      }
    },
    checkSmallScreen() {
      if (window.innerHeight <= 520 || window.innerWidth <= 850) {
        this.$store.dispatch('screenSize', true)
      }
    }
  },
  created() {
    this.getUserSettings()
    this.checkSmallScreen()
  }
}
</script>

<style lang="scss">
html,
body {
  background-color: $backgroundColor !important;
  height: 100%;
  width: 100%;
  margin: 0;
}

div {
  height: 100%;
  width: 100%;
}

a {
  color: black !important;
  &:hover {text-decoration: none !important;}
}

.appContainer {
  height: 85vh;
  width: 85vw;
  margin: auto;
  margin-top: 3%;
  position: relative;
  z-index: 0;
}
</style>
