import { shallowMount } from '@vue/test-utils'
import App from '../../src/App.vue'
jest.mock("@/components/commonComponents/sounds")

describe('App', () => {
    let stubs
    
    beforeEach(() => {
        stubs = ['router-view']
    })

    it('Default user settings retrieved on app creation', () => {
        const spy = jest.spyOn(App.methods, 'getUserSettings')
        const wrapper = shallowMount(App, { stubs })
        expect(spy).toHaveBeenCalled()
    })

    it('Check screen size of incoming device on app creation', () => {
        const spy = jest.spyOn(App.methods, 'checkSmallScreen')
        const wrapper = shallowMount(App, { stubs })
        expect(spy).toHaveBeenCalled()
    })
})

