<template>
  <div class="w-1/4 bg-dark mx-2 rounded-md">
    <p class="text-center text-2xl text-main mt-5 mb-3">My shopping lists</p>

    <div
      v-for="item in shoppingLists"
      class="flex justify-between px-4 py-3 border-b-2 border-dark-light"
      :key="item.id"
    >
      <a
        class="flex gap-2 w-5/6 text-lg cursor-pointer"
        @click.prevent="openShoppingListDetail(item)"
      >
        <img src="../_assets/shoppingCartIcon.svg" alt="Back icon" />
        <span>{{ item.title }}</span>
      </a>
      <button
        class="hover:bg-rose-50 rounded-lg p-1 ease-in duration-200 active"
        @click="handleDeleteShoppingList(item)"
      >
        <img src="../../../app/_assets/deleteIcon.svg" alt="Delete icon" />
      </button>
    </div>

    <p class="text-main text-2xl text-center mt-10">Create new list</p>
    <div class="mt-3 px-4">
      <v-text-field
        label="New list"
        hide-details="auto"
        color="primary"
        v-model="newListName"
        @keyup.enter="handleCreateShoppingList"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shoppingLists: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  emits: ['createNewList', 'deleteList'],

  data() {
    return {
      newListName: '',
    }
  },

  methods: {
    /**
     * Navigate to selected shopping list
     * @param {*} param0
     */
    openShoppingListDetail({ id }) {
      this.$router.push({ name: 'Shopping List - Detail', params: { id } })
    },

    /**
     * Emit data for creating a new shopping list
     */
    async handleCreateShoppingList() {
      try {
        this.$emit('createNewList', this.newListName)
        this.newListName = ''
      } catch (error) {
        console.error('Error:', error)
        alert(error)
      }
    },

    /**
     * Emit for deleting shopping list
     */
    async handleDeleteShoppingList({ id: listId }) {
      try {
        this.$emit('deleteList', listId)
      } catch (error) {
        console.error('Error:', error)
        alert(error)
      }
    },
  },
}
</script>
