<template>
    <div>
        <pop-up
        v-if="audio"
        contents="sound"
        @stop-audio="audio = false"
        />
        <div style="height: 8%;">
            <sessions-indicator />
        </div>
        <div style="height: 70%; z-index: 0; position:relative; margin-top: 1%;">
            <time-indicator
            v-if="showIndicator"
            @timer-finished="events"
            />
        </div>
        <div style="height: 13%; z-index: 3; position:relative; margin-top: 2%;">
            <clock-button-group @rerender="events" />
        </div>
    </div>
</template>

<script>
import clockButtonGroup from '../components/clockComponents/clockButtonGroup.vue'
import sessionsIndicator from '../components/clockComponents/sessionsIndicator.vue'
import timeIndicator from '../components/clockComponents/timeIndicator.vue'
import { Howl, Howler } from 'howler'

export default {
    name: 'timer',
    components: {
        clockButtonGroup,
        sessionsIndicator,
        timeIndicator,
        popUp: () => import('../components/commonComponents/popUp.vue')
    },
    data() {
        return {
            showIndicator: true,
            play: true,
            audio: false
        }
    },
    methods: {
        rerender(component) {
            this[component] = false
            this.$nextTick(() => {
                    this[component] = true
                })
        },
        events(value) {
            if (value === 'changeInterval') {
                this.rerender('showIndicator')
                this.play = true
            }
            else if (value === 'pause/play') {
                this.play = !this.play
            }
            else if (value === "timeFinished") {
                this.play = false
                this.rerender('showIndicator')
                this.audio = true
            }
        }
    },
    created() {
        this.$store.dispatch('changeInterval', 'workInterval')
    }
}
</script>

<style lang="scss" scoped>
.soundPopup {
    height: 20%;
    width: 50%;
    margin-top: 3%;
    margin-left: 18%;
    background: gray;
    border: black solid;
    border-radius: 5%;
    text-align: center;
}
</style>