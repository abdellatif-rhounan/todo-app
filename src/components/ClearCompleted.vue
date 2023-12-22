<template>
  <button
    class="clear-completed"
    v-if="showClearCompleted"
    @click="clearCompletedTodos"
  >
    Clear Completed
  </button>
</template>

<script>
export default {
  name: "ClearCompleted",

  computed: {
    showClearCompleted() {
      return this.$store.getters.showClearCompleted;
    },
  },

  methods: {
    clearCompletedTodos() {
      const result = this.$store.state.todos.filter((el) => !el.completed);
      this.$store.commit("clearCompletedTodos", result);
    },
  },
};
</script>
