import state from './state.js'

export default {
    sessionsToBreak(state) {
        return state.timeIntervals.workSessions - state.timeIntervals.currentSession
    },
    isLastSession(state, getters) {
        return getters.sessionsToBreak === 0
    },
    nextInterval(state, getters) {
        let returnValue
        switch(state.timeIntervalSelect) {
            case 'workInterval':
                if (getters.isLastSession) returnValue = 'longBreak'
                else returnValue = 'shortBreak'
                break
            case 'longBreak':
            case 'shortBreak':
                returnValue = 'workInterval'
                break
        }
        return returnValue
    }
}