<template>
    <div class="buttonContainer">
        <selection-button
        :icon="leftIcon"
        :color="leftButtonColor"
        @click.native="changeInterval"
        id="nextIntervalButton"
        />
        <selection-button
        :icon="middleIcon"
        @click.native="pausePlay"
        id="playButton"
        />
        <selection-button
        icon="stop"
        color="brown"
        @click.native="toSelection"
        />
    </div>
</template>

<script>
import selectionButton from '../commonComponents/selectionButton.vue'

export default {
    name: 'clockButtonGroup',
    components: {
        selectionButton
    },
    data() {
        return {
            leftIcon: 'coffee',
            leftButtonColor: 'green',
            isMounted: false
        }
    },
    methods: {
        changeInterval(interval) {
            if (this.nextInterval === 'workInterval') this.incrementSession(1)
            this.$store.dispatch('changeInterval', this.nextInterval)
            this.leftButton()
            this.$emit('rerender', 'changeInterval')
        },
        pausePlay() {
            this.$emit('rerender', 'pause/play')
        },
        toSelection() {
            this.$router.push('/')
        },
        leftButton() {
            switch(this.nextInterval) {
                case 'longBreak':
                    this.leftIcon = "bed"
                    this.leftButtonColor = 'brown'
                    break
                case 'shortBreak':
                    this.leftIcon = 'coffee'
                    this.leftButtonColor = 'green'
                    break
                case 'workInterval':
                    this.leftIcon = 'briefcase'
                    this.leftButtonColor = 'purple'
                    break
            }
        },
        incrementSession(number) {
            this.$store.dispatch('updateCurrentSession', number) 
        }
    },
    computed: {
        isLastSession() {
            return this.$store.getters.isLastSession
        },
        nextInterval() {
            return this.$store.getters.nextInterval
        },
        currentInterval() {
            return this.$store.state.timeIntervalSelect
        },
        middleIcon() {
            if (this.isMounted) return this.$parent.play? 'pause' : 'play'
        }
    },
    mounted() {
        this.isMounted = true
    }
}
</script>

<style lang="scss" scoped>
.buttonContainer {
    display: flex;
    text-align: center;
}
</style>