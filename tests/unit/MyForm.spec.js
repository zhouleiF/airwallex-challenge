import { mount } from '@vue/test-utils'
import MyForm from '@/components/MyForm/index.vue'
import flushPromises from 'flush-promises'
import { errorMessage } from './_mocks_/axios'
jest.mock('axios')
const afterSubmit = jest.fn(() => {})

describe('MyForm component test', () => {
  const wrapper = mount(MyForm, {
    listeners: {
      afterSubmit
    }
  })
  const nameInput = wrapper.find('input[name="name"]')
  const emailInput = wrapper.find('input[name="email"]')
  const confirmEmailInput = wrapper.find('input[name="confirmEmail"]')
  const form = wrapper.find('form')
  const errorNode = wrapper.find('.error')
  it('renders MyForm correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('submit directly with no fill, all fields highlight', async () => {
    form.trigger('submit')
    await wrapper.vm.$nextTick()
    expect(nameInput.classes('error')).toBe(true)
    expect(emailInput.classes('error')).toBe(true)
    expect(confirmEmailInput.classes('error')).toBe(true)
  })
  it('full name needs to be at least 3 characters long', async () => {
    nameInput.setValue('zl')
    await wrapper.vm.$nextTick()
    expect(nameInput.classes('error')).toBe(true)
    nameInput.setValue('zhoulei')
    await wrapper.vm.$nextTick()
    expect(nameInput.classes('error')).toBe(false)
  })
  it('email needs to be in validation email format', async () => {
    emailInput.setValue('zhoulei@')
    await wrapper.vm.$nextTick()
    expect(emailInput.classes('error')).toBe(true)
    emailInput.setValue('zhoulei@qq.com')
    await wrapper.vm.$nextTick()
    expect(emailInput.classes('error')).toBe(false)
  })
  it('confirm email needs to match email.', async () => {
    confirmEmailInput.setValue('zl')
    await wrapper.vm.$nextTick()
    expect(confirmEmailInput.classes('error')).toBe(true)
    confirmEmailInput.setValue('zhoulei@qq.com')
    await wrapper.vm.$nextTick()
    expect(confirmEmailInput.classes('error')).toBe(false)
  })
  it('when all fields validate properly, submit successful, show the loading and emit afterSubmit event', async () => {
    form.trigger('submit')
    expect(wrapper.vm.isLoading).toBe(true)
    await flushPromises()
    expect(wrapper.vm.isLoading).toBe(false)
    expect(afterSubmit.mock.calls.length).toBe(1)
  })
  it('app should display error message from the server, case: email has used', async () => {
    emailInput.setValue('usedemail@airwallex.com')
    confirmEmailInput.setValue('usedemail@airwallex.com')
    form.trigger('submit')
    await flushPromises()
    expect(errorNode.text()).toBe(errorMessage)
  })
})
