import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      filterActual: "all",
      todos: [],
    };
  },

  getters: {
    remainingTodos(state) {
      return state.todos.filter((el) => !el.completed).length;
    },

    allDone(state, getters) {
      return getters.remainingTodos == 0;
    },

    showClearCompleted(state) {
      return state.todos.filter((el) => el.completed).length > 0;
    },

    filteredTodos(state) {
      let result;

      switch (state.filterActual) {
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

    anyTodos(state, getters) {
      return getters.filteredTodos.length > 0;
    },
  },

  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },

    mountTodos(state, savedTodos) {
      state.todos = savedTodos;
    },

    clearCompletedTodos(state, remainingTodos) {
      state.todos = remainingTodos;
    },

    changeFilter(state, newFilter) {
      state.filterActual = newFilter;
    },

    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },

    editTodoText(state, todo) {
      state.todos[todo.index].text = todo.text;
    },

    editTodoStatus(state, todo) {
      state.todos[todo.index].completed = todo.completed;
    },

    checkAllTodos(state, checkedAll) {
      state.todos.forEach((el) => {
        el.completed = checkedAll;
      });
    },
  },
});
