import settings from '../../src/components/commonComponents/popUpComponents/settings.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
jest.mock("@/components/commonComponents/sounds")

const localVue = createLocalVue()
localVue.use(Vuex)

describe('This component allows user to pick an alarm sound', () => {
    let store
    let state
    let actions

    beforeEach(() => {
        state = {
            sound: {
                name: 'cuckooClock'
            }
        }
        actions = { changeSound: jest.fn() }
        store = new Vuex.Store({ state, actions })
    })

    it('Pressing submit button sets selected sound as default alarm', async () => {
        const wrapper = mount(settings, { localVue, store })
        const submitButton = wrapper.find('#submit')
        await submitButton.trigger('click')
        expect(wrapper.emitted().submit).toBeTruthy()
        await localVue.nextTick()
        expect(actions.changeSound).toHaveBeenCalled()
    })

    it('Selecting a sound from dropdown plays the sounds', async () => {
        const spy = jest.spyOn(settings.watch, 'sound')
        const wrapper = mount(settings, { localVue, store })
        await wrapper.setData({
            soundFiles: {
                cat: {
                    play: function() {
                        return
                    } 
                }
            }
        })
        await wrapper.setData({ sound: 'cat' })
        await localVue.nextTick()
        expect(spy).toHaveBeenCalled()
    })
})