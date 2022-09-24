<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-toolbar-title>SQL Editor</v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
