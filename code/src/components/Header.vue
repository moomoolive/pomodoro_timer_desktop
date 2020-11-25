<template>
    <div style="height: 7%; position: relative; z-index: 1;">
        <pop-up
        v-if="showSettingsMenu"
        contents='settings'
        @submit="showSettingsMenu = false"
        />
        <div id="left" v-if="!smallScreen">
            <button
            id="buttonGit"
            class="button github"
            @click="openNewTab(githubLink)"
            >
                Contribute to Source Code
            </button>
            <button
            id="buttonFeedback"
            class="button feedback"
            @click="openNewTab(feedbackForm)"
            >
                Submit Your Feedback
            </button>
        </div>
        <div id="right">
            <selection-button
            @click.native="showSettingsMenu = true"
            ref="button"
            id="settingsButton" 
            icon="cog"
            />
        </div>
    </div>
</template>

<script>
import selectionButton from "./commonComponents/selectionButton"

export default {
    name: "Header",
    components: {
        selectionButton,
        popUp: () => import('../components/commonComponents/popUp.vue')
    },
    data() {
        return {
            githubLink: "https://github.com/moomoolive/pomodoro_timer",
            feedbackForm: "https://forms.gle/vC2G9cuPccdH57aW7",
            isMounted: false,
            showSettingsMenu: false
        }
    },
    methods: {
        openNewTab(link) {
            window.open(link, '_blank')
        }
    },
    computed: {
        smallScreen() {
            return this.$store.state.smallScreen
        },
        smallScreenIndicator1() {
            if (this.isMounted) return this.$refs.button.windowHeight
        },
        smallScreenIndicator2() {
            if (this.isMounted) return this.$refs.button.windowWidth
        }
    },
    watch: {
        smallScreenIndicator1(oldValue, newValue) {
            const screenLength = 520
            if (newValue <= screenLength && oldValue > screenLength) {
                this.$store.dispatch('screenSize', false)
            }
            else if (newValue > screenLength && oldValue <= screenLength) {
                this.$store.dispatch('screenSize', true)
                this.showDownload = false
            }
        },
        smallScreenIndicator2(oldValue, newValue) {
            const screenLength = 850
            if (newValue <= screenLength && oldValue > screenLength) {
                this.$store.dispatch('screenSize', false)
            }
            else if (newValue > screenLength && oldValue <= screenLength) {
                this.$store.dispatch('screenSize', true)
                this.showDownload = false
            }
        }
    },
    mounted() {
        this.isMounted = true
    }
}
</script>

<style lang="scss" scoped>
#right {
    text-align: right;
    position: relative;
    bottom: 50%;
    width: 50%;
    left: 50%;
}

#left {
    text-align: left;
    width: 60%;
}

.button {
    border-radius: 20%;
    height: 3vh;
    width: 15vh;
    font-size: 1vh;
    font-weight: bold;
    position: relative;
    border-style: solid;
    border-width: 0.1vh;
    top: 20%;
    margin-left: 1%;
    margin-right: 2%;
    overflow: visible;
    &.github {background-color: $primaryColor;}
    &.desktop {background-color: $secondaryColor;}
    &.feedback {background-color: $tertiaryColor;}
}
</style>