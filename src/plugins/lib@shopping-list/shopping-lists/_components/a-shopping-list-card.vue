<template>
  <div class="bg-dark rounded-md px-3 py-5">
    <a @click.prevent="openShoppingListDetail(shoppingList)" :href="`/shopping-lists/${shoppingList.id}`" class="text-main text-2xl mx-10 flex gap-2">
      <img src="../_assets/infoIcon.svg" alt="Info icon" />
      <span>{{ shoppingList.title }}</span>
    </a>
    <ul>
      <li v-for="item in shoppingList.items.slice(0, 3)" :key="item.id" class="mx-10 flex justify-between my-5 bg-dark-light p-2 rounded-lg">
        <span :class="{ 'line-through': item.is_checked }">{{ item.name }}</span>
        <span class="bg-main rounded-md ml-3 px-2 py-1">{{ item.value }} {{ item.unit }}</span>
      </li>
    </ul>

    <p v-if="shoppingList.items.length > 3" class="italic mt-3 text-slate-400 mx-10">And {{ shoppingList.items.length - 3 }} others</p>
  </div>
</template>

<script>
export default {
  props: {
    shoppingList: {
      type: Object,
      required: true,
    },
  },

  methods: {
    openShoppingListDetail({ id }) {
      this.$router.push({ name: 'Shopping List - Detail', params: { id } })
    },
  },
}
</script>
