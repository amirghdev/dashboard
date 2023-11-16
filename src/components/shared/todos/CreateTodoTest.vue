<template>
    <article id="cteateTodo" class="create">
        <h3 class="text-center py-2">
            ساخت یک کار جدید برای <span>{{ `${$store.state.todoDay} ${monthChanger($store.state.todoMonth)} ماه` }}</span>
        </h3>
        <form @submit.prevent="createTodo">
            <div class="form-group">
                <!-- <label class="mb-2">کار روزانه</label> -->
                <input type="text" name="text" class="form-control" placeholder="نام کار روزانه را وارد کنید" ref="text">
            </div>
            <button class="btn btn-outline-secondary" type="submit">
                ساخت
            </button>
        </form>
        <err v-if="showErr" :message="message" :title="title"></err>
    </article>
</template>

<script>
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    data() {
        return {
            showErr: false,
            message: String,
            title: ""
        }
    },
    mounted() {
        this.$refs.text.focus();
    },
    methods: {
        createTodo() {
            const text = this.$refs.text.value;
            this.$http.post("Todos/create", { token: localStorage.getItem("token"), text, day: this.$store.state.todoDay, month: this.$store.state.todoMonth, year: this.$store.state.todoYear })
                .then(() => {
                    this.$toast.success(`${text} ساخته شد`);
                    this.$router.push({ name: "todos" }).catch(() => { });
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                    this.title = err.response.data.title;
                    this.$refs.text.focus();
                })
        }
    },
}
</script>
