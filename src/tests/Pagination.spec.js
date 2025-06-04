import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'
import Btn from '@/components/Btn.vue'

describe('Pagination.vue', () => {
  const factory = (props = {}) => {
    return mount(Pagination, {
      props: {
        selected: 0,
        totalCount: 5,
        ...props
      },
      global: {
        components: { Btn }
      }
    })
  }

  it('renders the correct number of page buttons', () => {
    const wrapper = factory({ totalCount: 3 })
    expect(wrapper.findAllComponents(Btn).length).toBe(5)
  })

  it('sets "selected" class on the selected page button', () => {
    const wrapper = factory({ selected: 2, totalCount: 5 })
    const buttons = wrapper.findAllComponents(Btn)

    const pageButtons = buttons.slice(1, -1)
    expect(pageButtons[2].classes()).toContain('selected')
  })

  it('disables prev button if selected is 0', () => {
    const wrapper = factory({ selected: 0 })
    const buttons = wrapper.findAllComponents(Btn)
    const prevBtn = buttons[0]
    expect(prevBtn.attributes('disabled')).toBeDefined()
  })

  it('disables next button if selected is last page', () => {
    const wrapper = factory({ selected: 4, totalCount: 5 })
    const buttons = wrapper.findAllComponents(Btn)
    const nextBtn = buttons[buttons.length - 1]
    expect(nextBtn.attributes('disabled')).toBeDefined()
  })

  it('emits update:selected with correct index when page button clicked', async () => {
    const wrapper = factory({ selected: 0, totalCount: 5 })
    const pageButtons = wrapper.findAllComponents(Btn).slice(1, -1)
    await pageButtons[3].trigger('click')
    expect(wrapper.emitted('update:selected')).toBeTruthy()
    expect(wrapper.emitted('update:selected')[0]).toEqual([3])
  })

  it('emits update:selected with selected - 1 when prev clicked', async () => {
    const wrapper = factory({ selected: 2, totalCount: 5 })
    const prevBtn = wrapper.findAllComponents(Btn)[0]
    await prevBtn.trigger('click')
    expect(wrapper.emitted('update:selected')[0]).toEqual([1])
  })

  it('does not emit update:selected when prev clicked on first page', async () => {
    const wrapper = factory({ selected: 0, totalCount: 5 })
    const prevBtn = wrapper.findAllComponents(Btn)[0]
    await prevBtn.trigger('click')
    expect(wrapper.emitted('update:selected')).toBeFalsy()
  })

  it('emits update:selected with selected + 1 when next clicked', async () => {
    const wrapper = factory({ selected: 2, totalCount: 5 })
    const nextBtn = wrapper.findAllComponents(Btn).at(-1)
    await nextBtn.trigger('click')
    expect(wrapper.emitted('update:selected')[0]).toEqual([3])
  })

  it('does not emit update:selected when next clicked on last page', async () => {
    const wrapper = factory({ selected: 4, totalCount: 5 })
    const nextBtn = wrapper.findAllComponents(Btn).at(-1)
    await nextBtn.trigger('click')
    expect(wrapper.emitted('update:selected')).toBeFalsy()
  })
})
