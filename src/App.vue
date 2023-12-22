<template>
  <section class="greeting">
    <h2 class="heading">
      What's up,
      <input type="text" class="myname" placeholder="Your Name" maxlength="20" v-model="myName" />
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

    <div class="todos-control">
      <div class="c-row">
        <CheckAll />

        <ItemRemaining />
      </div>

      <div class="c-row">
        <FilterTodos />

        <transition name="fade">
          <ClearCompleted />
        </transition>
      </div>
    </div>

    <div v-if="anyTodos" class="content">
      <TransitionGroup name="list" enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutLeft">
        <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />
      </TransitionGroup>
    </div>
    <div v-else class="no-task">No Task!</div>
  </section>

  <footer class="footer">
    Copyright &copy; {{ yearNow }} |
    <span>&nbsp;Abdellatif RHOUNAN</span>
  </footer>
</template>

<script>
import CheckAll from "@/components/CheckAll.vue";
import ItemRemaining from "@/components/ItemRemaining.vue";
import FilterTodos from "@/components/FilterTodos.vue";
import ClearCompleted from "@/components/ClearCompleted.vue";
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "App",

  data() {
    return {
      myName: "",
      newTodo: "",
      idForTodo: 0,
    };
  },

  components: {
    CheckAll,
    ItemRemaining,
    FilterTodos,
    ClearCompleted,
    TodoItem,
  },

  computed: {
    todos() {
      return this.$store.state.todos;
    },

    filteredTodos() {
      return this.$store.getters.filteredTodos;
    },

    anyTodos() {
      return this.$store.getters.anyTodos;
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

      this.$store.commit("addTodo", {
        id: this.idForTodo,
        text: this.newTodo.trim(),
        completed: false,
      });

      this.newTodo = "";
      this.idForTodo++;
    },
  },

  watch: {
    myName(newVal) {
      localStorage.setItem("myName", newVal);
    },

    idForTodo(newVal) {
      localStorage.setItem("idForTodo", newVal);
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

    this.idForTodo = +localStorage.getItem("idForTodo") || 0;

    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    this.$store.commit("mountTodos", savedTodos);
  },
};
</script>
