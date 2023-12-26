<template>
  <button
    class="clear-completed"
    v-if="showClear"
    @click="clearCompleted"
  >
    Clear Completed
  </button>
</template>

<script>
export default {
  name: "ClearCompleted",

  computed: {
    showClear() {
      return this.$store.getters.showClear;
    },
  },

  methods: {
    clearCompleted() {
      this.$store.dispatch("clearCompleted");
    },
  },
};
</script>
