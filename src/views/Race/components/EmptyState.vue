<template>
  <div class="no_content_wrapper">
    <NoContent
      title="No program has been generated yet!"
      description="Click the button below to create a 6-round race program."
      btnLabel="Generate"
      @btnClick="handleClick"
    />
  </div>
</template>

<script setup>
import NoContent from '@/components/NoContent.vue'

const emit = defineEmits(['initializeProgram'])

const handleClick = () => emit('initializeProgram')
</script>

<style scoped lang="scss">
.no_content_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
