<template>
  <Modal v-model="isOpened">
    <span class="result_modal_title">{{ currentRoundTitle }}</span>
    <Table class="result_modal_table" :items="resultItems" :headers="headers" />
    <div class="result_modal_buttons">
      <Btn full size="lg" label="See All Results" @click="goToResults" />
      <Btn
        v-if="isFinalRound"
        full
        size="lg"
        label="New Program"
        @click="initializeProgram"
      />
      <Btn
        v-else
        full
        size="lg"
        label="Next Round"
        @click="generateRace"
      />
    </div>
  </Modal>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'
import Table from '@/components/Table.vue'
import Btn from '@/components/Btn.vue'

const props = defineProps(['showModal', 'currentRoundTitle', 'resultItems', 'isFinalRound'])
const emit = defineEmits(['initializeProgram', 'generateRace'])

const router = useRouter()

const headers = [
  { key: 'position', text: '#' },
  { key: 'name', text: 'Name' }
]

const isOpened = computed(() => props.showModal)

const goToResults = () => {
  router.push('/results')
}
const initializeProgram  = () => emit('initializeProgram')
const generateRace = () => emit('generateRace')
</script>

<style lang="scss">
.result_modal_title {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: $title-color;
  font-weight: $font-weight-semi-bold;
}
.result_modal_table {
  thead tr th:first-child {
    width: 15px;
  }

  tbody tr:first-child {
    background: $gold-color;
  }
  tbody tr:nth-child(2) {
    background: $silver-color;
  }
  tbody tr:nth-child(3) {
    background: $bronze-color;
  }
}

.result_modal_buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
</style>
