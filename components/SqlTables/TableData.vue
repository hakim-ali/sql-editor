<template>
  <v-data-table
    class="sql-table"
    disable-sort
    :items="value"
    disable-filtering
    :headers="headers"
    :hide-default-footer="hideFooter"
  >
  </v-data-table>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale
    }),
    headers() {
      if (!this.value.length) return

      const firstValue = this.value[0]

      const headers = []
      Object.keys(firstValue).forEach((itemKey) => {
        if (this.columns.length === 0 || this.columns.includes(itemKey))
          headers.push({
            text: itemKey,
            value: itemKey,
            class: 'table-header',
            cssClass: 'table-cell'
          })
      })

      return headers
    },

    hideFooter() {
      return this.value.length < 10
    }
  }
}
</script>


<style lang="scss" scoped>
.sql-table {
  overflow: auto;
}

::v-deep {
  .table-header {
    background-color: #f5f5f5;
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
