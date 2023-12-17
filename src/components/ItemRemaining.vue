<template>
  <div class="remaining">
    {{ remaining }} item{{ remaining > 1 ? 's' : '' }} left
  </div>
</template>

<script>
export default {
  name: "ItemRemaining",

  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
  },
};
</script>
