import selectionButtonGroup from '../../src/components/selectionComponents/selectionButtonGroup.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('selectionButtonGroup', () => {
    let store
    let actions

    beforeEach(() => {
        actions = {
            changeInterval: jest.fn()
        }
        store = new Vuex.Store({ actions })
    })

    it('Pressing any of buttons changes to desired interval', () => {
        const wrapper = mount(selectionButtonGroup, { localVue, store })
        const button = wrapper.find("#shortBreak").trigger('click')
        expect(actions.changeInterval).toHaveBeenCalled()
    })
})