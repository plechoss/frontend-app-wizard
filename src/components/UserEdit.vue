<template>
  <v-container class="pt-8">
    <v-row>
      <v-col>
        <span class="text-h4"> {{ pageTitle }} </span>
      </v-col>
    </v-row>
    <v-row>
      <!-- Input -->
      <v-col cols="12" md="8" lg="8" xl="8">
        <v-card class="fill-height d-flex flex-column" :height="cardHeight">
          <v-card-text class="fill-height">
            <v-row class="fill-height">
              <v-col cols="12" md="6" lg="6" xl="6" align-self="center">
                <v-row>
                  <v-col cols="12" class="pb-0 mb-0">
                    <span class="font-weight-bold black--text" text-caption>
                      First Name
                    </span>
                  </v-col>
                  <v-col cols="12" class="pt-0 mt-0">
                    <v-text-field
                      v-model="firstNameInput"
                      hide-details
                      outlined
                      solo
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" lg="6" xl="6" align-self="center">
                <v-row>
                  <v-col cols="12" class="pb-0 mb-0">
                    <span class="font-weight-bold black--text" text-caption>
                      Last Name
                    </span>
                  </v-col>
                  <v-col cols="12" class="pt-0 mt-0">
                    <v-text-field
                      v-model="lastNameInput"
                      hide-details
                      outlined
                      solo
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row class="pa-2">
              <v-col cols="2">
                <v-btn
                  @click="onSubmit"
                  color="custom-green"
                  dark
                >
                  {{ saveBtnText }}
                </v-btn>
              </v-col>
              <v-col cols="10">
                <v-btn @click="onCancel" text> Cancel </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Photo -->
      <v-col cols="12" md="4" lg="4" xl="4">
        <v-card class="fill-height d-flex flex-column" :height="cardHeight">
          <v-card-text class="fill-height pb-0">
            <v-row class="text-center fill-height">
              <v-col cols="12" align-self="center">
                <v-avatar :size="avatarSize">
                  <v-img :src="imgDisplaySrc"></v-img>
                </v-avatar>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row class="pa-2">
              <v-col cols="12">
                <v-dialog v-model="dialog" :max-width="modalWidth" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      block
                      color="#757575"
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon left> mdi-camera </v-icon> Change Photo
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5">
                      Enter the new image URL
                    </v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="inputNewImgSrc"
                        hide-details
                        outlined
                        solo
                      >
                      </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="onImgUrlCancel" color="grey darken-1" text>
                        Cancel
                      </v-btn>
                      <v-btn
                        @click="onImgUrlSave"
                        color="green darken-1"
                        :disabled="!inputNewImgSrc"
                        text
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiConnector from "../apiConnector";
import _ from "lodash";

export default {
  name: "UserEdit",

  props: {
    userData: {
      default: () => ({}),
      type: Object,
    },
  },

  data: () => ({
    avatarSize: "140",
    cardHeight: "300px",
    dialog: false,
    firstNameInput: "",
    imgCurrentSrcInput: "",
    imgDefaultSrc: require("../assets/default_avatar.png"),
    inputNewImgSrc: "",
    lastNameInput: "",
    modalWidth: 500,
  }),

  computed: {
    imgDisplaySrc() {
      return this.imgCurrentSrcInput || this.imgDefaultSrc;
    },

    isEdit() {
      return !_.isEmpty(this.userData);
    },

    saveBtnText() {
      return this.isEdit ? "Update Details" : "Add User";
    },

    pageTitle() {
      return this.isEdit ? "Edit User" : "Add User";
    },

    requiredValid() {
      return !!this.lastNameInput && !!this.firstNameInput;
    },
  },

  mounted() {
    this.imgCurrentSrcInput = _.get(this.userData, "avatar", "");
    this.firstNameInput = _.get(this.userData, "first_name", "");
    this.lastNameInput = _.get(this.userData, "last_name", "");
  },

  methods: {
    onImgUrlSave() {
      this.imgCurrentSrcInput = this.inputNewImgSrc;
      this.dialog = false;
    },

    onImgUrlCancel() {
      this.dialog = false;
    },
    onCancel() {
      this.$emit("action-complete", { message: null, successful: false });
    },
    async onSubmit() {
      let user = {
        avatar: this.imgCurrentSrcInput,
        first_name: this.firstNameInput,
        last_name: this.lastNameInput,
      };

      let res;
      let message;
      let successful = false;

      if (this.isEdit) {
        res = await apiConnector.editUser(user.id, user);
        if (res.status == 200) {
          message = "Edit successful";
          successful = true;
        } else {
          message = "Edit failed";
        }
      } else {
        res = await apiConnector.addUser(user);
        if (res.status == 201) {
          message = "Adding successful";
          successful = true;
        } else {
          message = "Adding failed";
        }
      }
      this.$emit("action-complete", { message, successful });
    },
  },
};
</script>

<style scoped>
.v-btn {
  text-transform: unset !important;
}
</style>
