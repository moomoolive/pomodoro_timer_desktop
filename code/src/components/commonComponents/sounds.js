import { Howl, Howler } from 'howler'

const sounds = {
    trumpet: new Howl({ src: require('../../assets/military-trumpet.mp3') }),
    cat: new Howl({ src: require('../../assets/cat-meowing.mp3') }),
    cuckooClock: new Howl({ src: require('../../assets/cuckoo-clock.mp3') })
}

export default sounds