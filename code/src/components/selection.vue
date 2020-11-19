<template>
    <div style="position: relative; z-index: 0;">
        <div style="height: 66%;">
            <time-interval-selector @play="clock" />
        </div>
        <div style="height: 13%; margin-top: 1%;">
            <selection-button-group @change-interval="changeInterval" />
        </div>
        <div style="height: 8%; margin-top: 2%;">
            <work-sessions @increment-sessions="incrementWorkSessions" />
        </div>
        <div style="height: 5%">
            <p class="sessionLabel">Sessions to Long Break</p>
        </div>
    </div>
</template>

<script>
import selectionButtonGroup from './selectionComponents/selectionButtonGroup.vue'
import workSessions from './selectionComponents/workSessions.vue'
import timeIntervalSelector from './selectionComponents/timeIntervalSelector.vue'

export default {
    name: 'selection',
    components: {
        selectionButtonGroup,
        workSessions,
        timeIntervalSelector
    },
    data() {
        return {

        }
    },
    methods: {
        changeInterval(interval) {
            this.$store.dispatch('changeInterval', interval)
        },
        incrementWorkSessions(number) {
            if (this.sessions - 1 <= 1 && number === -1) {
                alert(`You cannot have less than 2 work sessions!`)
            } 
            else if (this.sessions + 1 >= 11 && number === 1) {
                alert(`You cannot have more than 10 work sessions!`)
            }
            else {
                this.$store.dispatch('incrementSesssionNumber', number)
            }
        },
        clock() {
            this.$store.dispatch('changeAppMode', 'clock')
        }
    },
    computed: {
        timeInterval() {
            return this.$store.state.timeIntervalSelect
        },
        sessions() {
            return this.$store.state.timeIntervals.workSessions
        }
    },
    created() {
        this.$store.dispatch('changeInterval', 'workInterval')
        document.title = 'Pomodoro Timer'
        if (Notification !== "denied" ) Notification.requestPermission()
    }
}
</script>

<style lang="scss" scoped>
.sessionLabel {
    font-size: 2vh;
    text-align: center;
    font-weight: bold;
}
</style>