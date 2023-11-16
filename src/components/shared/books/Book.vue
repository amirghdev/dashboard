<template>
    <article id="book" class="create" v-if="showPage">
        <h3 class="text-center">کتاب ها</h3>
        <div class="book-container">
            <book-item :books="books" v-on:getItems="getItems" v-on:show="show" v-if="showBook"></book-item>
            <err v-if="showBook == false" :message="'شما هنوز کتابی وارد نکرده اید'"></err>
            <err v-if="showErr" :message="message"></err>
            <button class="btn btn-outline-secondary mt-3">
                <router-link :to="{ name: 'createBook' }">ساخت</router-link>
            </button>
        </div>
    </article>
</template>

<script>
import mixing from '../../../mixing';
import BookItem from './BookItem.vue';
export default {
    mixins: [mixing],
    components: {
        "book-item": BookItem
    },
    data() {
        return {
            books: [],
            showErr: false,
            showBook: false,
            showPage: false,
            message: ""
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
            // get all books
            this.$http.post("Books/findAll", { token: localStorage.getItem("token") })
                .then(response => {
                    this.showPage = true;
                    this.$store.state.pageLoader = false;
                    this.books = response.data.books;
                    (this.books.length > 0) ? this.showBook = true : this.showBook = false;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
        deleteItem(id) {
            // get all we need
            const deletedDiv = document.querySelector(`.item[data-id="${id}"]`);
            const parent = deletedDiv.parentNode;
            const span = document.querySelector(`span[data-id="${id}"]`);
            // remove from database
            this.$http.get(`books/books.php?username=${this.$store.state.currentUser}&id=${id}&action=delete`)
                .then(response => {
                    // remove from dom
                    if (response.data.status == 1) {
                        deletedDiv.classList.add("opacity-0");
                        this.$vToastify.error("حذف شد", span.textContent);
                        setTimeout(() => {
                            parent.removeChild(deletedDiv);
                            this.getItem();
                        }, 300);

                    }
                })
        },
        show() {
            this.showPage = false;
            this.$store.state.pageLoader = true;
        }
    },
}
</script>