<template>
    <article id="redo" class="create" v-if="showPage">
        <h3 class="text-center">
            کار های انجام نشده این ماه
        </h3>
        <p>
            شما میتوانید این کار هارا به <span class="text-danger">{{
                `${$store.state.todoDay}${monthChanger($store.state.todoMonth)}` }}</span> انتقال دهید
        </p>
        <div class="redo mb-3" ref="parent" v-if="showTodo">
            <!-- <ve-table :columns="columns" :table-data="todos" /> -->
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th class="col-1">عملیات</th>
                        <th class="col-1">روز</th>
                        <th class="col-10 text-right">متن</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="todo in todos" :key="todo.id">
                        <td>
                            <a v-on:click="deleteItem(todo)"><i class="fa fa-trash text-danger mr-2" title="حذف کن"></i></a>
                            <a v-on:click="moveItem(todo)"><i class="fa fa-share-from-square text-info"
                                    title="انتقال بده"></i></a>
                        </td>
                        <td>{{ todo.day }}</td>
                        <td :data-id="todo.id">{{ todo.text }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <err v-else :message="'این ماه کار انجام نشده ای تا قبل از این تاریخ ندارد'"></err>
        <button class="btn btn-outline-secondary">
            <router-link :to="{ name: 'todos' }">برگشت</router-link>
        </button>
        <err v-if="showErr" :message="message"></err>
    </article>
</template>

<script>
import mixing from '../../../mixing'
export default {
    mixins: [mixing],
    data() {
        return {
            todos: [],
            showTodo: false,
            showPage: false,
            showErr: false,
            message: ""
        }
    },
    beforeCreate() {
        this.$store.state.pageLoader = true;
    },
    created() {
        // get items
        this.getItems();
    },
    methods: {
        getItems() {
            // get all todos from database
            this.$http.post("Todos/findUndone", { year: this.$store.state.todoYear, month: this.$store.state.todoMonth, day: this.$store.state.todoDay, token: localStorage.getItem("token") })
                .then(response => {
                    this.showErr = false;
                    this.todos = response.data.todos;
                    (response.data.todos.length > 0) ? this.showTodo = true : this.showTodo = false;
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
            this.showPage = true;
            this.$store.state.pageLoader = false;
        },
        moveItem(todo) {
            this.$http.put("Todos/move", { year: this.$store.state.todoYear, month: this.$store.state.todoMonth, day: this.$store.state.todoDay, id: todo.id, token: localStorage.getItem("token") })
                .then(() => {
                    this.showErr = false;
                    this.$toast.success(`${todo.text} انتقال یافت`)
                    this.getItems();
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
        },
        deleteItem(todo) {
            this.$http.delete("Todos/delete", { data: { id: todo.id, token: localStorage.getItem("token") } })
                .then(() => {
                    this.showErr = false;
                    this.$toast.success(`${todo.text} حذف شد`);
                    this.getItems();
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
        },
    },
}
</script>
<style scoped>
svg:hover {
    cursor: pointer;
}

table {
    background-color: var(--light);
    color: var(--dark);
    border: none;
    border-collapse: collapse;
    transition: all 300ms ease-in-out;
}

.table-striped tbody tr:nth-of-type(odd) {
    background-color: var(--grey);
}

td,
th,
tr,
thead {
    border: none !important;
}

td {
    overflow-x: scroll;
}
</style>