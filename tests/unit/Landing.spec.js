import { shallowMount, mount, createWrapper } from '@vue/test-utils'
import Landing from '@/view/Landing.vue'

describe('Landing.vue', () => {
  it('renders Loading correctly', () => {
    const wrapper = shallowMount(Landing)
    expect(wrapper.element).toMatchSnapshot()
  })
  it('when the Request Invite button is clicked, a form popup shows', async () => {
    const wrapper = mount(Landing)
    const inviteButton = wrapper.find('.btn')
    const formPopup = createWrapper(wrapper.vm.$refs.formPopup)
    inviteButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(formPopup.isVisible()).toBe(true)
  })
})
