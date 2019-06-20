import { checkValidity } from 'utils/checkValidity'

describe('checkValidity()', () => {
  it('return true when no rules provided', () => {
    const test = checkValidity()
    expect(test).toEqual(true)
  })
  it('return false if no value when rules is required', () => {
    const test = checkValidity('', { required: true })
    expect(test).toEqual(false)
  })
})
