<template>
  <template v-if="!shoppingList">
    <v-progress-linear indeterminate color="cyan"></v-progress-linear>
  </template>

  <div class="bg-dark w-1/2 mx-auto p-10 rounded-lg flex flex-col">
    <p class="text-2xl">{{ shoppingList?.title }}</p>
    <hr />
    <ul class="w-1/2 mx-auto">
      <li
        class="mx-10 flex justify-between my-5 bg-dark-light p-2 rounded-lg"
        v-for="item in shoppingList?.items"
        :key="item.id"
      >
        <span>{{ item.name }}</span>
        <span class="bg-main rounded-md px-1">{{
          `${item.value} ${item.unit}`
        }}</span>
      </li>
    </ul>

    <v-btn variant="outlined" class="w-1/6 m-auto" @click="handleNavigateBack">
      Back
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      shoppingList: null,
    };
  },

  // async mounted() {
  //   try {
  //     const {
  //       data: { data: shoppingList },
  //     } = await axios.get(`/api/v1/shopping-lists/${this.$route.params.id}`);
  //     this.shoppingList = shoppingList;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     this.shoppingList = { error };
  //   }
  // },

  async mounted() {
    try {
      const {
        data: { data: shoppingLists },
      } = await axios.get("/api/v1/shopping-lists");
      this.shoppingList = shoppingLists.find(
        ({ id }) => id == this.$route.params.id
      );
    } catch (error) {
      console.error("Error:", error);
      this.shoppingList = { error };
    }
  },

  methods: {
    handleNavigateBack() {
      this.$router.go(-1);
    },
  },
};
</script>
