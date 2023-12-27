<template>
  <div class="todo-item" :class="{ completed: completed }">

    <div class="todo-content">

      <!-- TodoItem Show Layer -->
      <div v-if="!editing" class="show-view">
        <!-- TodoItem Checkbox Btn -->
        <label class="checklabel">
          <input
            type="checkbox"
            class="checkbox"
            v-model="completed"
            @change="updateTodo"
          />
          <span class="checkspan"></span>
          <div class="todo-text" v-text="text"></div>
        </label>
      </div>

      <!-- TodoItem Input -->
      <div v-else class="edit-view">
        <input
          type="text"
          v-model="text"
          v-focus
          @blur="updateTodo"
          @keyup.enter="loseFocus"
          @keyup.esc="cancelEdit"
        />
      </div>

    </div>

    <!-- TodoItem Acions -->
    <div class="actions">
      <i v-if="!editing" class="bx bxs-edit-alt edit-item" @click="editTodo">
      </i>
      <i v-else class="bx bxs-save save-item"></i>

      <i class="bx bxs-trash-alt remove-item" @click="removeTodo"></i>
    </div>

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
      // event.target.parentElement.previousElementSibling.focus();
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

  directives: {
    focus: {
      mounted(el) {
        el.focus();
      },
    },
  },
};
</script>
