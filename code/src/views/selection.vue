<template>
    <div style="position: relative; z-index: 0;">
        <div style="height: 66%;">
            <time-interval-selector />
        </div>
        <div style="height: 13%; margin-top: 1%;">
            <selection-button-group />
        </div>
        <div style="height: 8%; margin-top: 2%;">
            <work-sessions />
        </div>
        <div style="height: 5%">
            <p class="sessionLabel">Sessions to Long Break</p>
        </div>
    </div>
</template>

<script>
import selectionButtonGroup from '../components/selectionComponents/selectionButtonGroup.vue'
import workSessions from '../components//selectionComponents/workSessions.vue'
import timeIntervalSelector from '../components//selectionComponents/timeIntervalSelector.vue'

export default {
    name: 'selection',
    components: {
        selectionButtonGroup,
        workSessions,
        timeIntervalSelector
    },
    created() {
        this.$store.dispatch('changeInterval', 'workInterval')
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