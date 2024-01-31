<template>
  <template v-if="!shoppingList">
    <v-progress-linear indeterminate color="cyan" />
  </template>

  <div class="bg-dark w-1/2 mx-auto p-10 rounded-lg flex flex-col">
    <div class="flex justify-center gap-2">
      <p class="text-2xl font-bold">{{ shoppingList?.title }}</p>

      <button
        class="hover:bg-rose-50 rounded-lg p-1 ease-in duration-200 active"
        @click="handleDeleteShoppingList()"
      >
        <img src="../../app/_assets/deleteIcon.svg" alt="Delete icon" />
      </button>
    </div>
    <hr class="mt-3" />
    <ul class="w-3/4 mx-auto">
      <a-shopping-list-detail-item
        v-for="item in shoppingList?.items"
        :key="item.id"
        :item="item"
        @delete-item="handleDeleteItem"
        @check-item="handleCheckItem"
      />
    </ul>

    <div class="w-3/4 m-auto">
      <v-text-field
        label="New item"
        hide-details="auto"
        color="primary"
        v-model="newItemName"
        @keyup.enter="handleCreateItem"
      ></v-text-field>
    </div>

    <v-btn
      variant="outlined"
      color="primary"
      class="w-1/6 mx-auto mt-10"
      @click="handleNavigateBack"
    >
      <img src="./_assets/backIcon.svg" alt="Back icon" />
      Back
    </v-btn>
  </div>
</template>

<script lang="js">
import axios from "axios"
import aShoppingListDetailItem from "./_components/a-shopping-list-detail-item.vue"

export default {

  components: {
    aShoppingListDetailItem,
  },

  data() {
    return {
      shoppingList: null,
      newItemName: '',
    }
  },

  async mounted() { this.loadData() },

  methods: {
    handleNavigateBack() { this.$router.go(-1) },

    /**
     * Load shopping lists with items
     */
    async loadData() {
      try {
        const { data: { data: shoppingLists } } = await axios.get(`${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists`)

        this.shoppingList = shoppingLists.find(
          ({ id }) => id == this.$route.params.id
        )
      } catch (error) {
        console.error('Error:', error)
        this.shoppingList = { error }
      }
    },

    /**
     * Send PUT request for updating is_checked property
     */
    async handleCheckItem(item) {
      try {
        const { status, statusText } = await axios.put(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${this.$route.params.id}/items/${item.id}`,
          item
        )

        if (status == 200) this.loadData()
         else alert(statusText)

      } catch (error) {
        console.error('Error:', error)
      }
    },

    /**
     * Send POST request for creating a new item
     */
    async handleCreateItem() {
      if (this.newItemName.trim() == '') {
        alert('Item name cannot be empty')
        return
      }

      try {
        const { status, statusText } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${this.$route.params.id}/items`,
          {
            is_checked: false,
            name: this.newItemName.trim(),
            unit: 'piece',
            value: 1,
          }
        )

        if (status == 201) {
          this.newItemName = ''
          this.loadData()
        } else alert(statusText)

      } catch (error) {
        console.error('Error:', error)
      }
    },

    /**
     * Send DELETE request for dele
     */
    async handleDeleteItem(itemId) {
      try {
        const { status, statusText } = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${this.$route.params.id}/items/${itemId}`)

        if (status == 200) this.loadData()
        else alert(statusText)

      } catch (error) {
        console.error('Error:', error)
      }
    },

    /**
     * Send DELETE request for deleting shopping list
     */
    async handleDeleteShoppingList() {
      try {
        const { status, statusText } = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${this.$route.params.id}`)

        if (status == 200) this.handleNavigateBack()
        else alert(statusText)

      } catch (error) {
        console.error('Error:', error)
      }
    },
  },
}
</script>
