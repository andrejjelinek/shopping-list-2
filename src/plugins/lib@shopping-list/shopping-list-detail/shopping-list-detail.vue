<template>
  <template v-if="!shoppingList">
    <v-progress-linear indeterminate color="success" />
  </template>

  <div class="bg-dark w-1/2 mx-auto p-10 rounded-lg flex flex-col mt-8">
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
      <A-shopping-list-detail-item
        v-for="item in shoppingList?.items"
        :key="item.id"
        :item="item"
        @deleteItem="handleDeleteItem"
        @checkItem="handleCheckItem"
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

<script>
import axios from 'axios'
import AShoppingListDetailItem from './_components/a-shopping-list-detail-item.vue'

export default {
  components: {
    AShoppingListDetailItem,
  },

  data() {
    return {
      shoppingList: null,
      newItemName: '',
    }
  },

  async mounted() {
    this.loadData()
  },

  methods: {
    handleNavigateBack() {
      this.$router.go(-1)
    },

    /**
     * Load shopping lists with items
     */
    async loadData() {
      try {
        const {
          data: { data: shoppingLists },
        } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists`
        )

        this.shoppingList = shoppingLists.find(
          ({ id }) => id == this.$route.params.id
        )
      } catch (error) {
        console.error('Error:', error)
        alert(error)
        this.shoppingList = { error }
      }
    },

    /**
     * Send PUT request for updating is_checked property
     */
    async handleCheckItem(item) {
      try {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${
            this.$route.params.id
          }/items/${item.id}`,
          item
        )

        this.loadData()
      } catch (error) {
        console.error('Error:', error)
        alert(error)
      }
    },

    /**
     * Send POST request for creating a new item
     */
    async handleCreateItem() {
      try {
        if (this.newItemName.trim() == '')
          return alert('Item name cannot be empty')

        await axios.post(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${
            this.$route.params.id
          }/items`,
          {
            is_checked: false,
            name: this.newItemName.trim(),
            unit: 'piece',
            value: 1,
          }
        )

        this.newItemName = ''
        this.loadData()
      } catch (error) {
        console.error('Error:', error)
        alert(error)
      }
    },

    /**
     * Send DELETE request for dele
     */
    async handleDeleteItem(itemId) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${
            this.$route.params.id
          }/items/${itemId}`
        )

        this.loadData()
      } catch (error) {
        console.error('Error:', error)
        alert(error)
      }
    },

    /**
     * Send DELETE request for deleting shopping list
     */
    async handleDeleteShoppingList() {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${
            this.$route.params.id
          }`
        )

        this.handleNavigateBack()
      } catch (error) {
        console.error('Error:', error)
        alert(error)
      }
    },
  },
}
</script>
