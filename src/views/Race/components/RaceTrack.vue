<template>
  <div ref="trackRef" class="race_track">
    <div
      v-for="horse in horses"
      :key="horse.id"
      class="lane"
    >
      <img
        :src="imgSource(horse.color, horse.id)"
        class="horse_image"
        alt="horse"
        :style="{ left: `${race.positions[horse.id]}px` }"
      />
      <img src="@/assets/pngs/start-line.png" class="start_line" alt="start" />
      <span class="horse_name">{{ horse.name.toUpperCase() }}</span>
      <img src="@/assets/pngs/start-line.png" class="end_line" alt="end" />
    </div>
  </div>
</template>

<script setup>
import { toKebabCase } from '@/utils'

const props = defineProps(['horses', 'race', 'isRunning'])
const trackRef = defineModel('trackRef', { type: Object })

const pngs = import.meta.glob(
  '@/assets/pngs/*.png', 
  { eager: true, import: 'default' }
)
const gifs = import.meta.glob(
  '@/assets/gifs/*.gif', 
  { eager: true, import: 'default' }
)

const imgSource = (color, id) => {
  const isFinished = props.race.finishedHorses.includes(id)
  const fileType = props.isRunning && !isFinished ? 'gif' : 'png';
  const folder = props.isRunning && !isFinished ? 'gifs' : 'pngs';
  const path = `/src/assets/${folder}/${toKebabCase(color)}.${fileType}`;
  return props.isRunning && !isFinished ? gifs[path] : pngs[path];
}
</script>

<style scoped lang="scss">
.race_track {
  width: 100%;
  background: #3E8D32;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
  overflow: hidden;

  .lane {
    position: relative;
    border-bottom: 2px solid #fff;
    height: 60px;

    .horse_image {
      width: 70px;
      height: auto;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2
    }

    .horse_name {
      color: #fff;
      position: absolute;
      left: 85px;
      top: 50%;
      transform: translateY(-50%);
    }

    .start_line {
      position: absolute;
      width: 10px;
      height: 100%;
      left: 70px;
    }

    .end_line {
      position: absolute;
      width: 10px;
      height: 100%;
      right: 70px;
    }
  }
}
</style>
