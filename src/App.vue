<template>
  <section class="greeting">
    <h2 class="heading">
      What's up,
      <input
        type="text"
        class="myname"
        placeholder="Your Name"
        maxlength="20"
        v-model="myName"
      />
    </h2>
  </section>

  <section class="newtodo">
    <form class="todo-form" @submit.prevent="addTodo">
      <input
        type="text"
        class="todo-input"
        placeholder="Add Something"
        v-model="newTodo"
      />

      <button type="submit" class="todo-submit">
        <i class="bx bx-plus"></i>
      </button>
    </form>
  </section>

  <section class="todo-list">
    <h2 class="heading">Todo List</h2>

    <div class="todos-control">
      <div class="c-row">
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

        <div class="remaining">
          {{ remaining }} item{{ remaining > 1 ? "s" : "" }} left
        </div>
      </div>

      <div class="c-row">
        <div class="filters">
          <button
            :class="{ active: myfilter == 'all' }"
            @click="myfilter = 'all'"
          >
            All
          </button>
          <button
            :class="{ active: myfilter == 'active' }"
            @click="myfilter = 'active'"
          >
            Active
          </button>
          <button
            :class="{ active: myfilter == 'completed' }"
            @click="myfilter = 'completed'"
          >
            Completed
          </button>
        </div>

        <button
          class="clear-completed"
          v-show="showClearCompleted"
          @click="clearCompleted"
        >
          Clear Completed
        </button>
      </div>
    </div>

    <div v-if="anyTodos" class="content">
      <div
        class="todo-item"
        v-for="todo in filterdTodos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <div class="todo-check">
          <input
            type="checkbox"
            class="checkbox"
            :id="`checkbox-${todo.id}`"
            v-model="todo.completed"
          />
          <label class="checkspan" :for="`checkbox-${todo.id}`"></label>
        </div>

        <input
          type="text"
          class="todo-text"
          :class="{ editing: todo.editing }"
          :readonly="!todo.editing"
          v-model="todo.text"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)"
        />

        <div class="actions">
          <i
            v-if="!todo.editing"
            class="bx bxs-edit-alt edit-item"
            @click="editTodo($event, todo)"
          >
          </i>
          <i v-else class="bx bxs-save save-item"></i>

          <i class="bx bxs-trash-alt remove-item" @click="removeTodo(todo)"></i>
        </div>
      </div>
    </div>
    <div v-else class="no-task">No Task!</div>
  </section>

  <footer class="footer">
    Copyright &copy; {{ yearNow }} |
    <span>&nbsp;Abdellatif RHOUNAN</span>
  </footer>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      myName: null,
      newTodo: "",
      todos: [],
      idForTodo: null,
      preEdit: "",
      myfilter: "all",
    };
  },

  computed: {
    filterdTodos() {
      if (this.myfilter == "all") {
        return this.todos;
      } else if (this.myfilter == "active") {
        return this.todos.filter((e) => !e.completed);
      } else if (this.myfilter == "completed") {
        return this.todos.filter((e) => e.completed);
      }
      return this.todos;
    },

    remaining() {
      return this.todos.filter((e) => !e.completed).length;
    },

    allDone() {
      return this.remaining == 0;
    },

    showClearCompleted() {
      return this.todos.filter((e) => e.completed).length > 0;
    },

    anyTodos() {
      return this.filterdTodos.length > 0;
    },

    yearNow() {
      return new Date().getFullYear();
    },
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }

      this.todos.push({
        id: this.idForTodo,
        text: this.newTodo.trim(),
        completed: false,
        editing: false,
      });

      this.newTodo = "";
      this.idForTodo++;
    },

    removeTodo(todo) {
      this.todos = this.todos.filter((e) => e !== todo);
    },

    editTodo(event, todo) {
      this.preEdit = todo.text;
      todo.editing = true;
      event.srcElement.parentElement.previousSibling.focus();
    },

    doneEdit(todo) {
      if (todo.text.trim().length == 0) {
        todo.text = this.preEdit;
      }
      todo.editing = false;
    },

    cancelEdit(todo) {
      todo.text = this.preEdit;
      todo.editing = false;
    },

    checkAll(event) {
      this.todos.forEach((e) => {
        e.completed = event.target.checked;
      });
    },

    clearCompleted() {
      this.todos = this.todos.filter((e) => !e.completed);
    },
  },

  watch: {
    myName(newVal) {
      localStorage.setItem("myName", newVal);
    },

    todos: {
      handler(newVal) {
        localStorage.setItem("todos", JSON.stringify(newVal));
      },
      deep: true,
    },

    idForTodo(newVal) {
      localStorage.setItem("idForTodo", newVal);
    },
  },

  mounted() {
    this.myName = localStorage.getItem("myName") || "";
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.idForTodo = +localStorage.getItem("idForTodo") || 0;
  },
};
</script>
