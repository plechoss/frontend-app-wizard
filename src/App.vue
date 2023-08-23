<template>
  <v-app>
    <v-main>
      <user-list
        v-if="isList"
        @add-user="onAddUser"
        @edit-user="onEditUser"
      ></user-list>
      <user-edit
        v-else
        :user-data="userData"
        @action-complete="onActionComplete"
      ></user-edit>
    </v-main>
  </v-app>
</template>

<script>
import UserEdit from "./components/UserEdit.vue";
import UserList from "./components/UserList.vue";

export default {
  name: "App",

  components: {
    UserEdit,
    UserList,
  },

  data: () => ({
    isList: true,
    userData: {},
  }),

  methods: {
    onActionComplete(payload) {
      console.log({ payload });
      this.isList = true;
    },
    onAddUser() {
      this.userData = null;
      this.isList = false;
    },
    onEditUser(item) {
      this.userData = { ...item };
      console.log({item})
      this.isList = false;
    },
  },
};
</script>

<style>
#app {
  background-color: #f5f7f9;
}
</style>