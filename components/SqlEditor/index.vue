<template>
  <div class="pa-5">
    <div class="d-flex pb-5">
      <label class="text-h5">
        Query Statment
      </label>
      <v-btn color="primary" class="ml-auto" @click="onRunTable">
        Run
      </v-btn>
    </div>
    <v-textarea
      id="textInput"
      ref="textInput"
      v-model="text"
      filled
      rows="10"
      name="input-7-4"
      label="Please enter @ to select table"
      hint="Type @ to select table name and choose by [column1, colums2]"
      @keydown="onkeydown"
    ></v-textarea>


    <v-menu id="textInputMenu" v-model="openMenu" offset-y :position-x="rect.left" :position-y="rect.top">
      <v-list>
        <v-subheader>Tables</v-subheader>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(item, index) in files"
            :key="index"
            @click="onTableClicked(item)"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>


      </v-list>
    </v-menu>
  </div>
</template>

<script>
import getCaretPosition from 'textarea-caret'
import {useDocuments} from "~/composable/useDocuments";

export default {
  name: 'SqlEditor',
  setup() {
    const {files} = useDocuments();
    return {files}
  },

  data() {
    return {
      text: '',
      openMenu: false,
      rect: {top: 0, left: 0},
      selectedTable: ''
    }
  },
  watch: {
    text() {
      this.openMenu = this.text.endsWith('@')
    },
    openMenu() {
      this.focusControl()
    }
  },

  methods: {

    onRunTable() {
      if (this.text.match(/\[([^)]+)\]/)) {
        const columnsText = this.text.match(/\[([^)]+)\]/)[0];
        const columns = columnsText.replace("[", "").replace("]", "").split(",")
        this.$emit('input', {...this.selectedTable, columns: columns.map(x=>x.trim()) })
      } else {
        this.$emit('input', this.selectedTable)
      }

    },

    onTableClicked(value) {
      this.selectedTable = value
      this.text = this.text.slice(0, -1) + this.selectedTable.name

    },

    focusControl() {
      const textInput = document.getElementById('textInput')
      const textInputMenu = document.getElementById('textInputMenu')
      if (this.openMenu) {
        textInput.focus()
      } else {
        textInputMenu.focus()
      }
    },
    onkeydown() {
      const textInput = document.getElementById('textInput')
      const cartPosition = getCaretPosition(textInput, this.text.length - 1)

      const textOffeset = this.getOffset(textInput)

      this.rect = {
        top: cartPosition.top + textOffeset.top + 20,
        left: cartPosition.left + textOffeset.left
      }


    },

    getOffset(el) {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      };
    }
  },
};
</script>
