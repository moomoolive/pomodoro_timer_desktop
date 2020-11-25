<template>
    <div class="buttonContainer">
        <selection-button
        ref="button"
        icon="coffee"
        color="green"
        id="shortBreak"
        @click.native="changeInterval('shortBreak')"
        />
        <selection-button
        icon="briefcase"
        color="purple"
        @click.native="changeInterval('workInterval')"
        />
        <selection-button
        :icon="icon1"
        color="brown"
        @click.native="changeInterval('longBreak')"
        />
    </div>
</template>

<script>
import selectionButton from '../commonComponents/selectionButton.vue'

export default {
    name: 'selectionButtonGroup',
    components: {
        selectionButton
    },
    data() {
        return {
            icon1: 'bed'
        }
    },
    methods: {
        changeInterval(interval) {
            this.$store.dispatch('changeInterval', interval)
        }
    }
}
</script>

<style lang="scss" scoped>
.buttonContainer {
    display: flex;
    text-align: center;
}
</style>