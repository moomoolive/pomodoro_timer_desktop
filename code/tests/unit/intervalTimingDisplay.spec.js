import intervalTimingDisplay from '../../src/components/selectionComponents/intervalTiming/intervalTimingDisplay.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('A display to show currently selected timings for intervals', () => {
    let store
    let state

    beforeEach(() => {
        state = {
            timeIntervals: {
                shortBreak: 10,
                workInterval: 14,
                longBreak: 7   
            }
        }
        store = new Vuex.Store({ state })
    })

    it('Display changes when vuex source changes', async () => {
        const wrapper = mount(intervalTimingDisplay, { localVue, store })
        expect(wrapper.find("#longBreakText").text()).toBe('7')
        await state.timeIntervals.longBreak++
        expect(wrapper.find("#longBreakText").text()).toBe('8')
    })

    it("Pressing on 'set as default' button saves user settings", async () => {
        const spy = jest.spyOn(intervalTimingDisplay.methods, 'onClick')
        const wrapper = mount(intervalTimingDisplay, { localVue, store })
        const setAsDefaultButton = wrapper.find('#default')
        await setAsDefaultButton.trigger('click')
        expect(spy).toHaveBeenCalled()
    })
})