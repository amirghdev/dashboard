<template>
    <article class="create" v-if="showPage">
        <h3 class="text-center py-2">
            ساخت یک بوک مارک جدید
        </h3>
        <form @submit.prevent="createBookMark">
            <div class="form-group">
                <input type="text" name="name" class="form-control" placeholder="نام بوک مارک را وارد کنید" ref="name">
            </div>
            <div class="form-group">
                <input type="text" name="link" class="form-control" placeholder="آدرس بوک مارک را وارد کنید" ref="link">
            </div>
            <button class="btn btn-outline-secondary" type="submit">ساخت</button>
        </form>
        <err v-if="showErr" :message="message"></err>
    </article>
</template>
<script>
import mixing from "../../../mixing";
export default {
    mixins: [mixing],
    data() {
        return {
            showErr: false,
            message: "",
            showPage: false,
            cat_name: ""
        }
    },
    created() {
        if (this.$route.query.cat_name == undefined) {
            this.$router.push({ name: "bookmarks" }).catch(() => { });
            this.showPage = false;
        }
        this.cat_name = this.nameToShow(this.$route.query.cat_name);
        this.showPage = true;
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.name.focus();
        })
    },
    methods: {
        createBookMark() {
            const name = this.$refs.name.value;
            const link = this.$refs.link.value;
            let data = {
                token: localStorage.getItem("token"),
                name,
                link
            }
            if (this.$route.query.cat_name != "none") {
                data.cat_name = this.cat_name;
            }
            this.$http.post("Bookmarks/createBookmark", data)
                .then(response => {
                    console.log(response);
                    this.showErr = false;
                    this.$toast.success(response.data.message);
                    if (this.$route.query.cat_name != "none") {
                        this.$router.push({ name: "manageCategory", params: { name: response.data.name } }).catch(() => { });
                    }
                    else {
                        this.$router.push({ name: "bookmarks" }).catch(() => { });
                    }
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
        }
    },
}
</script>
