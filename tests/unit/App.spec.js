import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders App correctly', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.element).toMatchSnapshot()
  })
})
