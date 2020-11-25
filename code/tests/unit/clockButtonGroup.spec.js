import clockButtonGroup from '../../src/components/clockComponents/clockButtonGroup.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('clockButtonGroup', () => {
    let store
    let state
    let actions

    beforeEach(() => {
        state = {
            isLastSession: jest.fn(),
            nextInterval: jest.fn(),
            currentInteval: jest.fn()
        }
        actions = {
            changeInterval: jest.fn()
        }
        store = new Vuex.Store({ state, actions })
    })

    it('Pressing left button triggers next interval', () => {
        const wrapper = shallowMount(clockButtonGroup, { localVue, store })
        wrapper.find('#nextIntervalButton').trigger('click')
        expect(actions.changeInterval).toHaveBeenCalled()
        expect(wrapper.emitted().rerender).toBeTruthy()
    })

    it('Pressing middle button triggers pause or play', () => {
        const wrapper = shallowMount(clockButtonGroup, { localVue, store })
        wrapper.find('#playButton').trigger('click')
        expect(wrapper.emitted().rerender).toBeTruthy()
    })
})