<template>
    <article id="cteateTodo" class="text-dark text-right create">
        <h3 class="text-info text-center py-2">
            ساخت یک کار جدید
        </h3>
        <div class="form-group">
            <input type="text" name="text" class="form-control" placeholder="کار خود را وارد کنید" ref="text"
                v-on:keypress.enter="createTodo">
        </div>
        <div class="form-group">
            <label for="day">روز را وارد کنید</label>
            <input type="number" name="day" class="form-control" :value="$store.state.currentDate" ref="day"
                v-on:keypress.enter="createTodo">
        </div>
        <button class="btn btn-secondary" v-on:click="createTodo">ساخت</button>
        <err :message="message" v-if="showErr"></err>
    </article>
</template>

<script>
export default {
    data() {
        return {
            showErr: false,
            message: String
        }
    },
    mounted() {
        // seo
        this.$refs.text.focus();
    },
    methods: {
        createTodo() {
            this.$http.post("Todos/create", { token: localStorage.getItem("token"), data: { text: this.$refs.text, date: this.$store.state.todoDate } })
                .then(response => {
                    // redirect to todos
                    if (response.data.status == 1) {
                        this.$router.push({ name: "todos" });
                    } else {
                        this.showErr = true;
                        this.message = response.data.message;
                    }
                })

        }
    },
}
</script>
