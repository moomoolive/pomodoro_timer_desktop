import soundsHTML from '../components/commonComponents/sounds.js'

export default {
    timeIntervals: {
        shortBreak: 5,
        workInterval: 25,
        longBreak: 30,
        workSessions: 4,
        currentSession: 1
    },
    timeIntervalSelect: 'workInterval',
    smallScreen: false,
    sound: {
        audio: soundsHTML.cuckooClock,
        name: 'cuckooClock'
    }
}