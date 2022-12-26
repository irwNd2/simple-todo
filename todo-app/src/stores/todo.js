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
        router.push("/")
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
            this.todos = this.todos.map((todo) => todo.id === id ? { ...todo, ...todo } : todo);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    },

    async completeTodoHandler(id) {
        try {
            const todo = await axios.get(`http://localhost:3000/todos/${id}`);
            const updateTodo = { ...todo.data, completed: !todo.data.completed };
            const { data } = await axios.put(`http://localhost:3000/todos/${id}`, updateTodo);
            this.todos = this.todos.map((todo) => todo.id === id ? { ...todo, completed: data.completed } : todo);
        } catch (error) {
            console.log(error);
        }
    }
  },
});
