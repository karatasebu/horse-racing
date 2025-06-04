import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HorseCard from '@/components/HorseCard.vue'

describe('HorseCard.vue', () => {
  it('renders props correctly', () => {
    const wrapper = mount(HorseCard, {
      props: {
        name: 'Shadowfax',
        color: 'White',
        source: '/horse.png',
        condition: 85
      }
    })

    expect(wrapper.text()).toContain('Name: Shadowfax')
    expect(wrapper.text()).toContain('Color: White')

    const img = wrapper.find('img.horse_image')
    expect(img.attributes('src')).toBe('/horse.png')

    const bar = wrapper.find('.condition_bar')
    expect(bar.attributes('style')).toContain('width: 85%')

    const info = wrapper.find('.condition_info')
    expect(info.text()).toBe('85 / 100')
  })
})
