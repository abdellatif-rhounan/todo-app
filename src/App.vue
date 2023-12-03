<template>
  <section class="greeting">
    <h2 class="heading">
      What's up,
      <input type="text" class="myname" placeholder="My Name" v-model="myName" maxlength="20" />
    </h2>
  </section>

  <section class="newtodo">
    <form class="todo-form" @submit.prevent="addTodo">
      <input type="text" class="todo-input" placeholder="Add Something" v-model="newTodo" />

      <button type="submit" class="todo-submit">
        <i class="bx bx-plus"></i>
      </button>
    </form>
  </section>

  <section class="todo-list">
    <h2 class="heading">Todo List</h2>

    <div class="todos-footer">
      <div class="footer-item">
        <div class="checkall">
          <input type="checkbox" class="checkbox" id="checkAll" :checked="noRemaining" @change="checkAll" />
          <label class="label" for="checkAll">Check All</label>
        </div>

        <div class="remaining">{{ remaining }} items left</div>
      </div>

      <div class="footer-item">
        <div class="filters">
          <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
          <button :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
          <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
        </div>

        <button class="clear-completed" v-show="showClearCompleted" @click="clearCompleted">
          Clear Completed
        </button>
      </div>
    </div>

    <div v-if="anyTodos" class="content">
      <div class="todo-item" v-for="todo in todos_asc" :key="todo.createdAt" :class="{ completed: todo.completed }">

        <div class="todo-check">
          <input type="checkbox" class="checkbox" :id="`checkbox-${todo.createdAt}`" v-model="todo.completed" />
          <label class="checkspan" :for="`checkbox-${todo.createdAt}`"></label>
        </div>

        <input type="text" class="todo-text" :class="{ editing: todo.editing }" :readonly="!todo.editing"
          v-model="todo.text" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" />

        <div class="actions">
          <i class="bx bxs-edit-alt edit-item" v-show="!todo.editing" @click.left="editTodo($event, todo)">
          </i>

          <i class="bx bxs-save save-item" v-show="todo.editing"></i>

          <i class="bx bxs-trash-alt remove-item" @click.left="removeTodo(todo)"></i>
        </div>

      </div>
    </div>
    <div v-else class="no-task">No Task!</div>
  </section>

  <footer class="footer">
    Copyright &copy; {{ new Date().getFullYear() }} |
    <span>&nbsp;Abdellatif RHOUNAN</span>
  </footer>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      myName: "",
      newTodo: "",
      todos: [],
      beforeEdit: "",
      filter: "all",
    };
  },

  computed: {
    todos_asc() {
      return [...this.todos_filterd].sort((a, b) => a.createdAt - b.createdAt);
    },

    todos_filterd() {
      if (this.filter == 'all') {
        return this.todos;
      }
      else if (this.filter == 'active') {
        return this.todos.filter(e => !e.completed);
      }
      else if (this.filter == 'completed') {
        return this.todos.filter(e => e.completed);
      }
    },

    remaining() {
      return this.todos.filter(e => !e.completed).length;
    },

    noRemaining() {
      return (this.remaining == 0);
    },

    showClearCompleted() {
      return (this.todos.filter(e => e.completed).length > 0);
    },

    anyTodos() {
      return (this.todos_asc.length > 0);
    },
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }

      this.todos.push({
        text: this.newTodo.trim(),
        completed: false,
        editing: false,
        createdAt: new Date().getTime(),
      });
      this.newTodo = "";
    },

    removeTodo(todo) {
      this.todos = this.todos.filter((e) => e !== todo);
    },

    editTodo(event, todo) {
      this.beforeEdit = todo.text;
      todo.editing = true;
      event.srcElement.parentElement.previousSibling.focus();
    },

    doneEdit(todo) {
      if (todo.text.trim().length == 0) {
        todo.text = this.beforeEdit;
      }
      todo.editing = false;
    },

    cancelEdit(todo) {
      todo.text = this.beforeEdit;
      todo.editing = false;
    },

    checkAll(event) {
      this.todos.forEach((e) => {
        e.completed = event.target.checked;
      });
    },

    clearCompleted() {
      this.todos = this.todos.filter(e => !e.completed);
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
  },

  mounted() {
    this.myName = localStorage.getItem("myName") || "";
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  },
};
</script>
