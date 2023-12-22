<template>
  <div class="checkall">
    <input type="checkbox" class="checkbox" id="checkAll" :checked="allDone" @change="checkAllTodos" />
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
    checkAllTodos(event) {
      this.$store.commit("checkAllTodos", event.target.checked);
    },
  },
};
</script>
