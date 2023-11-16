<template>
    <div class="book-container mt-3">
        <div class="book-item" v-for="book in books" :key="`${book.id}`">
            <div class="book-item-image">
                <img :src="`${baseUrl}images/uploads/books/${book.image}`" alt="عکس پیدا نشد" class="img-fluid">
            </div>
            <div class="book-item-text mb-0">
                <h6 class="text-center">
                    {{ book.name }}
                </h6>
                <div class="d-flex justify-content-between align-items-center flex-row-reverse">
                    <button class="btn btn-outline-secondary" @click="show(book.id)">مشاهده</button>
                    <button class="btn btn-outline-danger" @click="deleteBook(book)">حذف</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: [
        "books"
    ],
    data() {
        return {
            baseUrl: axios.defaults.baseURL
        }
    },
    methods: {
        deleteBook(item) {
            this.$http.delete("Books/delete", { data: { token: localStorage.getItem("token"), id: item.id } }).then((response) => {
                this.$toast.success(response.data.message);
                this.$emit("getItems");
            }).catch((err) => {
                this.$toast.error(err.response.data.message);
            })
        },
        show(id) {
            this.$router.push({ name: "showBook", params: { id: id } }).catch(() => { });
            this.$emit("show");
        }
    },
}
</script>

<style scoped>
.book-container {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
}

.book-item {
    display: flex;
    flex-direction: column;
    width: calc((calc(100% / 4) - 40px));
    margin: 20px;
    /* margin-bottom: 20px; */
    border: 1px solid rgba(206, 206, 206, 0.5);
    border-radius: 7px;
}

.book-item-text {
    padding: 20px;
    overflow: hidden;
}

img {
    height: 200px;
    width: 100%;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
}

@media(max-width : 1400px) {
    .book-item {
        width: calc(calc(100% / 3) - 40px);
    }
}

@media(max-width : 1200px) {
    .book-item {
        width: calc(calc(100% / 2) - 40px);
    }
}

@media(max-width : 768px) {
    .book-item {
        width: calc(100% - 40px);
    }
}
</style>