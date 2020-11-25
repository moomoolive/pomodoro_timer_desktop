import timeIndicator from '../../src/components/clockComponents/timeIndicator.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('timeIndicator', () => {
    let store
    let state
    let actions

    beforeEach(() => {
        state = {
            nextInterval: jest.fn(),
            timeIntervalSelect: 'workInterval',
            timeIntervals: {
                workInterval: 25
            }
        }
        actions = {
            changeInterval: jest.fn()
        }
        store = new Vuex.Store({ state, actions })
        const iconSrc = jest.spyOn(timeIndicator.computed, 'iconSrc')
    })

    it('The passing of a second changes timer display', async () => {
        const wrapper = shallowMount(timeIndicator, { store, localVue })
        wrapper.vm.time.stopWatch++
        wrapper.vm.time.minutes--
        await localVue.nextTick()
        expect(wrapper.find("#timerSecs").text()).toBe('59')
    })

    it('Percentage circle moves as time goes on', async () => {
        const wrapper = shallowMount(timeIndicator, { store, localVue })
        wrapper.vm.time.stopWatch++
        const fillDegressBefore = wrapper.vm.fillRight.degrees
        await localVue.nextTick()
        const fillDegreesAfter = wrapper.vm.fillRight.degrees
        expect(fillDegreesAfter > fillDegressBefore).toBeTruthy()
    })
})