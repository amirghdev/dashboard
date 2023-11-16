<template>
    <div class="bookmarks-container">
        <div class="bookmark-item text-center" v-for="item in bookmarks" :key="item.id">
            <a target="_blank" :href="item.link" class="d-block text-dark">
                <div class="bookmark-image">
                    <img :src="`https://www.google.com/s2/favicons?sz=64&domain=${item.link}`" alt="پیدا نشد">
                </div>
                <div class="bookmark-text overflow-hidden">
                    <p class="mb-0">
                        {{ item.name }}
                    </p>
                </div>
            </a>
            <div class="bookmark-control">
                <button class="bookmark-btn" v-on:click="manageBookmark(item.name)" title="مدیریت">
                    <i class="fa fa-pen"></i>
                </button>
                <button class="bookmark-btn" v-on:click="deleteBookMark(item.id)" title="پاک کن">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import mixing from "../../../mixing";
export default {
    mixins: [mixing],
    props: [
        "bookmarks"
    ],
    methods: {
        deleteBookMark(id) {
            this.$http.delete("Bookmarks/deleteBookmark", { data: { token: localStorage.getItem("token"), id } })
                .then(response => {
                    this.$toast.success(response.data.message);
                    this.$emit("getItems");
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
        manageBookmark(name) {
            // this.$router.push(`/Home/BookMark/Manage/${this.manageName(name)}`);
            this.$router.push({ name: "manageBookmark", params: { name: this.nameToUrl(name) } }).catch(() => { });
        },
    },
}
</script>

<style scoped>
.bookmarks-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
}
</style>