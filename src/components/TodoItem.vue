<template>
  <div class="todo-item" :class="{ completed: completed }">

    <!-- TodoItem Checkbox Btn -->
    <div class="todo-check">
      <input
        type="checkbox"
        class="checkbox"
        :id="`checkbox-${todo.id}`"
        v-model="completed"
        @change="updateTodo"
      />
      <label class="checkspan" :for="`checkbox-${todo.id}`"></label>
    </div>
    <!-- End TodoItem Checkbox Btn -->

    <!-- TodoItem Text -->
    <input
      type="text"
      class="todo-text"
      :class="{ editing: editing }"
      :readonly="!editing"
      v-model="text"
      @blur="updateTodo"
      @keyup.enter="loseFocus"
      @keyup.esc="cancelEdit"
    />
    <!-- End TodoItem Text -->

    <!-- TodoItem Acions -->
    <div class="actions">
      <i v-if="!editing" class="bx bxs-edit-alt edit-item" @click="editTodo">
      </i>
      <i v-else class="bx bxs-save save-item"></i>

      <i class="bx bxs-trash-alt remove-item" @click="removeTodo"></i>
    </div>
    <!-- End TodoItem Acions -->

  </div>
</template>

<script>
export default {
  name: "TodoItem",

  props: {
    todo: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      editing: false,
      preEdit: "",
      // For Modifying Props
      text: this.todo.text,
      completed: this.todo.completed,
    };
  },

  computed: {
    allDone() {
      return this.$store.getters.allDone;
    },
  },

  methods: {
    removeTodo() {
      this.$store.dispatch("removeTodo", this.todo.id);
    },

    editTodo(event) {
      this.preEdit = this.text;
      this.editing = true;
      event.target.parentElement.previousElementSibling.focus();
    },

    loseFocus(event) {
      event.target.blur();
    },

    updateTodo(event) {
      if (event.target.type === "text") {
        this.editing = false;

        if (this.text.trim() == this.preEdit || this.text.trim().length == 0) {
          this.text = this.preEdit;
          return;
        }
      }

      this.$store.dispatch('updateTodo', {
        id: this.todo.id,
        text: this.text.trim(),
        completed: this.completed,
      });
    },

    cancelEdit() {
      this.text = this.preEdit;
      this.editing = false;
    },
  },

  watch: {
    allDone(newVal) {
      this.completed = newVal ? true : this.todo.completed;
    },
  },
};
</script>
