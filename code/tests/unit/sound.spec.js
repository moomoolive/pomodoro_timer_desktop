import sound from '../../src/components/commonComponents/popUpComponents/sound.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('This component triggers alarm sound and message to appear after interval is finished', () => {
    let store
    let state

    beforeEach(() => {
        state = {
            sound: {
                audio: {
                    play: function() { return }
                }
            },
            timeIntervalSelect: 'workInterval'
        }
        store = new Vuex.Store({ state })
        jest.useFakeTimers()
    })

    it('When component is created sound is emitted, repeated, and desktop notifications', () => {
        const wrapper = mount(sound, { localVue, store })
        expect(setInterval).toHaveBeenCalled()
    })

    it('Message changes with finished interval', async () => {
        const wrapper = mount(sound, { localVue, store })
        const messageBefore = wrapper.find(".text").text()
        state.timeIntervalSelect = 'shortBreak'
        await localVue.nextTick()
        const messageAfter = wrapper.find(".text").text()
        expect(messageAfter !== messageBefore).toBe(true)
    })
})