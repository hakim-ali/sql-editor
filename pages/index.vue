<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="3"
      >
        <v-sheet
          rounded="lg"
          class="left-sidebar"
        >

          <SqlTables @input="onChangeTable"/>
          <!--  -->
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        sm="9"
      >
        <v-sheet
          rounded="lg"
          class="content"
        >

          <SqlEditor @input="onChangeTable"/>

          <div>
            <div class="d-flex pa-5 header-output">
              <label class="text-h5 ">
                Output
              </label>
            </div>
            <TableData v-model="tableData" :columns="columns"/>
          </div>


          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ref} from '@nuxtjs/composition-api'
import SqlTables from '@/components/SqlTables/index.vue';
import TableData from '@/components/SqlTables/TableData.vue';
import SqlEditor from '@/components/SqlEditor/index.vue';
import {useDocuments} from "~/composable/useDocuments";

export default {
  name: 'IndexPage',
  components: {
    SqlTables,
    TableData,
    SqlEditor
  },
  setup() {
    const {getFileData} = useDocuments();
    const columns = ref([])


    const onChangeTable = async (item) => {
      tableData.value = await getFileData(item.name)
      columns.value = item.columns ? item.columns : []
    }

    const tableData = ref([])

    return {
      onChangeTable,
      tableData,
      columns
    }
  }
}
</script>

<style lang="scss" scoped>

.left-sidebar,
.content {
  min-height: 268px;
  height: calc(100vh - 100px);
  overflow: auto;
}

.header-output {
  border-bottom: 1px solid #d3dce6;
  background: #f5f8ff;
}

</style>
