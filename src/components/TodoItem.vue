<template>
  <div class="todo-item" :class="{ completed: completed }">
    <div class="todo-check">
      <input
        type="checkbox"
        class="checkbox"
        :id="`checkbox-${todo.id}`"
        v-model="completed"
        @change="editCheck"
      />
      <label class="checkspan" :for="`checkbox-${todo.id}`"></label>
    </div>

    <input
      type="text"
      class="todo-text"
      :class="{ editing: editing }"
      :readonly="!editing"
      v-model="text"
      @blur="editText"
      @keyup.enter="
        (e) => {
          e.target.blur();
        }
      "
      @keyup.esc="cancelEdit"
    />

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
      for (const [index, el] of this.$store.state.todos.entries()) {
        if (el.id === this.todo.id) {
          this.$store.commit("removeTodo", index);
          break;
        }
      }
    },

    editTodo(event) {
      this.preEdit = this.text;
      this.editing = true;
      event.srcElement.parentElement.previousSibling.focus();
    },

    editText() {
      this.editing = false;

      if (this.text.trim() == this.preEdit || this.text.trim().length == 0) {
        this.text = this.preEdit;
      } else {
        for (const [index, el] of this.$store.state.todos.entries()) {
          if (el.id == this.todo.id) {
            this.$store.commit('editText', {
              index,
              text: this.text,
            });
            break;
          }
        }
      }
    },

    editCheck() {
      for (const [index, el] of this.$store.state.todos.entries()) {
        if (el.id == this.todo.id) {
          this.$store.commit('editCheck', {
            index,
            completed: this.completed,
          });
          break;
        }
      }
    },

    cancelEdit() {
      this.text = this.preEdit;
      this.editing = false;
    },
  },

  watch: {
    allDone(v) {
      this.completed = v ? true : this.todo.completed;
    },
  },
};
</script>
