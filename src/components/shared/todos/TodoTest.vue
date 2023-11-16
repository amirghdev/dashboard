<template>
    <article id="todo" class="create" v-if="showPage">
        <h3 class="text-center">کارهای روزانه</h3>
        <div class="todo-container d-flex flex-wrap">
            <div class="pickDate text-dark col-lg-3 col-12">
                <date-picker v-model="date" format="jYYYY/jMM/jDD" />
            </div>
            <div class="todo col-lg-9 col-12 px-0">
                <h5>
                    کار های <span>{{ `${day} ${monthChanger(month)} ماه` }}</span>
                </h5>
                <todo-item :todos="todos" v-on:getItems="getItems" v-if="showTodo"></todo-item>
                <err v-if="showError" :message="message"></err>
                <router-link :to="{ name: 'redo' }" class="text-warning text-right d-block mt-3">مدیریت کارهای انجام نشده
                    برای این ماه</router-link>
                <button class="btn btn-outline-secondary mt-3">
                    <router-link :to="{ name: 'createTodo' }">ساخت</router-link>
                </button>
            </div>
        </div>
    </article>
</template>

<script>
import mixing from "../../../mixing";
import TodoItem from "./TodoItem.vue";
export default {
    mixins: [mixing],
    components: {
        "todo-item": TodoItem,
    },
    data() {
        return {
            todos: [],
            items: Array,
            showError: false,
            showTodo: false,
            date: "",
            day: this.$store.state.todoDay,
            month: this.$store.state.todoMonth,
            year: this.$store.state.todoYear,
            showPage: false,
            message: "",
        };
    },
    beforeCreate() {
        this.$store.state.pageLoader = true;
    },
    created() {
        this.getItems();
    },
    watch: {
        //* change store date then render a new todolist with new date
        date() {
            let newDay = this.date.split("/")[2];
            let newMonth = this.date.split("/")[1];
            let newYear = this.date.split("/")[0];
            if (newDay.startsWith("0")) {
                newDay = newDay.substring(1, 2);
            }
            this.day = newDay;
            this.month = newMonth;
            this.year = newYear;
            this.$store.state.todoDay = newDay;
            this.$store.state.todoMonth = newMonth;
            this.$store.state.todoYear = newYear;
            this.getItems();
        },
    },
    methods: {
        getItems() {
            //* get all todos
            this.$http.post("Todos/findAll", { token: localStorage.getItem("token"), month: this.month, year: this.year, day: this.day, }).then((response) => {
                this.showPage = true;
                this.$store.state.pageLoader = false;
                this.showError = false;
                this.todos = response.data.todos;
                if (response.data.todos.length > 0) {
                    this.showTodo = true;
                } else {
                    this.showTodo = false;
                    this.showError = true;
                    this.message = `شما برای تاریخ ${this.day} / ${this.month} / ${this.year} کاری وارد نکرده اید`;
                }
            }).catch((err) => {
                console.log(err);
                this.showError = true;
                this.message = err.response.data.message;
            })
        },
    },
};
</script>
<style>
/* .pickDate {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
} */

.vpd-input-group input {
    border-radius: 0;
}

/* label {
    margin-bottom: 0;
} */

@media (max-width: 992px) {
    .pickDate {
        margin-bottom: 25px;
    }
}
</style>
