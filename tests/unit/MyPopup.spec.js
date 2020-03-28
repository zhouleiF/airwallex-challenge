import { mount } from '@vue/test-utils'
import MyPopup from '@/components/MyPopup.vue'

const title = 'this is popup title'
const content = 'this is popup content'
const footer = 'this is popup footer'
const beforeClose = jest.fn(() => {})

describe('MyPopup component', () => {
  const wrapper = mount(MyPopup, {
    slots: {
      title,
      content,
      footer
    },
    listeners: {
      beforeClose
    }
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('renders title slot', () => {
    expect(wrapper.find('.title').text()).toEqual(title)
  })
  it('renders content slot', () => {
    expect(wrapper.find('.content').text()).toEqual(content)
  })
  it('renders footer slot', () => {
    expect(wrapper.find('.footer').text()).toEqual(footer)
  })
  it('default is hidden', () => {
    expect(wrapper.isVisible()).toBe(false)
  })
  it('show the popup', async () => {
    wrapper.vm.show()
    await wrapper.vm.$nextTick()
    expect(wrapper.isVisible()).toBe(true)
  })
  it('hide the popup by calling close method', async () => {
    wrapper.vm.close()
    await wrapper.vm.$nextTick()
    expect(wrapper.isVisible()).toBe(false)
  })
  it('hide the popup by click the background ', async () => {
    wrapper.vm.show()
    await wrapper.vm.$nextTick()
    expect(wrapper.isVisible()).toBe(true)
    wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.isVisible()).toBe(false)
  })
  it('emit beforeClose event when popup hidden, we have tried two times', () => {
    expect(beforeClose.mock.calls.length).toBe(2)
  })
})
