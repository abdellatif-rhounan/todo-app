<template>
  <div class="filters">
    <button
      v-for="item in filters"
      v-text="item.text"
      :class="{ active: myFilter == item.filter }"
      @click="changeFilter(item.filter)"
    ></button>
  </div>
</template>

<script>
export default {
  name: "FilterTodos",

  data() {
    return {
      filters: [
        { text: "All", filter: "all" },
        { text: "Active", filter: "active" },
        { text: "Completed", filter: "completed" },
      ],
    };
  },

  computed: {
    myFilter() {
      return this.$store.state.myFilter;
    },
  },

  methods: {
    changeFilter(newFilter) {
      this.$store.commit("changeFilter", newFilter);
    },
  },
};
</script>
