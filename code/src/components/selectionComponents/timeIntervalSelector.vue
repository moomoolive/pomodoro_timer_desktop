<template>
    <div :class="'selector ' + selectorColor" id="container">
        <div style="grid-row: 1; grid-column: 1;">
            <div style="height: 40%;">
                <interval-button buttonNumber="11" />
            </div>
            <div style="height: 40%;">
                <interval-button buttonNumber="12" />
            </div>
            <div>
                <interval-timing-display v-if="!smallScreen" id="display" />
            </div>
        </div>
        <div style="grid-row: 1; grid-column: 2;">
            <div style="height: 40%;">
                <interval-button buttonNumber="1" />
            </div>
            <div style="height: 40%;">
                <p class="selectorMessage" id="message">{{ selectorMessage }}</p>
            </div>
        </div>
        <div style="grid-row: 1; grid-column: 3;">
            <div style="height: 40%;">
                <interval-button buttonNumber="2" />
            </div>
            <div style="height: 40%;">
                <interval-button buttonNumber="3" />
            </div>
        </div>
        <div style="grid-row: 2; grid-column: 1;">
            <div style="height: 40%;">
                <interval-button buttonNumber="10" />
            </div>
        </div>
        <div class="middleGrid">
            <selection-button id="playButton" icon="play" @click.native="play" />
        </div>
        <div style="grid-row: 2; grid-column: 3;">
            <div style="height: 40%;">
                <interval-button buttonNumber="4" />
            </div>
        </div>
        <div style="grid-row: 3; grid-column: 1;">
            <div style="height: 40%;">
                <interval-button buttonNumber="9" />
            </div>
            <div style="height: 40%;">
                <interval-button buttonNumber="8" />
            </div>
        </div>
        <div style="grid-row: 3; grid-column: 2;">
            <div style="height: 40%;">
                <interval-button buttonNumber="7" />
            </div>
        </div>
        <div style="grid-row: 3; grid-column: 3;">
            <div style="height: 40%;">
                <interval-button buttonNumber="5" />
            </div>
            <div style="height: 40%;">
                <interval-button buttonNumber="6" />
            </div>
        </div>
    </div>
</template>

<script>
import selectionButton from '../commonComponents/selectionButton.vue'
import intervalTimingDisplay from './intervalTiming/intervalTimingDisplay.vue'
import intervalButton from './intervalTiming/intervalButton.vue'

export default {
    name: 'timeIntervalSelector',
    components: {
        selectionButton,
        intervalTimingDisplay,
        intervalButton
    },
    data() {
        return {
            selectorColor: 'purple',
            selectorMessage: 'Work Session',
            scaleFactor: 5
        }
    },
    methods: {
        play() {
            this.$router.push('/timer')
        }
    },
    computed: {
        intervalSelected() {
            return this.$store.state.timeIntervalSelect
        },
        smallScreen() {
            return this.$store.state.smallScreen
        }
    },
    watch: {
        intervalSelected() {
            switch(this.intervalSelected) {
                case 'workInterval':
                    this.selectorColor = 'purple'
                    this.scaleFactor = 5
                    this.selectorMessage = 'Work Session'
                    break
                case 'shortBreak':
                    this.selectorColor = 'green'
                    this.scaleFactor = 1
                    this.selectorMessage = 'Short Break'
                    break
                case 'longBreak':
                    this.selectorColor = 'brown'
                    this.scaleFactor = 7.5
                    this.selectorMessage = 'Long Break'
                    break 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.selector {
    width: 60vh;
    height: 97%;
    position: relative;
    top: 1%;
    margin: 0 auto;
    border-radius: 50%;
    display: grid;
    grid-template-rows: repeat(3, 33.3%);
    grid-template-columns: repeat(3, 33.3%);
    border-style: solid;
    border-color: gray;
    border-width: 0.2vh;
    &.purple{background: $secondaryColor}
    &.green{background: $primaryColor;}
    &.brown{background: $tertiaryColor;}
}

.middleGrid {
    grid-row: 2;
    grid-column: 2;
    text-align: center;
    position: relative;
    top: 5%;
}

.selectorMessage {
    position: relative;
    top: 90%;
    text-align: center;
    font-weight: bold;
    color: white;
    font-size: 3vh;
}

#display {
    position: relative;
    left: -120%;
    top: -40%;
}
</style>