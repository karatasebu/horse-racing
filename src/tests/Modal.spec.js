import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '@/components/Modal.vue'

describe('Modal.vue', () => {
  it('does not render modal content when modelValue is false', () => {
    const wrapper = mount(Modal, {
      props: { modelValue: false },
      slots: {
        default: '<div class="modal-text">Hello Modal</div>'
      },
      attachTo: document.body
    })
    
    expect(document.querySelector('.modal_overlay')).toBeNull()

    wrapper.unmount()
  })

  it('renders modal content and slot when modelValue is true', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true },
      slots: {
        default: '<div class="modal-text">Hello Modal</div>'
      },
      attachTo: document.body
    })

    const overlay = document.querySelector('.modal_overlay')
    expect(overlay).not.toBeNull()

    const modalText = document.querySelector('.modal-text')
    expect(modalText).not.toBeNull()
    expect(modalText.textContent).toBe('Hello Modal')

    wrapper.unmount()
  })
})
