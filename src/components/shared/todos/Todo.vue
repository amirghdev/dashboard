<template>
    <article id="todo" v-show="showPage">
        <h1 class="text-center">
            کارهای روزانه
        </h1>
        <router-link :to="`/Home/Todos/Redo`" class="text-warning text-right d-block">انجام نشده ها</router-link>
        <!-- show this section if there is a todo -->
        <div class="todo row " ref="parent" v-if="showTodo">
            <div class="item" v-for="item in todos" :key="item.id" :data-status="item.is_done" :data-id="item.id">
                <div class="item-text">
                    <p class="mb-0" :data-id="item.id">
                        {{ item.text }}
                    </p>
                </div>
                <div class="item-control">
                    <button class="item-btn" v-on:click="moveItem(item.id)" title="به فردا اضافه کن">
                        <i class="fa text-light fa-solid fa-share-from-square"></i>
                    </button>
                    <button class="item-btn mr-2" v-on:click="deleteItem(item.id)" title="پاک کن">
                        <i class="fa fa-trash text-light"></i>
                    </button>
                    <button class="item-btn mr-2" v-on:click="change(item.id)" :data-btn="item.id" title="عوض کن">
                        <i class="far fa-check-square text-light"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- errors section -->
        <div class="alert alert-danger mt-3" v-show="showError">
            <p class="mt-3 text-danger text-right" ref="err"></p>
        </div>
        <button class="btn btn-secondary text-light mt-3">
            <router-link to="/Home/Todos/Create" tag="a">ساخت</router-link>
        </button>
        <!-- toast sections -->
        <div class="info" ref="moveTodo">
            <p class="text-info mb-0">
                کار شما به فردا انتقال یافت
            </p>
        </div>
        <div class="info" ref="deleteTodo">
            <p class="text-danger mb-0">
                کار شما پاک شد
            </p>
        </div>
        <div class="info" ref="doneTodo">
            <p class="text-success mb-0">
                کار شما انجام شد
            </p>
        </div>
        <div class="info" ref="undoneTodo">
            <p class="text-secondary mb-0">
                کار شما انجام نشد
            </p>
        </div>
    </article>
</template>

<script>
export default {
    data() {
        return {
            todos: [],
            items: Array,
            showError: false,
            showTodo: false,
            showPage: false
        }
    },
    created() {
        // get items
        this.getItem();
    },
    mounted() {
        // add done status
        setTimeout(() => {
            this.addDone();
        }, 500);
    },
    methods: {
        moveItem(id) {
            const deletedDiv = document.querySelector(`.item[data-id="${id}"]`);
            const parent = deletedDiv.parentNode;
            this.$http.get(`todos/todos.php?action=move&id=${id}&username=${this.$store.state.currentUser}`)
                .then((response) => {
                    if (response.data.status == 1) {
                        deletedDiv.classList.add("opacity-0");
                        // helpers.activeInfo(this.$refs.moveTodo);
                        setTimeout(() => {
                            this.getItem();
                            parent.removeChild(deletedDiv);
                        }, 300);
                    }
                })
        },
        addDone() {
            // add done status when dom load
            const items = document.querySelectorAll(".item");
            items.forEach(item => {
                const id = item.getAttribute("data-id");
                const status = item.getAttribute("data-status");
                const btn = document.querySelector(`button[data-btn="${id}"]`);
                const icon = btn.children[0];
                const p = document.querySelector(`p[data-id="${id}"]`);
                if (status == 1) {
                    icon.classList.remove("far", "fa-check-square");
                    icon.classList.add("fas", "fa-redo");
                    item.setAttribute("data-status", 1);
                    p.classList.add("done");
                }
            })
        },
        getItem() {
            // get all todos from database
            this.$http.get(`todos/todos.php?day=${this.$store.state.currentDate}&month=${this.$store.state.currentMonth}&username=${this.$store.state.currentUser}&action=select&type=all`)
                .then(response => {
                    this.showPage = true;
                    if (response.data.status == 1) {
                        this.showError = false;
                        this.showTodo = true;
                        this.todos = response.data.data;
                    }
                    else {
                        this.showError = true;
                        this.showTodo = false;
                        this.$refs.err.textContent = response.data.response;
                    }
                })
        },
        change(id) {
            // get all we need
            const btn = document.querySelector(`button[data-btn="${id}"]`);
            const icon = btn.children[0];
            const item = document.querySelector(`.item[data-id="${id}"]`);
            const status = item.getAttribute("data-status");
            const p = document.querySelector(`p[data-id="${id}"]`);
            // send request to backend
            this.$http.get(`todos/todos.php?username=${this.$store.state.currentUser}&id=${id}&action=change`)
                .then(response => {
                    // if backend is done
                    if (response.data.status == 1) {
                        // change to done
                        if (status == 0) {
                            icon.classList.remove("far", "fa-check-square");
                            icon.classList.add("fas", "fa-redo");
                            item.setAttribute("data-status", 1);
                            p.classList.add("done");
                            // helpers.activeInfo(this.$refs.doneTodo);
                        }
                        // change to undone
                        else {
                            icon.classList.add("far", "fa-check-square");
                            icon.classList.remove("fas", "fa-redo");
                            item.setAttribute("data-status", 0);
                            p.classList.remove("done");
                            // helpers.activeInfo(this.$refs.undoneTodo);
                        }
                    }
                })
        },
        deleteItem(id) {
            // get all we need
            const deletedDiv = document.querySelector(`.item[data-id="${id}"]`);
            const parent = deletedDiv.parentNode;
            // remove from database
            this.$http.get(`todos/todos.php?username=${this.$store.state.currentUser}&id=${id}&action=delete`)
                .then(response => {
                    // remove from dom
                    if (response.data.status == 1) {
                        deletedDiv.classList.add("opacity-0");
                        // helpers.activeInfo(this.$refs.deleteTodo);
                        setTimeout(() => {
                            this.getItem();
                            parent.removeChild(deletedDiv);
                        }, 300);

                    }
                })
        },
    },

}
</script>
<style scoped>
a {
    font-size: 20px;
    transition: all 300ms ease-in-out;
}

a:hover {
    color: #cecece;
}
</style>
