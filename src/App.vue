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
      <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn
            :color="snackbarIsSuccessful ? 'green' : 'red'"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
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
    snackbar: false,
    snackbarIsSuccessful: false,
    snackbarText: "",
    snackbarTimeout: 2000,
    userData: {},
  }),

  methods: {
    onActionComplete(payload) {
      if (payload.message) {
        this.snackbarIsSuccessful = payload.successful;
        this.snackbarText = payload.message;
        this.snackbar = true;
      }
      this.isList = true;
    },

    onAddUser() {
      this.userData = null;
      this.isList = false;
    },

    onEditUser(item) {
      this.userData = { ...item };
      this.isList = false;
    },
  },
};
</script>

<style>
#app {
  background-color: var(--v-custom-background-base);
}
</style>