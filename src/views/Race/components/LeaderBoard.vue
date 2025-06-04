<template>
  <div class="leaderboard">
    <span class="leaderboard_title">{{ currentRoundTitle }}</span>
    <div class="leaderboard_wrapper">
      <div
        v-for="(name, index) in ranking"
        :key="index"
        class="leaderboard_item"
      >
        <span class="rank">{{ index + 1 }}.</span> {{ name }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['ranking', 'currentRoundTitle'])
</script>

<style scoped lang="scss">
.leaderboard {
  &_title {
    display: inline-block;
    width: 100%;
    text-align: center;
    color: $title-color;
    font-weight: $font-weight-semi-bold;
  }

  &_wrapper {
    display: flex;
    justify-content: center;
    gap: 16px;
    overflow-x: auto;
    padding: 16px;
    white-space: nowrap;
    border-radius: 8px;

    .leaderboard_item {
      padding: 8px 16px;
      border: 1px solid $border-color;
      border-radius: 6px;

      &:first-child {
        background: $gold-color;
      }

      &:nth-child(2) {
        background: $silver-color;
      }
      &:nth-child(3) {
        background: $bronze-color;
      }
    }

    .rank {
      margin-right: 4px;
      color: #555;
    }
  }
}
</style>
