<template>
  <div class="program">
    <template v-if="program.length > 0">
      <div class="program_wrapper">
        <div class="program_header">
          <span>{{ `${selectedRound + 1}. Round - ${program[selectedRound].distance} mt.` }}</span>
          <img
            src="@/assets/refresh.svg"
            class="refresh_icon"
            alt="refresh"
            @click="initializeProgram"
          />
        </div>
        <Table
          :items="items"
          :headers="headers"
        />
        <Pagination
          :selected="selectedRound"
          :totalCount="roundCount"
          @update:selected="(val) => selectedRound = val"
        />
      </div>
    </template>
    <NoContent
      v-else
      title="No program has been generated yet!"
      description="Click the button below to create a 6-round race program."
      btnLabel="Generate"
      @btnClick="initializeProgram"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import NoContent from '@/components/NoContent.vue'
import Table from '@/components/Table.vue'
import Pagination from '@/components/Pagination.vue'

const store = useStore()

const selectedRound = ref(0)
const headers = [
  { key: 'position', text: '#' },
  { key: 'name', text: 'Name' },
  { key: 'color', text: 'Color' },
  { key: 'condition', text: 'Condition' }
]

const program = computed(() => {
  return store.state.program
})
const roundCount = computed(() => {
  return store.state.program.length
})
const items = computed(() => {
  return program.value[selectedRound.value].horses.map((h, i) => ({
    position: i + 1,
    name: h.name,
    color: h.color,
    condition: h.condition
  }))
})

const initializeProgram = () => {
  selectedRound.value = 0
  store.dispatch('initializeProgram')
}
</script>

<style lang="scss" scoped>
.program {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &_header {
    display: flex;
    justify-content: space-between;

    span {
      color: $title-color;
      font-weight: $font-weight-semi-bold;
    }

    .refresh_icon {
      &:hover {
        cursor: pointer;
      }
    }
  }

  &_wrapper {
    display: flex;
    flex-direction: column;
  }
}
</style>
