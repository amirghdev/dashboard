<template>
    <article id="showBook" class="create" v-show="showPage">
        <h3 class="text-center">
            {{ book.name }}
        </h3>
        <div class="row">
            <div class="col-md-4 text-left">
                <img :src="img" alt="عکس پیدا نشد" class="img-fluid w-100">
            </div>
            <div class="col-md-8">
                <div class="mt-2">
                    <h5>نام نویسنده</h5>
                    <p>
                        {{ book.author }}
                    </p>
                </div>
                <div class="mt-2">
                    <h5>توضیحات</h5>
                    <p>
                        {{ (book.summary == null) ? "وارد نشده است" : book.summary }}
                    </p>
                </div>
            </div>
        </div>
        <button class="btn btn-outline-secondary mt-3" v-on:click="show">
            <router-link :to="{ name: 'manageBook', params: { id: book.id } }" tag="a">مدیریت</router-link>
        </button>
    </article>
</template>

<script>
import axios from 'axios';
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    data() {
        return {
            book: {},
            showPage: false,
            baseUrl: axios.defaults.baseURL,
            img: ""
        }
    },
    beforeCreate() {
        this.$store.state.pageLoader = true;
    },
    created() {
        this.validation();
    },
    methods: {
        validation() {
            //check if book exist in database
            this.$http.post("Books/findOne", { token: localStorage.getItem("token"), id: this.$route.params.id })
                .then(response => {
                    this.book = response.data.book;
                    if (this.book.image == null) {
                        this.img = `${this.baseUrl}images/uploads/books/book.jpg`;
                    } else {
                        this.img = `${this.baseUrl}images/uploads/books/${this.book.image}`;
                    }
                    this.showPage = true;
                    this.$store.state.pageLoader = false;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                    this.$router.push({ name: "books" });
                })
        },
        show() {
            this.showPage = false;
            this.$store.state.pageLoader = true;
        }
    },
}
</script>

<style scoped>
img {
    height: 250px;
    border-radius: 7px;
}
</style>