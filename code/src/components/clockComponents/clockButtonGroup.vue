<template>
    <div class="buttonContainer">
        <selection-button
        :icon="leftIcon"
        :color="leftButtonColor"
        @click.native="nextInterval"
        />
        <selection-button
        :icon="middleIcon"
        @click.native="pausePlay"
        />
        <selection-button
        icon="fas fa-stop"
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
            leftIcon: '',
            middleIcon: '',
            leftButtonColor: ''
        }
    },
    methods: {
        nextInterval(interval) {
            this.$emit('rerender', 'changeInterval')
        },
        pausePlay() {
            this.$emit('rerender', 'pause/play')
        },
        toSelection() {
            this.$emit('rerender', 'stop')
        }
    },
    created() {
        this.$parent.play? this.middleIcon = "fas fa-pause": this.middleIcon = "fas fa-play"
        switch(this.$store.state.timeIntervalSelect) {
            case 'workInterval':
                if (this.$store.getters.isLastSession) {
                    this.leftIcon = "fas fa-bed"
                    this.leftButtonColor = 'brown'
                } else {
                    this.leftIcon = 'fas fa-coffee'
                    this.leftButtonColor = 'green'
                }
                break
            case 'longBreak':
            case 'shortBreak':
                this.leftIcon = 'fas fa-briefcase'
                this.leftButtonColor = 'purple'
                break
        }
    }
}
</script>

<style lang="scss" scoped>
.buttonContainer {
    display: flex;
    text-align: center;
}
</style>