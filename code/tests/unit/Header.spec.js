import Header from '../../src/components/Header.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Header of the entire app', () => {
    let state
    let store
    let stubs

    beforeEach(() => {
        state = {
            smallScreen: false
        }
        store = new Vuex.Store({ state })
        stubs = ["popUp"]
    })

    it('Left side buttons disappear on small screens', async () => {
        const wrapper = mount(Header, { localVue, store })
        expect(wrapper.find("#left")).toBeTruthy()
        state.smallScreen = true
        await localVue.nextTick()
        expect(wrapper.find("#left").exists()).toBeFalsy()
    })

    it('Clicking on github or feedback form opens it in new tab', () => {
        const spy = jest.spyOn(Header.methods, 'openNewTab')
        jest.spyOn(global, 'open').mockImplementation(() => {})
        const wrapper = mount(Header, { localVue, store })
        const githubButton = wrapper.find('#buttonGit')
        githubButton.trigger('click')
        expect(spy).toHaveBeenCalled()
    })

    it('Clicking settings button makes settings menu appear', () => {
        const wrapper = mount(Header, { localVue, store, stubs })
        expect(wrapper.findComponent({ name: 'popUp'} ).exists()).toBeFalsy()
        const settingsButton = wrapper.find("#settingsButton")
        settingsButton.trigger('click')
        expect(wrapper.vm.showSettingsMenu).toBe(true)
    })
})