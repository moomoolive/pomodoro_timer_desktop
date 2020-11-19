<template>
    <div class="settings">
        <div class="settingsMenu">
            <div style="height: 10%; width: 98%; text-align: right;">
                <selection-button
                icon="fas fa-times"
                color="purple"
                @click.native="onSubmit"
                />
            </div>
            <p class="text">Settings</p>
            <label for="cars">Choose your alarm sound:</label>
            <select v-model="sound" style="margin-left: 2%;">
                <option value="trumpet">Trumpet</option>
                <option value="cuckooClock">Cucko-clock</option>
                <option value="cat">Cat</option>
            </select>
            <br><br>
            <button
            @click="onSubmit('settings')"
            class="button"
            >
                <p style="font-size: 1.5vh;">Submit</p>
            </button>
        </div>
    </div>
</template>

<script>
import selectionButton from '../selectionButton.vue'
import soundsHTML from '../sounds.js'

export default {
    name: 'settings',
    components: {
        selectionButton
    },
    data() {
        return {
            sound: this.$store.state.sound.name,
            soundFiles: soundsHTML
        }
    },
    methods: {
        onSubmit(value) {
            this.$emit('submit')
            if (value === 'settings') {
                const payload = {
                    name: this.sound,
                    audio: this.soundFiles[this.sound]
                }
                localStorage.setItem('sound', JSON.stringify(this.sound))
                this.$store.dispatch('changeSound', payload)
            }
        }
    },
    watch: {
        sound(newValue, oldValue) {
            if (newValue !== oldValue) this.soundFiles[newValue].play()
        }
    }
}
</script>

<style lang="scss" scoped>
.settings {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 110vh;
    position: relative;
    left: -8%;
    top: -8%;
}

.settingsMenu {
    position: relative;
    left: 31%;
    top: 20%;
    height: 40%;
    width: 40%;
    background: rgba(108, 122, 137, 1);
    border: black solid;
    border-radius: 5%;
    text-align: center;
}
</style>