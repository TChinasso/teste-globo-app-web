import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SignIn from '../login/SignIn.vue'

describe('SignIn', () => {
  it('renders properly', () => {
    const wrapper = mount(SignIn, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
