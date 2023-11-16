<template>
    <article id="bookmark" v-if="showPage" class="create">
        <h3 class="text-center">
            {{ category.name }}
        </h3>
        <bookmark-item v-if="showBookmarks" :bookmarks="bookmarks" @getItems="getItems"></bookmark-item>
        <err v-else :message="'شما هنوز بوک مارکی برای این دسته بندی نساخته اید'"></err>
        <button class="btn btn-outline-secondary text-light mt-3">
            <router-link :to="{ name: 'createBookMark', query: { cat_name: nameToUrl(category.name) } }">ساخت</router-link>
        </button>
        <button class="btn btn-outline-secondary text-light mt-3 ml-2">
            <router-link :to="{ name: 'categoryInsert', params: { name: nameToUrl(category.name) } }">اضافه</router-link>
        </button>
    </article>
</template>

<script>
import mixing from '../../../mixing';
import BookMarkItem from './BookMarkItem.vue';
export default {
    mixins: [mixing],
    components: {
        "bookmark-item": BookMarkItem
    },
    data() {
        return {
            category: {},
            showErr: false,
            message: "",
            showPage: false,
            showBookmarks: false,
            bookmarks: []
        }
    },
    created() {
        this.getItems();
    },
    methods: {
        getItems() {
            this.$http.post("Bookmarks/findItems", { token: localStorage.getItem("token"), name: this.nameToShow(this.$route.params.name) })
                .then(response => {
                    this.showErr = false;
                    this.showPage = true;
                    this.category = response.data.category;
                    this.bookmarks = response.data.items;
                    (response.data.items.length > 0) ? this.showBookmarks = true : this.showBookmarks = false;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
        deleteBookMark(id) {
            // get all we need
            const deletedDiv = document.querySelector(`.bookmark-item[data-id="${id}"]`);
            const parent = deletedDiv.parentNode;
            const p = document.querySelector(`p[data-id="${id}"]`);
            // remove from database
            this.$http.get(`bookmarks/bookmarks.php?username=${this.$store.state.currentUser}&id=${id}&action=delete&og=bookmark`)
                .then(response => {
                    // remove from dom
                    if (response.data.status == 1) {
                        deletedDiv.classList.add("opacity-0");
                        this.$vToastify.error("حذف شد", p.textContent);
                        setTimeout(() => {
                            this.getCategoryItems();
                            parent.removeChild(deletedDiv);
                        }, 300);

                    }
                })
        },
        manageBookmark(name) {
            this.$router.push(`/Home/BookMark/Manage/${this.manageName(name)}`);
        },
    },
}
</script>

<style scoped></style>