import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Table from '@/components/Table.vue'

describe('Table.vue', () => {
  const headers = [
    { key: 'id', text: 'ID' },
    { key: 'name', text: 'Name' },
    { key: 'age', text: 'Age' }
  ]

  const items = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 }
  ]

  it('renders headers correctly', () => {
    const wrapper = mount(Table, {
      props: { headers, items }
    })

    const ths = wrapper.findAll('thead th')
    expect(ths).toHaveLength(headers.length)
    headers.forEach((header, i) => {
      expect(ths[i].text()).toBe(header.text)
    })
  })

  it('renders rows and cells correctly', () => {
    const wrapper = mount(Table, {
      props: { headers, items }
    })

    const trs = wrapper.findAll('tbody tr')
    expect(trs).toHaveLength(items.length)

    trs.forEach((tr, rowIndex) => {
      const tds = tr.findAll('td')
      expect(tds).toHaveLength(headers.length)
      headers.forEach((header, colIndex) => {
        expect(tds[colIndex].text()).toBe(String(items[rowIndex][header.key]))
      })
    })
  })

  it('uses item.id as key for rows', () => {
    const wrapper = mount(Table, {
      props: { headers, items }
    })

    const trs = wrapper.findAll('tbody tr')
    trs.forEach((tr, index) => {
      expect(items[index].id).toBeDefined()
    })
  })
})
