<template>
    <div class="sound">
        <div style="position: relative; top: 5%;">
            <p class="text">
                {{ soundMessage }} <br>
                <button @click="$emit('stop-audio')" class="button">
                    <p style="font-size: 1.6vh;">Okay!</p>
                </button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sound',
    props: {
        soundMessage: {
            type: String,
            required: true
        }
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