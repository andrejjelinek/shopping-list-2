<template>
  <li class="flex justify-between my-5 bg-dark-light p-2 rounded-lg">
    <div class="flex justify-between ps-3 w-full">
      <div class="flex items-center">
        <input
          :id="`vue-checkbox-${item.id}`"
          type="checkbox"
          v-model="item.is_checked"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          @change="handleCheckItem(item)"
        />
        <label
          :for="`vue-checkbox-${item.id}`"
          class="w-full py-3 ms-2 text-base text-white cursor-pointer"
        >
          <span>{{ item.name }}</span>
          <span class="bg-main rounded-md ml-3 px-2 py-1">
            {{ item.value }} {{ item.unit }}
          </span></label
        >
      </div>

      <button
        class="hover:bg-rose-50 rounded-lg p-1 ease-in duration-200 active"
        @click="handleDeleteItem(item)"
      >
        <img src="../../../app/_assets/deleteIcon.svg" alt="Delete icon" />
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  emits: ['deleteItem', 'checkItem'],

  methods: {
    /**
     * Call delete method from parent
     * @param {*} param0
     */
    handleDeleteItem({ id: itemId }) {
      this.$emit('deleteItem', itemId)
    },

    /**
     * Call check item method from parent
     * @param {*} param0
     */
    handleCheckItem({ id: itemId, is_checked: isChecked }) {
      this.$emit('checkItem', { id: itemId, is_checked: isChecked })
    },
  },
}
</script>
