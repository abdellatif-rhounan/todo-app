import { createStore } from "vuex";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

export const store = createStore({
  state() {
    return {
      myFilter: "all",
      todos: [],
    };
  },

  getters: {
    // Remaining Todos
    remaining(state) {
      return state.todos.filter((el) => !el.completed).length;
    },

    // All Todos Are Completed
    allDone(state, getters) {
      return getters.remaining == 0;
    },

    // Display The Clear Completed Button
    showClear(state) {
      return state.todos.filter((el) => el.completed).length > 0;
    },

    // Todos After Filter
    filteredTodos(state) {
      let result;

      switch (state.myFilter) {
        case "all":
          result = state.todos;
          break;
        case "active":
          result = state.todos.filter((el) => !el.completed);
          break;
        case "completed":
          result = state.todos.filter((el) => el.completed);
          break;
        default:
          result = state.todos;
          break;
      }

      return result;
    },

    // Todos Existence That Match The Filter
    anyTodos(state, getters) {
      return getters.filteredTodos.length > 0;
    },
  },

  mutations: {
    // Initialize Todos State
    getTodos(state, data) {
      state.todos = data;
    },

    // Add New Todo Locally
    addTodo(state, todo) {
      state.todos.push(todo);
    },

    // Remove Todo Locally
    removeTodo(state, id) {
      const index = state.todos.findIndex((el) => el.id === id);

      state.todos.splice(index, 1);
    },

    // Update Todo Locally
    updateTodo(state, todo) {
      const index = state.todos.findIndex((el) => el.id === todo.id);

      state.todos.splice(index, 1, todo);
    },

    // Delete Completed Todos Locally
    clearCompleted(state) {
      state.todos = state.todos.filter((el) => !el.completed);
    },

    // Change Filter
    changeFilter(state, newFilter) {
      state.myFilter = newFilter;
    },

    // Check|Uncheck All Todos
    checkAll(state, checked) {
      state.todos.forEach((el) => {
        el.completed = checked;
      });
    },
  },

  actions: {
    // get All Todos from DB
    getTodos({commit}) {
      axios.get("/todos")
        .then(res => {
          commit("getTodos", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // Add New Todo To DB
    addTodo({commit}, todo) {
      axios.post("/todos", todo)
        .then(res => {
          commit("addTodo", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // Remove Todo From DB
    removeTodo({commit}, id) {
      axios.delete(`/todos/${id}`)
        .then(() => {
          commit("removeTodo", id);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // Update Todo To DB
    updateTodo({commit}, todo) {
      axios.put(`/todos/${todo.id}`, todo)
        .then(() => {
          commit('updateTodo', todo);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // Delete Completed Todos From DB
    clearCompleted({state, commit}) {
      const ids = state.todos
                    .filter(el => el.completed)
                    .map(el => el.id);

      axios.delete("/todos", {
        data: {
          ids,
        },
      })
        .then(() => {
          commit("clearCompleted");
        })
        .catch(err => {
          console.log(err);
        });
    },

    // Check|Uncheck All Todos
    checkAll({commit}, checked) {
      axios.patch("/todos", {
        checked,
      })
        .then(() => {
          commit("checkAll", checked);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
});
