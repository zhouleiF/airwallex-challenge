import { regEmail } from '@/components/MyForm/rules.js'

describe('test validate rules', () => {
  it('correct email validate to be true', () => {
    const email = '867569821@qq.com'
    expect(regEmail.test(email)).toBe(true)
  })
  it('email without .com validate to be false', () => {
    const email = '867569821@qq'
    expect(regEmail.test(email)).toBe(false)
  })
  it('email without @ validate to be false', () => {
    const email = '867569821qq.com'
    expect(regEmail.test(email)).toBe(false)
  })
})
