<template>
  <template v-if="shoppingLists === null">
    <v-progress-linear indeterminate color="success" />
  </template>

  <template v-else-if="shoppingLists.error"> Pri načítaní dát nastala chyba: {{ shoppingLists.error }} </template>

  <template v-else>
    <div class="flex mt-8">
      <A-shopping-lists-menu @createNewList="handleCreateShoppingList" @deleteList="handleDeleteShoppingList" :shoppingLists="shoppingLists" />
      <div class="flex flex-col gap-3 w-2/3 mx-auto">
        <A-shopping-list-card v-for="item in shoppingLists" :shoppingList="item" :key="item.id" />
      </div>
    </div>
  </template>
</template>

<script>
import axios from 'axios'
import AShoppingListCard from './_components/a-shopping-list-card.vue'
import AShoppingListsMenu from './_components/a-shopping-lists-menu.vue'

export default {
  components: {
    AShoppingListCard,
    AShoppingListsMenu,
  },

  data() {
    return {
      shoppingLists: null,
    }
  },

  async mounted() {
    this.loadData()
  },

  methods: {
    /**
     * Load shopping lists with items
     */
    async loadData() {
      try {
        const {
          data: { data: shoppingLists },
        } = await axios.get(`${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists`)

        this.shoppingLists = shoppingLists
      } catch (error) {
        console.error('Error:', error)
        this.shoppingList = { error }
        alert(error)
      }
    },

    /**
     * Send POST request for creating a new shopping list
     */
    async handleCreateShoppingList(newListName) {
      try {
        if (newListName.trim() == '') return alert('List name cannot be empty')

        const {
          data: { data: newList },
        } = await axios.post(`${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists`, {
          items: [],
          title: newListName,
        })
        this.shoppingLists.push(newList)
      } catch (error) {
        console.error('Error:', error)
        alert(error)
      }
    },

    /**
     * Send DELETE request for deleting shopping list
     */
    async handleDeleteShoppingList(listId) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${listId}`)
        this.shoppingLists = this.shoppingLists.filter((item) => item.id != listId)
      } catch (error) {
        console.error('Error:', error)
        alert(error)
      }
    },
  },
}
</script>
