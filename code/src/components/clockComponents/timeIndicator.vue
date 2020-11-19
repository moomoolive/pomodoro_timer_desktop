<template>
    <div :class="'timeDisplay ' + backgroundColor">
        <div
        class="innerCircle one"
        :style="`transform: rotate(${fill1.degrees}deg);`"
        >
            <div
            :class="'fill one ' + fill1.color"
            ></div>
        </div>
        <div
        class="innerCircle two"
        :style="`transform: rotate(${fill2.degrees}deg);`"
        >
            <div
            :class="'fill two ' + fill2.color"
            ></div>
        </div>
        <div class="lining">
        </div>
        <div class="container">
            <div class="icon">
                <i :class="icon" style="color: white;"></i>
            </div>
            <div class="timer">
                {{ this.time.minutes }} : {{ seconds }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "timeIndicator",
    data() {
        return {
            backgroundColor: '',
            icon: '',
            lifeCycleSignals: {
                isMounted: false,
                isDestroyed: false
            },
            time: {
                stopWatch: 0,
                originalTime: 0
            },
            fill1: {
                color: '',
                degrees: 0
            },
            fill2: {
                color: '',
                degrees: 0
            }
        }
    },
    methods: {
        countDown() {
            const x = setInterval(() => {
                if (this.appMode === 'selection' || !this.isPlaying || this.lifeCycleSignals.isDestroyed) {
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
                    clearInterval(x)
                } else {
                    this.time.stopWatch++
                    document.title = `(${this.time.minutes}:${this.seconds}) Pomodoro Timer`
                }
            }, 1000)
        }
    },
    computed: {
        isPlaying() {
            if (this.lifeCycleSignals.isMounted) return this.$parent.play
        },
        appMode() {
        return this.$store.state.mode
        },
        fillMover() {
            const totalTime = this.time.originalTime * 60
            const elapsedTimePercent = this.time.stopWatch/totalTime
            return Math.ceil(elapsedTimePercent*10_000)/10_000
        },
        seconds() {
            const secs = this.time.stopWatch - ((this.time.originalTime - this.time.minutes - 1) * 60)
            const x = secs + 1 > 51? `0${60 - secs}` : `${60 - secs}`
            return x === '60' ? '00' : x 
        }
    },
    watch: {
        isPlaying() {
            this.countDown()
        },
        fillMover() {
            if (this.fillMover >= 0.4_999) {
                this.fill2.degrees = 0
                this.fill2.color = this.backgroundColor

                this.fill1.degrees = (this.fillMover - 0.5) * 360
            } 
            else if (this.fillMover >= 0.9_999) {
                this.fill1.degrees = 0
                this.fill1.color = this.backgroundColor
            } else {
                this.fill2.degrees = (this.fillMover * 360)
            }
        } 
    },
    created() {
        const times = this.$store.state.timeIntervals
        const currentInterval = this.$store.state.timeIntervalSelect
        this.time.minutes = this.time.originalTime = times[currentInterval]
        switch(currentInterval) {
                case 'workInterval':
                    this.icon = 'fas fa-briefcase'
                    this.backgroundColor = 'shortBreak'
                    this.fill1.color = this.fill2.color = 'workInterval'
                    break
                case 'shortBreak':
                    this.icon = "fas fa-coffee"
                    this.backgroundColor = 'workInterval'
                    this.fill1.color = this.fill2.color = 'shortBreak'
                    break
                case 'longBreak':
                    this.icon = "fas fa-bed"
                    this.backgroundColor = 'workInterval'
                    this.fill1.color = this.fill2.color = 'longBreak'
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
    &.one {
        float: left;
        transform-origin: 100%  50%;
    }
    &.two {
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
    &.two {
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
    top: 40%;
    text-align: center;
    font-size: 10vh;
}
</style>