<template>
    <div>
        <pop-up
        v-if="audio.state"
        contents="sound"
        :soundMessage="titleMessages.cachedMessage"
        @stop-audio="audio.state = false"
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
            <clock-button-group
            v-if="showButtons" 
            @rerender="events"
            />
        </div>
    </div>
</template>

<script>
import clockButtonGroup from './clockComponents/clockButtonGroup.vue'
import sessionsIndicator from './clockComponents/sessionsIndicator.vue'
import timeIndicator from './clockComponents/timeIndicator.vue'
import { Howl, Howler } from 'howler'

export default {
    name: 'clock',
    components: {
        clockButtonGroup,
        sessionsIndicator,
        timeIndicator,
        popUp: () => import('./commonComponents/popUp.vue')
    },
    data() {
        return {
            showIndicator: true,
            showButtons: true,
            play: true,
            nextInterval: '',
            titleMessages: {
                longBreak: 'Long Break Finished!',
                shortBreak: 'Short Break Finished!',
                workInterval: 'Work Session Finished!',
                cachedMessage: ''
            },
            audio: {
                state: false,
                repeated: 0
            }
        }
    },
    methods: {
        // Components with fontawesome icons need to be rerendered to
        // dynamically swap icons.
        // or at least that was the easiest way I found...
        rerender(component) {
            this[component] = false
            this.$nextTick(() => {
                    this[component] = true
                })
        },
        incrementSession(number) {
            this.$store.dispatch('updateCurrentSession', number) 
        },
        notifyMe() {
            if (Notification.permission === "granted") {
                const notification = new Notification(
                    this.titleMessages.cachedMessage,
                    {tag: this.audio.repeated}
                    )
            }
        },
        events(value) {
            if (value === 'changeInterval') {
                this.$store.dispatch( value, this.nextInterval)
                this.rerender('showIndicator')
                this.play = true
                if (this.nextInterval === 'workInterval') this.incrementSession(1)
            }
            else if (value === 'pause/play') {
                this.play = !this.play
            }
            else if (value === "timeFinished") {
                document.title = this.titleMessages[this.currentInterval]
                this.$store.dispatch('changeInterval', this.nextInterval)
                this.play = false
                this.rerender('showIndicator')
                this.audio.state = true
                if (this.nextInterval === 'workInterval') this.incrementSession(1)
            }
            else if (value === 'stop') {
                this.$store.dispatch('changeAppMode', 'selection')
                return
            }
            this.rerender('showButtons')
        }
    },
    computed: {
        isLastSession() {
            return this.$store.getters.isLastSession
        },
        currentInterval() {
            return this.$store.state.timeIntervalSelect
        },
        audioState() {
            return this.audio.state
        },
        audioFile() {
            return this.$store.state.sound.audio
        }
    },
    watch: {
        currentInterval(newValue, oldValue) {
            this.titleMessages.cachedMessage = this.titleMessages[oldValue]
            if (oldValue === 'longBreak' && newValue === 'workInterval') {
                this.$store.dispatch('updateCurrentSession', - this.$store.state.timeIntervals.currentSession + 1)
            }
            switch(newValue) {
                case 'workInterval':
                    if (this.isLastSession) this.nextInterval = 'longBreak'
                    else this.nextInterval = 'shortBreak'
                    break
                case 'longBreak':
                case 'shortBreak':
                    this.nextInterval = 'workInterval'
                    break
            }
        },
        audioState() {
            const x = setInterval(() => {
                if (this.audio.state && this.audio.repeated < 3 ) {
                    this.notifyMe()
                    this.audio.repeated++
                    this.audioFile.play()
                }
                else {
                    clearInterval(x)
                    this.audio.state = false
                    this.audio.repeated = 0
                }
            }, 20_000)
        }
    },
    created() {
        this.$store.dispatch('changeInterval', 'workInterval')
        this.nextInterval = 'shortBreak'
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