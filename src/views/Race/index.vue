<template>
  <div class="race">
    <div v-if="program.length" class="race_wrapper">
      <LeaderBoard :ranking="ranking" :currentRoundTitle="currentRoundTitle" />
      <RaceTrack
        v-model:trackRef="trackRef"
        :horses="horses"
        :race="race"
        :isRunning="isRunning"
      />
    </div>
    <EmptyState v-else @initializeProgram="initializeProgram" />
    <ResultModal
      :showModal="showModal"
      :currentRoundTitle="currentRoundTitle"
      :resultItems="resultItems"
      :isFinalRound="currentRound === 6"
      @initializeProgram="initializeProgram"
      @generateRace="generateRace"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import LeaderBoard from './components/LeaderBoard.vue'
import RaceTrack from './components/RaceTrack.vue'
import EmptyState from './components/EmptyState.vue'
import ResultModal from './components/ResultModal.vue'
import { baseDistance } from '@/constants'

const store = useStore()
const router = useRouter()

const trackRef = ref(null)
const showModal = ref(false)
let raceInterval = null

const race = computed(() => store.state.race)
const program = computed(() => store.state.program)
const currentRound = computed(() => store.state.race?.round || 1)
const isRunning = computed(() => store.state.isRunning)
const ranking = computed(() => store.getters.ranking)

const currentRoundTitle = computed(() => {
  const round = currentRound.value
  const distance = program.value[round - 1]?.distance
  return `${round}. Round - ${distance} mt.`
})

const horses = computed(() => {
  const round = currentRound.value
  return program.value.length ? program.value[round - 1]?.horses || [] : []
})

const resultItems = computed(() =>
  ranking.value.map((name, i) => ({
    position: i + 1,
    name
  }))
)

const initializeProgram = () => {
  store.dispatch('initializeProgram', 1)
  showModal.value = false
}

const generateRace = () => {
  store.dispatch('generateRace', currentRound.value + 1)
  showModal.value = false
}

const startRace = () => {
  if (raceInterval) return

  raceInterval = setInterval(() => {
    if (!isRunning.value || !trackRef.value?.offsetWidth) return

    const newPositions = {}
    const finishedHorses = []
    const trackDistance = trackRef.value.offsetWidth

    horses.value.forEach(horse => {
      const currentPos = race.value.positions[horse.id]
      const targetPos = trackDistance - 70

      if (currentPos < targetPos) {
        const distFactor = baseDistance / program.value[currentRound.value - 1].distance
        const baseSpeed = Math.random() * 10
        const bonus = horse.condition * 0.05
        const speed = (baseSpeed + bonus) * distFactor

        newPositions[horse.id] = currentPos + speed
      } else if (!race.value.finishedHorses.includes(horse.id)) {
        finishedHorses.push(horse.id)
      }
    })

    store.dispatch('setRace', {
      ...race.value,
      positions: { ...race.value.positions, ...newPositions },
      finishedHorses: [...race.value.finishedHorses, ...finishedHorses]
    })
  }, 100)
}

watch(() => race.value.finishedHorses, newVal => {
  if (newVal.length === 10) {
    store.dispatch('setIsRunning', false)
    store.dispatch('setResults', [...store.state.results, resultItems.value])
    showModal.value = true
  }
})

onMounted(() => {
  startRace()
  if (race.value.finishedHorses.length === 10) {
    showModal.value = true
  }
})

onUnmounted(() => {
  clearInterval(raceInterval)
})
</script>

<style scoped lang="scss">
.race {
  height: 100%;
  width: 100%;
  position: relative;
  padding-block: 20px;
}
</style>
