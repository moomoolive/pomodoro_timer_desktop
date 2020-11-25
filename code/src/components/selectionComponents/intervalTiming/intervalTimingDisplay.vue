<template>
    <div class="container">
        <div id="shortBreak">
            <p class="text description">Short Break:</p>
            <p class="text">{{ shortBreak }}</p>
            <p class="text description">Mins</p>
        </div>
        <div id="workInterval">
            <p class="text description">Work Session:</p>
            <p class="text">{{ workInterval }}</p>
            <p class="text description">Mins</p>
        </div>
        <div id="longBreak">
            <p class="text description">Long Break:</p>
            <p class="text" id="longBreakText">{{ longBreak }}</p>
            <p class="text description">Mins</p>
        </div>
        <button @click="onClick" class="button" id="default">Set As Default</button>
    </div>
</template>

<script>
export default {
    name: 'intervalTimingDisplay',
    methods: {
        onClick() {
            const defaultIntervals = {
                shortBreak: this.shortBreak,
                workInterval: this.workInterval,
                longBreak: this.longBreak
            }
            localStorage.setItem('default', JSON.stringify(defaultIntervals))
        }
    },
    computed: {
        shortBreak() {
            return this.$store.state.timeIntervals.shortBreak
        },
        workInterval() {
            return this.$store.state.timeIntervals.workInterval
        },
        longBreak() {
            return this.$store.state.timeIntervals.longBreak
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 65%; 
    height: 70%;

}

#shortBreak {
    background: $primaryColor;
    border-radius: 20%;
    border-style: solid;
    border-color: grey;
    border-width: 0.01vh;
}

#workInterval {
    background: $secondaryColor;
    border-radius: 20%;
    margin-top: 10%;
    margin-bottom: 10%;
    border-style: solid;
    border-color: grey;
    border-width: 0.01vh;
}

#longBreak {
    background: $tertiaryColor;
    border-radius: 20%;
    border-style: solid;
    border-color: grey;
    border-width: 0.01vh;
}

.text {
    position: relative;
    top: 30%;
    text-align: center;
    font-size: 3vh;
    font-weight: bold;
    color: white;
    line-height: 0.5vh;
    &.description {
        font-size: 1.2vh;
    }
}

.button {
    position: relative;
    top: 10%;
    background: gray;
    color: white;
    
}
</style>