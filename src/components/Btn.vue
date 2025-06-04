<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    {{ label }}
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
  label: {
    type: [String, Number],
    default: ''
  },
  size: {
    type: String,
    default: 'md'
  },
  type: {
    type: String,
    default: 'button'
  },
  full: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const buttonClasses = computed(() => {
  return [
    'btn', props.size,
    {
      'disabled': props.disabled,
      'full': props.full
    }
  ]
})
</script>

<style scoped>
.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  color: #535050;

  &:hover:not(:disabled) {
    cursor: pointer;
    transform: scale(1.03);
    transition: transform 0.3s ease;
  }

  &:active:not(:disabled) {
    outline: 1px solid #a49999;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &.lg {
    width: 200px;
    height: 50px
  }

  &.full {
    width: 100%;
  }
}
</style>
