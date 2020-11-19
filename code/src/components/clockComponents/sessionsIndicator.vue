<template>
    <div class="container" :style="`width: ${workSessions * 10}%;`">
        <div
        v-for="x in workSessions"
        :key="x"
        :class="'indicator ' + classType(x)"
        >
        </div>
    </div>
</template>

<script>
export default {
    name: 'sessionsIndicator',
    data() {
        return {

        }
    },
    methods: {
        classType(value) {
            if (value < this.currentSession) return 'finished'
            else if (value == this.currentSession) return 'active'
            else return 'notFinished'
        }
    },
    computed:{
        workSessions() {
            return this.$store.state.timeIntervals.workSessions
        },
        currentSession() {
            return this.$store.state.timeIntervals.currentSession
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

.indicator {
    border-radius: 50%;
    height: 4.5vh;
    width: 4.5vh;
    margin-left: auto;
    margin-right:auto;
    position: relative;
    top: 10%;
    border-style: solid;
    border-color: grey;
    border-width: 0.1vh;
    &.finished{background: $primaryColor;}
    &.active{
        background: $primaryColor;
        animation: blinkingBackground 2s infinite;
        @keyframes blinkingBackground{
            0%		{ background-color: $primaryColor;}
            50%		{ background-color: $secondaryColor;}
            100%	{ background-color: $primaryColor;}
        }
    }
    &.notFinished{background: $secondaryColor;}
}
</style>