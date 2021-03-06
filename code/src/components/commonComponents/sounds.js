import { Howl, Howler } from 'howler'

const sounds = {
    trumpet: new Howl({ src: require('../../assets/sounds/military-trumpet.mp3') }),
    cat: new Howl({ src: require('../../assets/sounds/cat-meowing.mp3') }),
    cuckooClock: new Howl({ src: require('../../assets/sounds/cuckoo-clock.mp3') })
}

export default sounds