<template>
    <div :class="'timeDisplay ' + nextInterval">
        <div
        class="innerCircle left"
        :style="`transform: rotate(${fillLeft.degrees}deg);`"
        >
            <div
            :class="'fill left ' + fillLeft.color"
            ></div>
        </div>
        <div
        class="innerCircle right"
        :style="`transform: rotate(${fillRight.degrees}deg);`"
        >
            <div
            :class="'fill right ' + fillRight.color"
            ></div>
        </div>
        <div class="lining">
        </div>
        <div class="container">
            <div class="icon">
                <img
                :src="iconSrc"
                >
            </div>
            <div class="timer">
                {{ this.time.minutes }} : <span id="timerSecs">{{ seconds }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "timeIndicator",
    data() {
        return {
            icon: '',
            lifeCycleSignals: {
                isMounted: false,
                isDestroyed: false
            },
            time: {
                originalTime: 0,
                minutes: 0,
                stopWatch: 0
            },
            fillLeft: {
                color: '',
                degrees: 0
            },
            fillRight: {
                color: '',
                degrees: 0
            }
        }
    },
    methods: {
        countDown() {
            const oneSecond = 1_000
            const x = setInterval(() => {
                if ( !this.isPlaying || this.lifeCycleSignals.isDestroyed) {
                    clearInterval(x)
                    return
                }
                if (this.seconds === '00' && this.time.minutes !== 0) {
                    this.time.stopWatch++
                    this.time.minutes--
                    document.title = `(${this.time.minutes}:${this.seconds}) Pomodoro Timer`
                }
                else if (this.time.minutes === 0 && this.seconds === '00') {
                    this.$emit('timer-finished', 'timeFinished')
                    this.$store.dispatch('changeInterval', this.nextInterval)
                    clearInterval(x)
                    if (this.nextInterval === 'workInterval') this.incrementSession(1)
                } else {
                    this.time.stopWatch++
                    document.title = `(${this.time.minutes}:${this.seconds}) Pomodoro Timer`
                }
            }, oneSecond)
        },
        incrementSession(number) {
            this.$store.dispatch('updateCurrentSession', number) 
        }
    },
    computed: {
        isPlaying() {
            if (this.lifeCycleSignals.isMounted) return this.$parent.play
        },
        fillMover() {
            const secondsPerMinute = 60
            const totalTime = this.time.originalTime * secondsPerMinute
            const elapsedTimePercent = this.time.stopWatch/totalTime
            const elapsedTimePercentRounded = Math.ceil(elapsedTimePercent * 10_000)/10_000
            return elapsedTimePercentRounded
        },
        seconds() {
            const secs = this.time.stopWatch - ((this.time.originalTime - this.time.minutes - 1) * 60)
            const x = secs + 1 > 51? `0${60 - secs}` : `${60 - secs}`
            return x === '60' ? '00' : x 
        },
        iconSrc() {
            return require(`../../assets/icons/${this.icon}.svg`)
        },
        nextInterval() {
            return this.$store.getters.nextInterval
        },
        currentInterval() {
            return this.$store.state.timeIntervalSelect
        }
    },
    watch: {
        isPlaying() {
            this.countDown()
        },
        fillMover() {
            const fiftyPercent = 0.4_999
            const oneHundredPercent = 0.9_999
            const totalDegreesOfRotation = 360
            if (this.fillMover >= fiftyPercent) {
                this.fillRight.degrees = 0
                this.fillRight.color = this.nextInterval

                this.fillLeft.degrees = (this.fillMover - fiftyPercent) * totalDegreesOfRotation
            }
            else if (this.fillMover >= oneHundredPercent) {
                this.fillLeft.degrees = 0
                this.fillLeft.color = this.nextInterval
            } else {
                this.fillRight.degrees = (this.fillMover * totalDegreesOfRotation)
            }
        } 
    },
    created() {
        const times = this.$store.state.timeIntervals
        const currentInterval = this.$store.state.timeIntervalSelect
        this.time.minutes = this.time.originalTime = times[currentInterval]
        switch(currentInterval) {
                case 'workInterval':
                    this.icon = 'briefcase'
                    this.fillLeft.color = this.fillRight.color = 'workInterval'
                    break
                case 'shortBreak':
                    this.icon = "coffee"
                    this.fillLeft.color = this.fillRight.color = 'shortBreak'
                    break
                case 'longBreak':
                    this.icon = "bed"
                    this.fillLeft.color = this.fillRight.color = 'longBreak'
                    break 
        }
    },
    mounted() {
        this.lifeCycleSignals.isMounted = true
    },
    beforeDestroy() {
        this.lifeCycleSignals.isDestroyed = true
    }
}
</script>

<style lang="scss" scoped>
.workInterval{background: $secondaryColor}
.shortBreak{background: $primaryColor;}
.longBreak{background: $tertiaryColor;}

.timeDisplay {
    width: 60vh;
    height: 97%;
    position: relative;
    z-index: 0;
    top: 1%;
    margin: 0 auto;
    border-radius: 50%;
    border-style: solid;
    border-color: gray;
    border-width: 0.2vh;
    padding: 0;
}

.innerCircle {
    width: 50%;
    overflow: hidden;
    position: relative;
    z-index: 1;
    animation: ease-in-out 1s;
    &.left {
        float: left;
        transform-origin: 100%  50%;
    }
    &.right {
        float: right;
        transform-origin: 1% 48.9%;
    }
}

.fill {
    width: 200%;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    border-style: none;
    border-width: 0.1vh;
    &.right {
        right: 0%;
    }
}

.container {
    height: 40%;
    position: relative;
    z-index: 2;
    top: -70%;
}

.lining {
    background: transparent;
    border: gray solid 2.2vh;
    position: absolute;
    z-index: 2;
    border-radius: 50%;
    width: 60.05vh;
    height: 102.7%;
    left: -0.35%;
    bottom: -0.3%;
}

.timer{
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 5vh;
}

.icon {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    top: 40%;
    height: 10vh;
    width: 10vh
}
</style>