<template>
  <div class="home_page">
    <img 
      src="@/assets/horse-racing.jpg"
      draggable="false"
      class="home_page_image"
      alt="home page"
    />
    <div class="home_page_button_container">
      <Btn
        v-for="btn in buttons"
        :key="btn.label"
        size="lg"
        :label="btn.label"
        @click="() => goToView(btn.view)"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Btn from '@/components/Btn.vue'

const router = useRouter()

const buttons = [
  { label: "START", view: "race" },
  { label: "HORSES", view: "horses" },
  { label: "PROGRAM", view: "program" },
  { label: "RESULTS", view: "results" }
]

const goToView = (view) => {
  router.push(`/${view}`)
}
</script>

<style lang="scss" scoped>
.home_page {
  position: relative;

  &_image {
    display: block;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }

  &_button_container {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
}
</style>
