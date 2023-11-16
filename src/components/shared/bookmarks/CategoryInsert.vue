<template>
    <article v-if="showPage" class="create">
        <h5 class="text-center">
            اضافه کردن به دسته بندی {{ $route.params.name }}
        </h5>
        <ul v-if="showItems">
            <li v-for="item in items" :key="item.id" class="item">
                <div class="item-text">
                    <p class="mb-0">
                        {{ item.name }}
                    </p>
                </div>
                <div class="item-control">
                    <button class="item-btn" v-on:click="move(item.id)" title="انتقال">
                        <i class="fa fa-solid fa-share-from-square"></i>
                    </button>
                </div>
            </li>
        </ul>
        <err v-else :message="'بوک مارکی بدون دسته بندی وجود ندارد'"></err>
        <err v-if="showError" :message="message"></err>
    </article>
</template>

<script>
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    data() {
        return {
            showPage: false,
            showError: false,
            showItems: false,
            items: Array,
            message: ""
        }
    },
    created() {
        this.getAllBookMarks();
    },
    methods: {
        getAllBookMarks() {
            // get all todos from database
            this.$http.post("Bookmarks/find-insert", { token: localStorage.getItem("token"), name: this.nameToShow(this.$route.params.name) })
                .then(response => {
                    this.showPage = true;
                    this.showTable = true;
                    this.showError = false;
                    this.items = response.data.bookmarks;
                    (response.data.bookmarks.length > 0) ? this.showItems = true : this.showItems = false;
                }).catch((err) => {
                    this.showTable = false;
                    this.showError = true;
                    this.$toast.error(err.response.data.message);
                    this.$router.push({ name: "bookmarks" }).catch(() => { });
                })
        },
        move(id) {
            this.$http.put("Bookmarks/insert", { token: localStorage.getItem("token"), id, name: this.nameToShow(this.$route.params.name) })
                .then(response => {
                    this.showError = false;
                    this.$toast.success(response.data.message);
                    this.getAllBookMarks();
                }).catch((err) => {
                    this.showError = true;
                    this.message = err.response.data.message;
                })
        }
    },
}
</script>

<style scoped>
ul li {
    list-style-type: decimal;
}
</style>