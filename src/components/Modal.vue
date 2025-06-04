<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal_overlay">
      <div class="modal_content">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps(['modelValue'])
</script>

<style lang="scss" scoped>
.modal {
  &_overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
  }

  &_content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    padding: 24px;
    width: 100%;
    max-width: 450px;
    position: relative;
  }
}
</style>
