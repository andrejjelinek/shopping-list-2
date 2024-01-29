<template>
  <template v-if="!shoppingLists">
    <v-progress-linear indeterminate color="cyan"></v-progress-linear>
  </template>

  <template v-else-if="shoppingLists.error">
    Pri načítaní dát nastala chyba: {{ shoppingLists.error }}
  </template>

  <template v-else>
    <div class="flex flex-col gap-3 w-2/3 mx-auto">
      <shopping-list-card
        v-for="item in shoppingLists"
        :key="item.id"
        :shoppingList="item"
      />
    </div>
  </template>
</template>

<script>
import axios from "axios";
import ShoppingListCard from "./shopping-list-card.vue";

export default {
  components: {
    ShoppingListCard,
  },
  data() {
    return {
      shoppingLists: null,
    };
  },

  async mounted() {
    try {
      // const response = await axios.get('https://shoppinglist.wezeo.dev/shoppinglist/lists')
      // const data = response.data.data

     const {
        data: { data: shoppingLists },
      } = await axios.get(
        "https://shoppinglist.wezeo.dev/cms/api/v1/shopping-lists"
      );

      this.shoppingLists = shoppingLists;
      console.log(shoppingLists);
    } catch (error) {
      console.error("Error:", error);
      this.shoppingLists = { error };
    }
  },
};
</script>
