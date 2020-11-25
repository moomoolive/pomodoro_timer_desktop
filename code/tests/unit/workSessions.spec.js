import workSessions from '../../src/components/selectionComponents/workSessions.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component to manipulate work session count', () => {
    let store
    let state
    let actions

    beforeEach(() => {
        state = {
            timeIntervals: { workSessions: 4 }
        }
        actions = { incrementSesssionNumber: jest.fn() }
        store = new Vuex.Store({ state, actions })
    })

    it('Increment/decrement sessions when buttons pressed', () => {
        const wrapper = mount(workSessions, { localVue, store })
        const addButton = wrapper.find("#addButton")
        addButton.trigger('click')
        expect(actions.incrementSesssionNumber).toHaveBeenCalled()
        const minusButton = wrapper.find("#minusButton")
        minusButton.trigger('click')
        expect(actions.incrementSesssionNumber).toHaveBeenCalled()
    })

    it('Session display should mirror work sessions in vuex', async () => {
        const wrapper = mount(workSessions, { localVue, store })
        expect(wrapper.find(".displayText").text()).toBe('4')
        state.timeIntervals.workSessions++
        await localVue.nextTick()
        expect(wrapper.find(".displayText").text()).toBe('5')
    })
})