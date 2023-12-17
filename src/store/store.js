import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      myFilter: "all",
      todos: [],
    };
  },

  getters: {
    filterdTodos(state) {
      if (state.myFilter == "all") {
        return state.todos;
      } else if (state.myFilter == "active") {
        return state.todos.filter((e) => !e.completed);
      } else if (state.myFilter == "completed") {
        return state.todos.filter((e) => e.completed);
      } else {
        return state.todos;
      }
    },

    remaining(state) {
      return state.todos.filter((e) => !e.completed).length;
    },

    allDone(state, getters) {
      return getters.remaining == 0;
    },

    showClearCompleted(state) {
      return state.todos.filter((e) => e.completed).length > 0;
    },

    anyTodos(state, getters) {
      return getters.filterdTodos.length > 0;
    },
  },

  mutations: {
    addTodo(state, data) {
      state.todos.push(data);
    },

    mountTodos(state, data) {
      state.todos = data;
    },

    clearCompleted(state, data) {
      state.todos = data;
    },

    changeFilter(state, newFilter) {
      state.myFilter = newFilter;
    },

    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },

    editText(state, data) {
      state.todos[data.index].text = data.text;
    },

    editCheck(state, data) {
      state.todos[data.index].completed = data.completed;
    },

    checkAll(state, checked) {
      state.todos.forEach((e) => {
        e.completed = checked;
      });
    },
  },
});
