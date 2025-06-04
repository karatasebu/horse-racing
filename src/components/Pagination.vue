<template>
  <div class="pagination">
    <Btn @click="prevRound" :disabled="selected === 0">
      <img src="@/assets/chevron-left.svg" alt="chevron left" />
    </Btn>
    <Btn
      v-for="n in totalCount"
      :key="n"
      :label="n"
      :class="{ selected: selected === n - 1 }"
      @click="selectRound(n - 1)"
    />
    <Btn @click="nextRound" :disabled="selected === totalCount - 1">
      <img src="@/assets/chevron-right.svg" alt="chevron right" />
    </Btn>
  </div>
</template>

<script setup>
import Btn from '@/components/Btn.vue'

const props = defineProps({
  selected: {
    type: Number,
    required: true
  },
  totalCount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:selected'])

const selectRound = (index) => {
  emit('update:selected', index)
}

const prevRound = () => {
  if (props.selected > 0) {
    emit('update:selected', props.selected - 1)
  }
}

const nextRound = () => {
  if (props.selected < props.totalCount - 1) {
    emit('update:selected', props.selected + 1)
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 8px;

  .selected {
    background-color: #6d6767;
    color: white;
    font-weight: bold;
  }
}
</style>
