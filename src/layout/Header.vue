<template>
  <header class="header">
    <div class="logo" @click="goHome">
      <span>Horse Racing</span>
    </div>
    <nav class="nav">
      <RouterLink to="/race">Race</RouterLink>
      <RouterLink to="/horses">Horses</RouterLink>
      <RouterLink to="/program">Program</RouterLink>
      <RouterLink to="/results">Results</RouterLink>
    </nav>
    <div class="button_wrapper">
      <Btn
        v-if="isRacePage"
        :label="isRunning ? 'Stop' : 'Start'"
        :disabled="!hasProgram"
        @click="toggleRace"
      />
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Btn from '@/components/Btn.vue'

const router = useRouter()
const route = useRoute()
const store = useStore()

const isRacePage = computed(() => {
  return route.name === 'Race'
})
const isRunning = computed(() => {
  return store.state.isRunning
})
const hasProgram = computed(() => {
  return store.state.program.length > 0
})

const goHome = () => {
  router.push('/')
}
const toggleRace = () => {
  store.dispatch('setIsRunning', !isRunning.value)
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8B5A2B;
  color: white;
  max-height: 60px;
  min-height: 60px;
  padding-inline: 30px;

  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }

  .nav {
    display: flex;
    gap: 1.5rem;

    .router-link-exact-active {
      border-bottom: 2px solid #fff;
    }

    a {
      color: white;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        border-bottom: 2px solid #fff;
      }
    }
  }

  .button_wrapper {
    min-width: 100px;
  }
}
</style>
