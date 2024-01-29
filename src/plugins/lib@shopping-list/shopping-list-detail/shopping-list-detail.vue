<template>
  <template v-if="!shoppingList">
    <v-progress-linear indeterminate color="cyan"></v-progress-linear>
  </template>

  <div class="bg-dark w-1/2 mx-auto p-10 rounded-lg flex flex-col">
    <div class="flex justify-center gap-2">
      <p class="text-2xl font-bold">{{ shoppingList?.title }}</p>

      <button
        class="hover:bg-rose-50 rounded-lg p-1 ease-in duration-200 active"
        @click="handleDeleteShoppingList()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="#f24a44"
          viewBox="0 0 256 256"
        >
          <path
            d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"
          ></path>
        </svg>
      </button>
    </div>
    <hr class="mt-3" />
    <ul class="w-3/4 mx-auto">
      <li
        class="flex justify-between my-5 bg-dark-light p-2 rounded-lg"
        v-for="item in shoppingList?.items"
        :key="item.id"
      >
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
              <span class="bg-main rounded-md ml-3 px-2 py-1">{{
                `${item.value} ${item.unit} `
              }}</span></label
            >
          </div>

          <button
            class="hover:bg-rose-50 rounded-lg p-1 ease-in duration-200 active"
            @click="handleDeleteItem(item)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="#f24a44"
              viewBox="0 0 256 256"
            >
              <path
                d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"
              ></path>
            </svg>
          </button>
        </div>
      </li>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="#41b883"
        viewBox="0 0 256 256"
      >
        <path
          d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"
        ></path>
      </svg>
      Back
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      shoppingList: null,
      newItemName: "",
    };
  },

  async mounted() {
    this.loadData();
  },

  methods: {
    handleNavigateBack() {
      this.$router.go(-1);
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
        );
        this.shoppingList = shoppingLists.find(
          ({ id }) => id == this.$route.params.id
        );
      } catch (error) {
        console.error("Error:", error);
        this.shoppingList = { error };
      }
    },

    /**
     * Send PUT request for updating is_checked property
     */
    async handleCheckItem({ id: itemId, is_checked: isChecked }) {
      try {
        const { status, statusText } = await axios.put(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${
            this.$route.params.id
          }/items/${itemId}`,
          {
            id: itemId,
            is_checked: isChecked,
          }
        );

        if (status == 200) {
          this.loadData();
        } else {
          alert(statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    /**
     * Send POST request for creating a new item
     */
    async handleCreateItem() {
      if (this.newItemName.trim() == "") {
        alert("Item name cannot be empty");
        return;
      }

      try {
        const { status, statusText } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${
            this.$route.params.id
          }/items`,
          {
            is_checked: false,
            name: this.newItemName.trim(),
            unit: "piece",
            value: 1,
          }
        );

        if (status == 201) {
          this.newItemName = "";
          this.loadData();
        } else {
          alert(statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    /**
     * Send DELETE request for dele
     */
    async handleDeleteItem({ id: itemId }) {
      try {
        const { status, statusText } = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${
            this.$route.params.id
          }/items/${itemId}`
        );

        if (status == 200) {
          this.loadData();
        } else {
          alert(statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    /**
     * Send DELETE request for deleting shopping list
     */
    async handleDeleteShoppingList() {
      try {
        const { status, statusText } = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}api/v1/shopping-lists/${
            this.$route.params.id
          }`
        );

        if (status == 200) {
          this.handleNavigateBack();
        } else {
          alert(statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>
