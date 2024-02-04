<template>
  <div class="w-1/4 bg-dark mx-2 rounded-md">
    <p class="text-center text-2xl text-main mt-5 mb-3">My shopping lists</p>

    <div v-for="item in shoppingLists" :key="item.id" class="flex justify-between px-4 py-3 border-b-2 border-dark-light">
      <a @click.prevent="openShoppingListDetail(item)" :href="`/shopping-lists/${item.id}`" class="flex gap-2 w-5/6 text-lg cursor-pointer">
        <img src="../_assets/shoppingCartIcon.svg" alt="Back icon" />
        <span>{{ item.title }}</span>
      </a>
      <button @click="handleDeleteShoppingList(item)" class="hover:bg-rose-50 rounded-lg p-1 ease-in duration-200 active">
        <img src="../../../app/_assets/deleteIcon.svg" alt="Delete icon" />
      </button>
    </div>

    <p class="text-main text-2xl text-center mt-10">Create new list</p>
    <div class="mt-3 px-4">
      <v-text-field v-model="newListName" @keyup.enter="handleCreateShoppingList" label="New list" hide-details="auto" color="primary"></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['createNewList', 'deleteList'],

  props: {
    shoppingLists: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

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
      this.$emit('createNewList', this.newListName)
      this.newListName = ''
    },

    /**
     * Emit for deleting shopping list
     */
    async handleDeleteShoppingList({ id: listId }) {
      this.$emit('deleteList', listId)
    },
  },
}
</script>
