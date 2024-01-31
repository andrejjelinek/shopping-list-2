<template>
  <template v-if="!shoppingLists">
    <v-progress-linear indeterminate color="cyan" />
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

<script lang="js">
import axios from "axios"
import ShoppingListCard from "./_components/a-shopping-list-card.vue"

export default {
  components: {
    ShoppingListCard,
  },
  data() {
    return {
      shoppingLists: null,
    }
  },

  async mounted() {
    try {
      const { data: { data: shoppingLists } } = await axios.get(`${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists`)

      this.shoppingLists = shoppingLists
    } catch (error) {
      console.error('Error:', error)
      this.shoppingLists = { error }
    }
  },
}
</script>
