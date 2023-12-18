<template>
  <button
    class="clear-completed"
    v-if="showClearCompleted"
    @click="clearCompleted"
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
    clearCompleted() {
      const result = this.$store.state.todos.filter((e) => !e.completed);
      this.$store.commit("clearCompleted", result);
    },
  },
};
</script>
