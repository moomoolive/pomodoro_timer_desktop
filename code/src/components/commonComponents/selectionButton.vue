<template>
    <div ref="container">
        <button
        :class="'selectButton ' + color"
        :style="`width: ${buttonSize}px; height: ${buttonSize}px;`"
        >
            <div v-if="!!text" :style="`height: 40%;`">
                <p class="text">{{ text }}</p>
            </div>
            <img
            v-if="!!icon" 
            :src="iconSrc"
            :style="`height: ${iconSize}px; width: ${iconSize}px;`"
            >
        </button>
    </div>
</template>

<script>
export default {
    name: "selectionButton",
    props: {
        icon: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false
        },
        color: String
    },
    data() {
        return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            height: 0
        }
    },
    methods: {
        onResize() {
            this.windowHeight = window.innerHeight
            this.windowWidth = window.innerWidth
        }
    },
    computed: {
        buttonSize() {
            return this.height * 0.9
        },
        iconSize() {
            return this.height * 0.35
        }, 
        iconSrc() {
            return require(`../../assets/icons/${this.icon}.svg`)
        }
    },
    watch: {
        windowHeight(newVal, oldVal) {
            this.height = this.$refs.container.clientHeight
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize)
            this.height = this.$refs.container.clientHeight
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    }
}
</script>

<style lang="scss" scoped> 
.selectButton {
    border-radius: 50%;
    border-color: grey;
    border-width: 0.05em;
    border-style: solid;
    min-width: 0px;
    min-height: 0px;
    text-align: center;
    background-color: gray;
    &.green {background-color: $primaryColor;}
    &.purple {background-color: $secondaryColor;}
    &.brown {background-color: $tertiaryColor;}
    &:focus {border-width: 0.1em;}
}

.text {
    position: relative;
    top: -45%;
    text-align: center;
    font-size: 3vh;
    font-weight: bold;
    color: white;
}
</style>