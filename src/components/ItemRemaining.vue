<template>
  <div class="remaining">
    {{ remainingTodos }} item{{ remainingTodos > 1 ? 's' : '' }} left
  </div>
</template>

<script>
export default {
  name: "ItemRemaining",

  computed: {
    remainingTodos() {
      return this.$store.getters.remainingTodos;
    },
  },
};
</script>
