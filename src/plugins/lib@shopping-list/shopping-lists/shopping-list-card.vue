<template>
  <div class="bg-stone-900 rounded-md px-3 py-5">
    <p class="font-bold text-lg text-blue-400">{{ shoppingList.title }}</p>
    <ul>
      <li
        class="mx-10 flex justify-between my-5 bg-zinc-800 p-2 rounded-lg"
        v-for="item in shoppingList.items.slice(0, 3)"
        :key="item.id"
      >
        <span>{{ item.name }}</span>
        <span class="bg-blue-400 rounded-md px-1">{{
          `${item.value} ${item.unit}`
        }}</span>
      </li>
    </ul>

    <p
      class="italic mt-3 text-slate-400 mx-10"
      v-if="shoppingList.items.length > 3"
    >
      And {{ shoppingList.items.length - 3 }} others
    </p>
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
};
</script>
