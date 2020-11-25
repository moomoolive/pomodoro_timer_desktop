<template>
    <div class="sound">
        <div style="position: relative; top: 5%;">
            <p class="text">
                {{ titleMessages[currentInterval] }} <br>
                <button @click="$emit('stop-audio')" class="button" id="stopSound">
                    <p style="font-size: 1.6vh;">Okay!</p>
                </button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sound',
    data() {
        return {
            repeated: 0,
            isDestroyed: false,
            titleMessages: {
                longBreak: 'Work Session Finished!',
                shortBreak: 'Work Session Finished!',
                workInterval: 'Break Finished!'
            }
        }
    },
    methods: {
        notifyMe() {
            if (Notification !== "denied" ) Notification.requestPermission()
            if (Notification.permission === "granted") {
                const notification = new Notification(
                    this.titleMessages[this.currentInterval],
                    {tag: this.repeated}
                )
            }
        }
    },
    computed: {
        audioFile() {
            return this.$store.state.sound.audio
        },
        currentInterval() {
            return this.$store.state.timeIntervalSelect
        }
    },
    beforeDestroy() {
        this.isDestroyed = true
    },
    created() {
        document.title = this.titleMessages[this.currentInterval]
        const twentySeconds = 20_000
        const maxSoundRepitition = 3
        const x = setInterval(() => {
            if (!this.isDestroyed && this.repeated < maxSoundRepitition ) {
                this.notifyMe()
                this.repeated++
                this.audioFile.play()
            }
            else {
                clearInterval(x)
            }
        }, twentySeconds)
    }
}
</script>

<style lang="scss" scoped>
.sound {
    height: 10%;
    width: 50%;
    margin-top: 5%;
    margin-left: 18%;
    background: rgba(108, 122, 137, 1);
    border: black solid;
    border-radius: 5%;
    text-align: center;
}
</style>