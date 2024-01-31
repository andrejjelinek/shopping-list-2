<template>
  <template v-if="!shoppingLists">
    <v-progress-linear indeterminate color="success" />
  </template>

  <template v-else-if="shoppingLists.error">
    Pri načítaní dát nastala chyba: {{ shoppingLists.error }}
  </template>

  <template v-else>
    <div class="flex mt-8">
      <a-shopping-lists-menu
        :shoppingLists="shoppingLists"
        @reload-data="loadData"
      />
      <div class="flex flex-col gap-3 w-2/3 mx-auto">
        <a-shopping-list-card
          v-for="item in shoppingLists"
          :key="item.id"
          :shoppingList="item"
        />
      </div>
    </div>
  </template>
</template>

<script lang="js">
import axios from "axios"
import aShoppingListCard from "./_components/a-shopping-list-card.vue"
import aShoppingListsMenu from "./_components/a-shopping-lists-menu.vue"

export default {
  components: {
    aShoppingListCard,
    aShoppingListsMenu,

  },
  data() {
    return {
      shoppingLists: null,
    }
  },

  async mounted() { this.loadData() },

  methods:{
     /**
     * Load shopping lists with items
     */
     async loadData() {
      try {
        const { data: { data: shoppingLists } } = await axios.get(`${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists`)

        this.shoppingLists = shoppingLists
      } catch (error) {
        console.error('Error:', error)
        this.shoppingList = { error }
      }
    },
  }
}
</script>
