<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.key">{{ header.text }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="item.id">
        <td v-for="header in headers">{{ item[header.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  },
  headers: {
    type: Array,
    required: true
  }
});
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  font-family: 'Inter', sans-serif;

  thead {
    background-color: #f9fafb;

    th {
      padding: 12px 16px;
      text-align: left;
      font-weight: $font-weight-semi-bold;
      color: $title-color;
      background-color: #f3f4f6;
      border-bottom: 2px solid #e5e7eb;
    }
  }

  tbody {
    tr {
      background-color: white;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: scale(1.01);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      td {
        padding: 12px 16px;
        font-size: 14px;
        color: #4b5563;
        border-top: 1px solid #f3f4f6;

        &:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        &:last-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }
  }
}
</style>
