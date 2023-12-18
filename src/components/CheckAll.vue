<template>
  <div class="checkall">
    <input
      type="checkbox"
      class="checkbox"
      id="checkAll"
      :checked="allDone"
      @change="checkAll"
    />
    <label class="label" for="checkAll">Check All</label>
  </div>
</template>

<script>
export default {
  name: "CheckAll",

  computed: {
    allDone() {
      return this.$store.getters.allDone;
    },
  },

  methods: {
    checkAll(event) {
      this.$store.commit("checkAll", event.target.checked);
    },
  },
};
</script>
