<template>
  <div class="horse">
    <img :src="source" class="horse_image" alt="horse" />
    <div class="horse_info">
      <div class=horse_info_text>
        <span><strong>Name:</strong> {{ name }}</span>
        <span><strong>Color:</strong> {{ color }}</span>
      </div>
      <div class="condition_container">
        <div class="condition_bar" :style="{ width: condition + '%' }"></div>
        <div class="condition_info">{{ `${condition} / 100` }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  color: String,
  source: String,
  condition: Number
})
</script>

<style lang="scss" scoped>
.horse {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  &_info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;

    &_text {
      display: flex;
      flex-direction: column;
    }
  }

  &_image {
    width: 100px;
    height: auto;
  }

  .condition_container {
    width: 100%;
    max-width: 200px;
    height: 15px;
    background-color: #eee;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    margin-top: 5px;

    .condition_bar {
      height: 100%;
      background-color: #4caf50;
      transition: width 0.3s ease;
    }

    .condition_info {
      line-height: 15px;
      font-size: 12px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
