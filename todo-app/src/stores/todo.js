import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
    todo: {},
  }),
  actions: {
    async fetchTodos() {
      try {
        const { data } = await axios.get("http://localhost:3000/todos");
        this.todos = data;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTodoById(id) {
      try {
        await axios.delete(`http://localhost:3000/todos/${id}`);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.log(error);
      }
    },

    async addTodoHandler(todo) {
      try {
        const { data } = await axios.post("http://localhost:3000/todos", todo);
        this.todos.push(data);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },

    async fetchTodoById(id) {
      try {
        const { data } = await axios.get(`http://localhost:3000/todos/${id}`);
        this.todo = data;
      } catch (error) {
        console.log(error);
      }
    },

    async updateTodoById(id, todo) {
      try {
        await axios.put(`http://localhost:3000/todos/${id}`, todo);
        this.todos = this.todos.map((todo) =>
          todo.id === id ? { ...todo, ...todo } : todo
        );
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },

    async completeTodoHandler(id) {
      try {
        const todo = this.todos.find((todo) => todo.id === id);
        const { data } = await axios.put(`http://localhost:3000/todos/${id}`, {
          completed: true,
          title: todo.title,
          description: todo.description,
          deadline: todo.deadline,
        });
        this.todos = this.todos.map((todo) =>
          todo.id === id ? { ...todo, ...data } : todo
        );
      } catch (error) {
        console.log(error);
      }
    },

    async searchByTitle(title) {
      try {
        const { data } = await axios.get(`http://localhost:3000/todos`);

        this.todos = data.filter((todo) =>
          todo.title.toLowerCase().includes(title.toLowerCase())
        );
      } catch (error) {
        console.log(error);
      }
    },

    async filterByCompleted() {
      try {
        const { data } = await axios.get(`http://localhost:3000/todos`);

        this.todos = data.filter((todo) => todo.completed === true);
      } catch (error) {
        console.log(error);
      }
    },

    async filterByUncompleted() {
      try {
        const { data } = await axios.get(`http://localhost:3000/todos`);

        this.todos = data.filter(
          (todo) => todo.completed === false || todo.completed === "false"
        );
      } catch (error) {
        console.log(error);
      }
    },

    async sortByTitleAsc() {
      try {
        const { data } = await axios.get(`http://localhost:3000/todos`);
        this.todos = data.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
      } catch (error) {
        console.log(error);
      }
    },

    async sortByTitleDesc() {
      try {
        const { data } = await axios.get(`http://localhost:3000/todos`);
        this.todos = data.sort((a, b) => {
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
            return 1;
          }
          return 0;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
