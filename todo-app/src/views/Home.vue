<script>
import { mapState, mapActions } from 'pinia'
import { useTodoStore } from '../stores/todo'
import TodoRows from "../components/TodoRows.vue";

export default {
    created() {
        this.fetchTodos()
    },
    computed: {
        ...mapState(useTodoStore, ['todos'])
    },
    methods: {
        ...mapActions(useTodoStore, ['fetchTodos', 'deleteTodoById']),

        deleteTodo(id) {
            this.deleteTodoById(id)
        },

        addTodo() {
            this.$router.push('/add-todo')
        },

        updateTodoById(id) {
            this.$router.push(`/update-todo/${id}`)
        }
    },
    components: {
        TodoRows
    }
}

</script>


<template>
<div class="px-12 py-12">
        <div class="px-8 py-8">
            <h1 class="text-3xl font-bold text-center">Simple TODO App with Vue.js & TailwindCSS</h1>

        </div>
        <div class="px-4 py-4">
            <h3 class="text-xl font-bold">Table of TODO List</h3>
            <button class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" @click.prevent="addTodo">Add Todo</button>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 text-sm">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            ID
                        </th>
                        <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            Title
                        </th>

                        <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            Description
                        </th>
                        <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            Completed
                        </th>
                        <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            Deadline
                        </th>
                        <th class="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                    <TodoRows v-for="todo in todos" :key="todo.id" :todo="todo" :deleteTodo="deleteTodo" :updateTodoById="updateTodoById" />
                </tbody>
            </table>
        </div>
    </div>
</template>