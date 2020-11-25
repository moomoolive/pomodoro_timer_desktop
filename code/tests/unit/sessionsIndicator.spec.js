import sessionsIndicator from '../../src/components/clockComponents/sessionsIndicator.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'


const localVue = createLocalVue()
localVue.use(Vuex)

describe('sessionsIndicator', () => {
    let store
    let state
    let actions

    state = {
        timeIntervals: {
            workSessions: 4,
            currentSession: 1
        }
    }
    actions = {
        updateCurrentSession: jest.fn()
    }
    store = new Vuex.Store({ state, actions })

    it('Number of work intervals is displayed correctly', () => {
        const wrapper = shallowMount(sessionsIndicator, { store, localVue })
        for (let i = 0; i < state.workSessions; i++) {
            expect(wrapper.find(`indicator${i + 1}`).exists()).toBeTruthy()
        }
    })

    it('Session classes displayed correctly', async () => {
        const wrapper = shallowMount(sessionsIndicator, { store, localVue })
        state.timeIntervals.currentSession++
        await localVue.nextTick()
        const finishedSession = wrapper.find("#indicator1")
        expect(finishedSession.classes()).toContain('finished')
        const activeSession = wrapper.find("#indicator2")
        expect(activeSession.classes()).toContain('active')
        const notFinishedSession = wrapper.find("#indicator3")
        expect(notFinishedSession.classes()).toContain('notFinished')
    })

    it('Finished session reset after long break', async () => {
        const wrapper = shallowMount(sessionsIndicator, { store, localVue })
        state.timeIntervals.currentSession = 5
        await localVue.nextTick()
        expect(actions.updateCurrentSession).toHaveBeenCalled()
    })
})