<template>
  <div class="no_content">
    <img src="@/assets/gifs/horse.gif" class="no_content_image" alt="horse" />
    <span class="no_content_title">{{ title }}</span>
    <span class="no_content_desc">{{ description }}</span>
    <Btn
      :label="btnLabel"
      @click="$emit('btnClick')"
    />
  </div>
</template>

<script setup>
import Btn from '@/components/Btn.vue'

defineEmits(['btnClick'])
defineProps({
  title: String,
  description: String,
  btnLabel: String
})
</script>

<style lang="scss" scoped>
.no_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;

  &_title {
    font-size: 18px;
    font-weight: $font-weight-semi-bold;
    margin-bottom: 3px;
  }

  &_desc {
    margin-bottom: 15px;
  }

  &_image {
    width: 250px;
    height: auto;
  }
}
</style>
