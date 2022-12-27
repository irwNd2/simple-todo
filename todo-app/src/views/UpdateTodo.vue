<script>
import { mapActions, mapState } from 'pinia';
import { useTodoStore } from '../stores/todo';

export default {
    computed: {
        ...mapState(useTodoStore, ['todo'])
    },

    methods: {
        ...mapActions(useTodoStore, ['fetchTodoById', 'updateTodoById']),
        updateTodo() {
            const id = this.$route.params.id
            this.updateTodoById(id, {
                title: this.todo.title,
                description: this.todo.description,
                deadline: this.todo.deadline,
                completed: this.todo.completed
            })
        },
        backToHome() {
        this.$router.push('/')
    },

    },
    
    created() {
        this.fetchTodoById(this.$route.params.id)
    }
}
</script>

<template>
    <div class="px-12 py-12">
        <div class="px-8 py-8">
            <h1 class="text-3xl font-bold text-center">Simple TODO App with Vue.js & TailwindCSS</h1>
        </div>
        <div class="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-lg text-center">
                <h1 class="text-xl font-bold sm:text-3xl">Add Todo</h1>
            </div>

            <form class="mx-auto mt-8 mb-0 max-w-md space-y-4" @submit.prevent="updateTodo">
                <div>
                    <label>Title</label>

                    <div class="relative">
                        <input type="text" class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                            placeholder="Enter title" v-model="this.todo.title" />
                    </div>
                </div>

                <div>
                    <label>Description</label>
                    <div class="relative">
                        <input type="text" class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                            placeholder="Enter description" v-model="this.todo.description" />

                    </div>
                </div>
                <div>
                    <label>Deadline</label>
                    <div class="relative">
                        <input type="date" class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                            placeholder="Enter description" v-model="this.todo.deadline" />

                    </div>
                </div>
                <div>
                    <label>Completed</label>
                    <div class="relative">
                        <select class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-sm
      shadow-sm
      font-normal
      text-black
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-200
      rounded-lg
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                            v-model="this.todo.completed">
                            <option selected disabled>Select Option</option>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>

                    </div>
                </div>

                <div class="flex items-center justify-end">
                    <button @click.prevent="backToHome()"
                        class="inline-block px-8 py-2 border-2 border-yellow-500 text-yellow-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                        Back
                    </button>

                    <button type="submit"
                        class="ml-2 inline-block px-8 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>