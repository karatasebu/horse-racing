import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NoContent from '@/components/NoContent.vue'
import Btn from '@/components/Btn.vue'

describe('NoContent.vue', () => {
  const factory = (props = {}) => {
    return mount(NoContent, {
      props,
      global: {
        components: { Btn }
      }
    })
  }

  it('renders title, description and image correctly', () => {
    const wrapper = factory({
      title: 'No Data',
      description: 'There is no content available.',
      btnLabel: 'Reload'
    })

    expect(wrapper.find('.no_content_title').text()).toBe('No Data')
    expect(wrapper.find('.no_content_desc').text()).toBe('There is no content available.')
    
    const img = wrapper.find('img.no_content_image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('alt')).toBe('horse')
  })

  it('passes btnLabel to Btn component', () => {
    const wrapper = factory({
      btnLabel: 'Click me'
    })

    const btn = wrapper.findComponent(Btn)
    expect(btn.exists()).toBe(true)
    expect(btn.props('label')).toBe('Click me')
  })

  it('emits btnClick event when Btn is clicked', async () => {
    const wrapper = factory({
      btnLabel: 'Click me'
    })

    const btn = wrapper.findComponent(Btn)
    await btn.trigger('click')

    expect(wrapper.emitted('btnClick')).toBeTruthy()
    expect(wrapper.emitted('btnClick').length).toBe(1)
  })
})
