<template>
  <Header v-if="!isHomePage" />
  <router-view />
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Header from '@/layout/Header.vue'

const store = useStore()
const route = useRoute()

const isHomePage = computed(() => {
  return route.name === 'Home'
})

onMounted(() => {
  store.dispatch('generateHorseList')
})
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
