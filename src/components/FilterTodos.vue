<template>
  <div class="filters">
    <button
      v-for="item in filters"
      :key="item"
      v-text="item"
      :class="{ active: myFilter == item }"
      @click="changeFilter(item)"
    ></button>
  </div>
</template>

<script>
export default {
  name: "FilterTodos",

  data() {
    return {
      filters: ["all", "active", "completed"],
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
