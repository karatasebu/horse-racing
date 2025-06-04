import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Btn from '@/components/Btn.vue'

describe('Btn.vue', () => {
  it('renders label', () => {
    const wrapper = mount(Btn, {
      props: { label: 'Click Me' }
    })
    expect(wrapper.text()).toContain('Click Me')
  })

  it('applies size class', () => {
    const wrapper = mount(Btn, {
      props: { size: 'lg' }
    })
    expect(wrapper.classes()).toContain('lg')
  })

  it('adds "full" class when full prop is true', () => {
    const wrapper = mount(Btn, {
      props: { full: true }
    })
    expect(wrapper.classes()).toContain('full')
  })

  it('disables button when disabled prop is true', () => {
    const wrapper = mount(Btn, {
      props: { disabled: true }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Btn)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Btn, {
      props: { disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('renders slot content', () => {
    const wrapper = mount(Btn, {
      slots: {
        default: '<span class="icon">🔥</span>'
      }
    })
    expect(wrapper.find('.icon').exists()).toBe(true)
  })
})
