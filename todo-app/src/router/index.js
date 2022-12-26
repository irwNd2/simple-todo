import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AddTodo from "../views/AddTodo.vue";
import UpdateTodo from "../views/UpdateTodo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: '/add-todo',
      name: 'add-todo',
      component: AddTodo,
    },
    {
      path: '/update-todo/:id',
      name: 'update-todo',
      component: UpdateTodo,
    }
    
  ],
});

export default router;
