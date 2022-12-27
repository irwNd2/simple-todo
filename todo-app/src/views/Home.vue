<script>
import { mapState, mapActions } from 'pinia'
import { useTodoStore } from '../stores/todo'
import TodoRows from "../components/TodoRows.vue";

export default {
    data() {
        return {
            search: ''
        }
    },
    created() {
        this.fetchTodos(),
            this.searchByTitle('')
    },
    computed: {
        ...mapState(useTodoStore, ['todos'])
    },
    methods: {
        ...mapActions(useTodoStore, ['fetchTodos', 'deleteTodoById', 'completeTodoHandler', 'searchByTitle', 'filterByCompleted', 'filterByUncompleted', 'sortByTitleAsc', 'sortByTitleDesc']),

        deleteTodo(id) {
            this.deleteTodoById(id)
        },

        addTodo() {
            this.$router.push('/add-todo')
        },

        updateTodoById(id) {
            this.$router.push(`/update-todo/${id}`)
        },

        searchTodoByTitle() {
            this.searchByTitle(this.search)
        },

        filterByCompletedButton() {
            this.filterByCompleted()
        },

        filterByUncompletedButton() {
            this.filterByUncompleted()
        },
        sortByTitleAscButton() {
            this.sortByTitleAsc()
        },

        sortByTitleDescButton() {
            this.sortByTitleDesc()
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
            <button
                class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                @click.prevent="addTodo">Add Todo</button>
        </div>

        <div class="px-4 py-4">
            <span>
                <input type="text"
                    class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    placeholder="Search by title" v-model="search" @keyup.enter="searchTodoByTitle">
                <button
                    class="inline-block px-6 py-2 border-2 border-cyan-600 text-cyan-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    @click.prevent="searchTodoByTitle">Search</button>
            </span>
            <span>
                <p class="text-l font-bold">Filter By Completed</p>
            </span>
            <span>
                <button
                    class="inline-block px-6 py-2 border-2 border-indigo-600 text-indigo-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    @click.prevent="filterByCompletedButton">Completed</button>
                <button
                    class="inline-block px-6 py-2 border-2 border-indigo-800 text-indigo-800 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    @click.prevent="filterByUncompletedButton">Uncompleted</button>
            </span>
            <span>
                <p class="text-l font-bold">Sort By Title</p>
                <button
                    class="inline-block px-6 py-2 border-2 border-rose-400 text-rose-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    @click.prevent="sortByTitleAscButton">ASC</button>
                <button
                    class="inline-block px-6 py-2 border-2 border-rose-700 text-rose-700 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    @click.prevent="sortByTitleDescButton">DESC</button>
            </span>
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
                        <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            Mark as Completed
                        </th>
                        <th class="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                    <TodoRows v-for="todo in todos" :key="todo.id" :todo="todo" :deleteTodo="deleteTodo"
                        :updateTodoById="updateTodoById" :completeTodoHandler="completeTodoHandler" />
                </tbody>
            </table>
        </div>
    </div>
</template>