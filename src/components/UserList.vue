<template>
  <v-container class="pt-8">
    <v-row>
      <v-col>
        <span class="text-h4"> User list </span>
      </v-col>
      <v-col>
        <v-btn to="/user" icon>
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <!-- Table card -->
      <v-col cols="12">
        <v-card class="fill-height d-flex flex-column">
          <v-card-text class="fill-height">
            <!-- Top row with search and Add User button -->
            <v-row>
              <v-col cols="6" md="4" lg="4" xl="4" align-self="center">
                <v-text-field
                  v-model="search"
                  background-color="#f5f7f9"
                  solo
                  flat
                  dense
                  hide-details
                  placeholder="Search for users..."
                  append-icon="mdi-magnify"
                >
                </v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="text-right">
                <v-btn color="#1e9067" dark rounded @click="onAddItem">
                  <v-icon dark> mdi-plus </v-icon>
                  Add User
                </v-btn>
              </v-col>
            </v-row>
            <!-- Table with the users -->
            <v-row>
              <v-col>
                <v-data-table
                  :items="tableData"
                  :headers="tableHeaders"
                  item-key="id"
                  disable-sort
                  hide-default-footer
                >
                  <!-- Avatar -->
                  <template #[`item.avatar`]="{ item }">
                    <v-avatar size="35">
                      <v-img :src="item.avatar"></v-img>
                    </v-avatar>
                  </template>
                  <!-- Action buttons -->
                  <template #[`item.actions`]="{ item }">
                    <v-icon
                      class="mr-2"
                      color="buttonColor"
                      small
                      @click="onEditItem(item)"
                    >
                      mdi-square-edit-outline
                    </v-icon>
                    <v-icon
                      class="mr-2"
                      color="buttonColor"
                      small
                      @click="onDeleteItem(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Custom page selector -->
    <v-row>
      <v-col>
        <v-btn-toggle
          v-model="selectedPage"
          color="#1e9067"
          class="page-selector-button-group"
        >
          <v-btn
            @click="decreasePage"
            :class="selectedPage == 1 ? 'disabled' : ''"
          >
            <v-icon> mdi-chevron-double-left </v-icon>
          </v-btn>
          <v-btn v-for="index in maxPageNum" :key="index">
            {{ index }}
          </v-btn>
          <v-btn
            @click="increasePage"
            :class="selectedPage == maxPageNum ? 'disabled' : ''"
          >
            <v-icon> mdi-chevron-double-right </v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserList",

  data: () => ({
    buttonColor: "#757575",
    maxPageNum: 10,
    selectedPageHelper: 1,
    tableHeaders: [
      { align: "start", text: "", value: "avatar", width: 100 },
      { align: "start", text: "Full Name", value: "full_name" },
      { align: "start", text: "Action", value: "actions", width: 100 },
    ],
    rawData: [
      {
        first_name: "Michal",
        id: 1,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "Piotr",
        id: 2,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "Pawel",
        id: 3,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "agdsgfs",
        id: 4,
        last_name: "dsghdfs",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "hdfh",
        id: 5,
        last_name: "fdhdfh",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "hfdhdf",
        id: 6,
        last_name: "hhhfdhfd",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "dwqrtewt",
        id: 7,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "Michal",
        id: 8,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "Michal",
        id: 9,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "Michal",
        id: 11,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "Piotr",
        id: 12,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "Pawel",
        id: 13,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "agdsgfs",
        id: 14,
        last_name: "dsghdfs",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "hdfh",
        id: 15,
        last_name: "fdhdfh",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "hfdhdf",
        id: 16,
        last_name: "hhhfdhfd",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "dwqrtewt",
        id: 17,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "Michal",
        id: 18,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
      {
        first_name: "Michal",
        id: 19,
        last_name: "Pleskowicz",
        avatar:
          "https://avatars.githubusercontent.com/u/12537090?s=400&u=c1eb9ae416d9edcee29422e6868b039cb210f40b&v=4",
      },
    ],
    search: "",
  }),

  computed: {
    selectedPage: {
      get() {
        return this.selectedPageHelper;
      },
      set(index) {
        if (index > 0 && index <= this.maxPageNum)
          this.selectedPageHelper = index;
      },
    },
    tableData() {
      let lowercaseSearchTerm = this.search.toLowerCase();
      return this.rawData
        .map((user) => ({
          avatar: user.avatar,
          full_name: `${user.first_name} ${user.last_name}`,
          id: user.id,
        }))
        .filter((user) =>
          user.full_name.toLowerCase().includes(lowercaseSearchTerm)
        );
    },
  },

  methods: {
    decreasePage() {
      if (this.selectedPage > 0) this.selectedPage -= 1;
    },
    increasePage() {
      if (this.selectedPage < this.maxPageNum) this.selectedPage += 1;
    },
    onAddItem() {
      console.log("onAddItem");
    },
    onDeleteItem(item) {
      console.log(item);
    },
    onEditItem(item) {
      console.log(item);
    },
  },
};
</script>

<style scoped>
.v-btn {
  text-transform: unset !important;
}
.v-data-table >>> table tr:nth-child(odd) td {
  background-color: #f5f7f9;
}
.v-data-table >>> table tr:nth-child(even) td {
  background-color: #ffffff;
}

.v-data-table >>> td,
.v-data-table >>> th {
  border: none !important;
}

.page-selector-button-group button {
  background-color: #ffffff !important;
}

.page-selector-button-group >>> span {
  color: #1e9067 !important;
}
.page-selector-button-group >>> .v-btn--active {
  background-color: #1e9067 !important;
}
.page-selector-button-group >>> .v-btn--active > span {
  color: #ffffff !important;
}
.page-selector-button-group .disabled i {
  color: #aaaaaa !important;
}
.page-selector-button-group button.disabled {
  pointer-events: none !important;
}
</style>
