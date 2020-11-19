import state from './state.js'

export default {
    sessionsToBreak(state) {
        return state.timeIntervals.workSessions - state.timeIntervals.currentSession
    },
    isLastSession(state, getters) {
        return getters.sessionsToBreak === 0
    }
}