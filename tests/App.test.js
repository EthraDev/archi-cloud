import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('App.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })
})
