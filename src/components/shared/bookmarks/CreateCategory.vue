<template>
    <article class="create">
        <h3 class="text-center py-2">
            ساخت یک دسته بندی جدید
        </h3>
        <form @submit.prevent="createCategory">
            <div class="form-group">
                <input type="text" name="name" class="form-control" placeholder="نام دسته بندی را وارد کنید" ref="name">
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
        createCategory() {
            const name = this.$refs.name.value;
            this.$http.post("Bookmarks/createCategory", { token: localStorage.getItem("token"), name })
                .then(response => {
                    this.showErr = false;
                    this.$toast.success(response.data.message);
                    this.$router.push({ name: "bookmarks" }).catch(() => { });
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
        }
    },
}
</script>
