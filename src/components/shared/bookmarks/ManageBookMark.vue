<template>
    <article class="create" v-if="showPage">
        <h3 class="text-center">
            {{ bookMark.name }}
        </h3>
        <form @submit.prevent="update">
            <div class="form-group">
                <label>
                    لینک
                </label>
                <input type="text" class="form-control" :value="bookMark.link" name="link" ref="link">
            </div>
            <button class="btn btn-outline-secondary" type="submit">بروزرسانی</button>
        </form>
        <err v-if="showErr" :message="message"></err>
    </article>
</template>

<script>
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    data() {
        return {
            bookMark: {},
            showErr: false,
            message: "",
            showPage: false
        }
    },
    created() {
        this.getItem();
    },
    methods: {
        getItem() {
            this.$http.post("Bookmarks/findBookmark", { token: localStorage.getItem("token"), name: this.nameToShow(this.$route.params.name) })
                .then(response => {
                    console.log(response);
                    this.showPage = true;
                    this.bookMark = response.data.bookmark;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                    this.$router.push({ name: "bookmarks" }).catch(() => { });
                })
        },
        update() {
            const link = this.$refs.link.value;
            this.$http.put("Bookmarks/updateBookmark", { token: localStorage.getItem("token"), link, id: this.bookMark.id })
                .then(response => {
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

<style scoped></style>