<template>
  <div class="results">
    <template v-if="results.length > 0">
      <div class="results_wrapper">
          <span class="results_header">{{ `${selectedRound + 1}. Round - ${program[selectedRound].distance} mt.` }}</span>
        <Table
          class="results_table"
          :items="results[selectedRound]"
          :headers="headers"
        />
        <Pagination
          :selected="selectedRound"
          :totalCount="resultsCount"
          @update:selected="(val) => selectedRound = val"
        />
      </div>
    </template>
    <NoContent
      v-else
      title="No results to display!"
      description="You must start the race to see the results."
      btnLabel="Go to Race"
      @btnClick="goToRacePage"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import NoContent from '@/components/NoContent.vue'
import Table from '@/components/Table.vue'
import Pagination from '@/components/Pagination.vue'

const store = useStore()
const router = useRouter()

const selectedRound = ref(0)
const headers = [
  { key: 'position', text: '#' },
  { key: 'name', text: 'Name' }
]

const results = computed(() => {
  return store.state.results
})
const program = computed(() => {
  return store.state.program
})
const resultsCount = computed(() => {
  return results.value.length
})

const goToRacePage = () => {
  router.push('/race')
}
</script>

<style scoped lang="scss">
.results {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &_header {
    color: $title-color;
    font-weight: $font-weight-semi-bold;
  }

  &_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>

<style lang="scss">
.results {
  &_table {
    min-width: 475px;

    thead tr th:first-child {
      width: 60px;
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
}
</style>
