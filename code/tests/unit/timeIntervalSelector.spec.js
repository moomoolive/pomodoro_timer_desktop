import timeIntervalSelector from '../../src/components/selectionComponents/timeIntervalSelector.vue'
import intervalTimingDisplay from '../../src/components/selectionComponents/intervalTiming/intervalTimingDisplay.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Component to manipulate interval timing for work and break sessions', () => {
    let store
    let state
    let stubs
    let router

    beforeEach(() => {
        state = {
            timeIntervalSelect: 'workInterval',
            smallScreen: false
        }
        store = new Vuex.Store({ state })
        stubs = ['intervalTimingDisplay', 'intervalButton']
        router = new VueRouter()
    })

    it('Pressing play button starts timer component', () => {
        const spy = jest.spyOn(timeIntervalSelector.methods, 'play')
        const wrapper = mount(timeIntervalSelector, { localVue, store, stubs, router })
        const playButton = wrapper.find("#playButton")
        playButton.trigger('click')
        expect(spy).toHaveBeenCalled()
    })

    it('Interval display disappears on small screen size', async () => {
        const wrapper = mount(timeIntervalSelector, { localVue, store, stubs })
        expect(wrapper.findComponent(intervalTimingDisplay).exists()).toBeTruthy()
        state.smallScreen = true
        await localVue.nextTick()
        expect(wrapper.findComponent(intervalTimingDisplay).exists()).toBeFalsy()
    })

    it('Selector background color changes with selected interval', async () => {
        const wrapper = mount(timeIntervalSelector, { localVue, store, stubs })
        expect(wrapper.find('#container').classes()).toContain('purple')
        state.timeIntervalSelect = 'shortBreak'
        await localVue.nextTick()
        expect(wrapper.find('#container').classes()).toContain('green')
    })

    it('Selector message changes with selected interval', async () => {
        const wrapper = mount(timeIntervalSelector, { localVue, store, stubs })
        const textBefore = wrapper.find('#message').text()
        state.timeIntervalSelect = 'shortBreak'
        await localVue.nextTick()
        const textAfter = wrapper.find('#message').text()
        expect(textBefore !== textAfter).toBeTruthy()
    })
})