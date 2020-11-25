import intervalButton from '../../src/components/selectionComponents/intervalTiming/intervalButton.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component used to set interval timing', () => {
    let store
    let state
    let actions
    let propsData

    beforeEach(() => {
        state = { timeIntervalSelect: jest.fn() }
        actions = { updatedSelectedTime: jest.fn() }
        propsData = { buttonNumber: '1' }
        store = new Vuex.Store({ state,actions })
    })

    // This solution hacky, but I couldn't find a way to dynamically
    // manipulate the parent variable 'scaleFactor'. I opted to 
    // reinitializing wrapper again, along with 'scaleFactor'.
    it('Display number changes with scale factor', () => {
        let wrapper = mount(intervalButton, { localVue, store, propsData })
        wrapper.vm.$parent.scaleFactor = 5
        expect(wrapper.vm.displayNumber).toBe('5')
        wrapper = mount(intervalButton, { localVue, store, propsData })
        wrapper.vm.$parent.scaleFactor = 2
        expect(wrapper.vm.displayNumber).toBe('2')
    })

    it('Changing button number prop changes display', async () => {
        const wrapper = mount(intervalButton, { localVue, store, propsData })
        wrapper.vm.$parent.scaleFactor = 1
        expect(wrapper.vm.displayNumber).toBe('1')
        await wrapper.setProps({ buttonNumber: '2' })
        expect(wrapper.vm.displayNumber).toBe('2')
    })

    it('Pressing on button changes timing of interval', async () => {
        const wrapper = mount(intervalButton, { localVue, store, propsData })
        const button = wrapper.find("#time1")
        button.trigger('click')
        await localVue.nextTick()
        expect(actions.updatedSelectedTime).toHaveBeenCalled()
    })
})