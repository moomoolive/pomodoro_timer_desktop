<template>
  <div class="appContainer" id="app">
    <pop-up
    v-if="settingsMenu"
    contents='settings'
    @submit="settingsMenu = false"
    />
    <div style="height: 7%;">
      <Header @settings="settingsMenu = true" />
    </div>
    <div v-if="showSelection">
      <selection />
    </div>
    <div v-if="showClock" >
      <clock />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import selection from './components/selection.vue'
import soundsHTML from './components/commonComponents/sounds.js'

export default {
  components: {
    Header,
    selection,
    clock: () => import('./components/clock.vue'),
    popUp: () => import('./components/commonComponents/popUp.vue')
  },
  data() {
    return {
      showSelection: true,
      showClock: false,
      settingsMenu: false
    }
  },
  methods: {
    isElectron() {
      if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
          return true;
      }

      // Main process
      if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
          return true;
      }

      // Detect the user agent when the `nodeIntegration` option is set to true
      if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
          return true;
      }

      return false;
    },
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
  computed: {
    appMode() {
        return this.$store.state.mode
      }
  },
  watch: {
    appMode() {
      if (this.appMode === 'selection') {
        this.showClock = false
        this.showSelection = true
      }
      else if (this.appMode === 'clock') {
        this.showSelection = false
        this.showClock = true
      }
    }
  },
  created() {
    if (this.isElectron()) this.$store.dispatch('isElectron')
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
