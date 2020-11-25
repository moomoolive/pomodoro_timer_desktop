import timer from '../../src/views/timer.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('timer', () => {
    let store
    let actions
    
    beforeEach(() => {
        actions = {
            changeInterval: jest.fn()
        }
        store = new Vuex.Store({ actions })
    })

    it('Timer starts on work Interval', () => {
        const wrapper = shallowMount(timer, { localVue, store })
        expect(actions.changeInterval).toBeCalled()
    })
})