<template>
  <section class="greeting">
    <h2>
      What's up,
      <input
        type="text"
        placeholder="Name here"
        v-model="myName"
        maxlength="20"
      />
    </h2>
  </section>

  <section class="newtodo">
    <form class="newtodo-form" @submit.prevent="addTodo">
      <input type="text" placeholder="Add Something" v-model="newTodoText" />

      <button type="submit" class="submit-newtodo">
        <i class="bx bx-plus"></i>
      </button>
    </form>
  </section>

  <section class="todos-list">
    <h2>Todos List</h2>

    <div class="list-content">
      <div
        v-for="(todo, i) in todos_asc"
        :key="i"
        :class="{
          'todo-item': true,
          done: todo.done,
        }"
      >
        <label>
          <input type="checkbox" class="todo-checkbox" v-model="todo.done" />
          <span class="todo-checkspan"></span>
        </label>

        <input
          type="text"
          :class="{
            'todo-text': true,
            editable: todo.editable,
          }"
          :readonly="!todo.editable"
          v-model="todo.text"
          @blur="blur(todo)"
          @keyup.enter="finishChange"
        />

        <div class="actions">
          <i
            class="bx bxs-edit-alt edit"
            @click.left="editTodo($event, todo)"
            v-show="!todo.editable"
          >
          </i>

          <i class="bx bxs-save save" v-show="todo.editable"> </i>

          <i class="bx bxs-trash-alt delete" @click.left="removeTodo(todo)">
          </i>
        </div>
      </div>
    </div>
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
      newTodoText: "",
      todos: [],
    };
  },
  computed: {
    todos_asc() {
      let x = this.todos;
      return x.sort((a, b) => a.createdAt - b.createdAt);
    },
  },
  methods: {
    addTodo() {
      if (this.newTodoText.trim() !== "") {
        this.todos.push({
          text: this.newTodoText.trim(),
          done: false,
          editable: false,
          createdAt: new Date().getTime(),
        });
        this.newTodoText = "";
      }
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((e) => e !== todo);
    },
    editTodo(event, todo) {
      todo.editable = true;
      event.srcElement.parentElement.previousSibling.focus();
    },
    blur(todo) {
      todo.editable = false;
    },
    finishChange(event) {
      event.srcElement.blur();
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
