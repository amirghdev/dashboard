<template>
    <article id="bookmark" v-if="showPage" class="create">
        <h3 class="text-center">
            بوک مارک ها
        </h3>
        <h6>
            دسته بندی ها
        </h6>
        <category-item :categories="categories" @getItems="getItems" v-if="showCategories"></category-item>
        <err v-else :message="'شما هنوز دسته بندی ای نساخته اید'"></err>
        <h6>
            بوک مارک ها
        </h6>
        <bookmark-item :bookmarks="bookMarks" @getItems="getItems" v-if="showBookMark"></bookmark-item>
        <err v-else :message="'شما هنوز بوک مارکی نساخته اید'"></err>
        <button class="btn btn-outline-secondary text-light mt-3">
            <router-link :to="{ name: 'createBookMark', query: { cat_name: 'none' } }" tag="a">بوک مارک</router-link>
        </button>
        <button class="btn btn-outline-secondary text-light mt-3 ml-2">
            <router-link :to="{ name: 'createCategory' }" tag="a">دسته بندی</router-link>
        </button>
    </article>
</template>

<script>
import mixing from '../../../mixing';
import BookMarkItem from './BookMarkItem.vue';
import CategoryItem from './CategoryItem.vue';
export default {
    mixins: [mixing],
    components: {
        "bookmark-item": BookMarkItem,
        "category-item": CategoryItem
    },
    data() {
        return {
            bookMarks: [],
            showError: false,
            showBookMark: false,
            showPage: false,
            showCategories: false,
            name: String,
            categories: []
        }
    },
    beforeCreate() {
        this.$store.state.pageLoader = true;
    },
    created() {
        this.getItems();
    },
    methods: {
        getItems() {
            // get all todos from database
            this.$http.post("Bookmarks/findAll", { token: localStorage.getItem("token") })
                .then(response => {
                    this.showPage = true;
                    this.bookMarks = response.data.bookmarks;
                    this.categories = response.data.categories;
                    (response.data.bookmarks.length > 0) ? this.showBookMark = true : this.showBookMark = false;
                    (response.data.categories.length > 0) ? this.showCategories = true : this.showCategories = false;
                    this.$store.state.pageLoader = false;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
    },
}
</script>
