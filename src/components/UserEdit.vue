<template>
  <v-container class="pt-8">
    <v-row>
      <v-col>
        <span class="text-h4"> Add User </span>
      </v-col>
      <v-col>
        <v-btn to="/list" icon>
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
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
                    <span text-caption class="font-weight-bold black--text">
                      First Name
                    </span>
                  </v-col>
                  <v-col cols="12" class="pt-0 mt-0">
                    <v-text-field
                      v-model="firstNameInput"
                      outlined
                      solo
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" lg="6" xl="6" align-self="center">
                <v-row>
                  <v-col cols="12" class="pb-0 mb-0">
                    <span text-caption class="font-weight-bold black--text">
                      Last Name
                    </span>
                  </v-col>
                  <v-col cols="12" class="pt-0 mt-0">
                    <v-text-field
                      v-model="lastNameInput"
                      outlined
                      solo
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row class="pa-2">
              <v-col cols="12">
                <v-btn color="#1e9067" dark> Update Details </v-btn>
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
                  <v-img :src="imgSrc"></v-img>
                </v-avatar>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row class="pa-2">
              <v-col cols="12">
                <v-btn block color="#757575" outlined>
                  <v-icon left> mdi-camera </v-icon> Change Photo
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserEdit",

  data: () => ({
    avatarSize: "140",
    cardHeight: "300px",
    firstNameInput: "",
    imgSrcDefault: require("../assets/default_avatar.png"),
    imgSrcInput: "",
    lastNameInput: "",
  }),

  computed: {
    imgSrc() {
      return this.imgSrcInput || this.imgSrcDefault;
    },
  },
};
</script>

<style scoped>
.v-btn {
  text-transform: unset !important;
}
</style>
