<template>
  <div class="index">
    <v-toolbar
      color="teal"
      dark
    >
      <v-toolbar-title>Tables</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list>
      <v-list-group
        v-for="item in files"
        :key="item.name"
        v-model="item.active"
        prepend-icon="mdi-table"
        no-action
        @change="onFileChnage(item)"
      >
        <template #activator>
          <v-list-item-content>
            <v-list-item-title class="table-name" v-text="tableName(item.name)"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.children"
          :key="child.name"
          dense
        >
          <v-list-item-icon>
            <v-icon>mdi-table-column</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="table-column-name" v-text="child.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import {ref, computed} from '@nuxtjs/composition-api'
import {useDocuments} from "~/composable/useDocuments";

export default {
  name: 'SqlTables',
  setup(_, {emit}) {
    const file = ref([])

    const {files} = useDocuments();

    const onFileChnage = (value) => {
      emit('input', value)
    }

    const tableName = computed(() => {
      return (name) => name.replace(/\.[^/.]+$/, "")
    })


    return {file, tableName, files, onFileChnage}

  }
};
</script>

<style lang="scss" scoped>

.table {
  &-name {
    font-weight: bold;
    text-transform: capitalize;
  }

  &-column-name {
    font-weight: 500;
  }
}


</style>
