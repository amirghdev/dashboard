<template>
    <article id="createText" class="text-dark text-right create">
        <h3 class="text-info text-center py-2">
            ساخت یک کتاب جدید
        </h3>
        <form @submit.prevent="createBook">
            <div class="form-group">
                <input type="text" name="name" class="form-control" placeholder="نام کتاب را وارد کنید" ref="name">
            </div>
            <div class="form-group">
                <input type="text" name="author" class="form-control" placeholder="نام نویسنده کتاب را وارد کنید"
                    ref="author">
            </div>
            <button class="btn btn-outline-secondary" type="submit">ساخت</button>
        </form>
        <err v-if="showErr" :message="message"></err>
    </article>
</template>
<script>
export default {
    data() {
        return {
            showErr: false,
            message: ""
        }
    },
    mounted() {
        this.$refs.name.focus();
    },
    methods: {
        createBook() {
            const name = this.$refs.name.value.trim();
            const author = this.$refs.author.value.trim();
            this.$http.post("Books/create", { token: localStorage.getItem("token"), name, author })
                .then(response => {
                    this.showErr = false;
                    this.$toast.success(response.data.message);
                    this.$router.push({ name: "books" }).catch(() => { });
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
        }
    },
}
</script>
