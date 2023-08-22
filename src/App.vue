<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
    drawer: false,
    navigationLinks: [{ title: "List" }],
  }),
};
</script>

<style> 
#app{
  background-color: #f5f7f9;
}
</style>