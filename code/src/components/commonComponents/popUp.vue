<template>
    <div :style="`position: fixed; z-index: ${contents === 'settings'? 4:2};`">
        <div v-if="contents === 'sound'">
            <sound
            :soundMessage="soundMessage"
            @stop-audio="$emit('stop-audio')"
            />
        </div>
        <div v-if="contents === 'settings'">
            <settings @submit="$emit('submit')" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'popUp',
    components: {
        sound: () => import('./popUpComponents/sound.vue'),
        settings: () => import('./popUpComponents/settings.vue')
    },
    props:{
        contents:{
            type: String,
            required: true
        },
        soundMessage: String
    }
}
</script>

<style lang="scss" scoped>
::v-deep .text {
    color: white;
    font-size: 2.5vh;
}

::v-deep .button {
    $size: 3vh;
    height: $size;
    width: $size * 2.5;
    border-radius: 13%;
    border: solid black 0.2vh;
    min-width: 0px;
    min-height: 0px;
}
</style>