<template>
  <div class="horses">
    <div class="horses_wrapper">
      <HorseCard 
        v-for="horse in horseList"
        class="horse_card"
        :key="horse.id"
        :name="horse.name"
        :condition="horse.condition"
        :color="horse.color"
        :source="horseSource(horse.color)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
//
import HorseCard from '@/components/HorseCard.vue'
import { toKebabCase } from '@/utils'

const store = useStore()

const images = import.meta.glob(
  '@/assets/pngs/*.png', 
  { eager: true, import: 'default' }
)

const horseList = computed(() => {
  return store.state.horseList
})

const horseSource = (color) => {
  return images[`/src/assets/pngs/${toKebabCase(color)}.png`]
}
</script>

<style lang="scss" scoped>
.horses {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: auto;

  &_wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-block: 20px;
    width: 100%;
    max-width: 1200px;
    height: fit-content;
  }
  
  .horse_card {
    width: calc(25% - 15px);
  }
}
</style>
