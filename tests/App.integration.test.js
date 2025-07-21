import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('App.vue integration', () => {
  it('affiche le message du composant HelloWorld', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Bienvenue à Vue')
  })

  it('met à jour le compteur au clic', async () => {
    const wrapper = mount(App)

    const button = wrapper.get('button')
    expect(button.text()).toBe('Compteur: 0')

    await button.trigger('click')
    expect(button.text()).toBe('Compteur: 1')

    await button.trigger('click')
    expect(button.text()).toBe('Compteur: 2')
  })
})
