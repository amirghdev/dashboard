<template>
    <article id="show-book" class="create" v-if="showPage">
        <h3 class="text-center">
            {{ book.name }}
        </h3>
        <form @submit.prevent="updateBook" class="myForm">
            <div class="form-group">
                <label>
                    توضیحات کتاب
                </label>
                <textarea type="text" name="summary" ref="summary" class="form-control" :value="book.summary"></textarea>
            </div>
            <button class="btn btn-outline-secondary mt-3" type="submit">
                بروزرسانی
            </button>
        </form>
        <form ref="form" @submit.prevent="uploadImage" class="mt-5 row align-items-center">
            <div class="col-md-4 text-left mb-3">
                <img :src="`${baseUrl}images/uploads/books/${book.image}`" alt="عکس پیدا نشد" class="img">
            </div>
            <div class="mb-3 col-md-8">
                <div class="custom-file">
                    <input type="file" class="custom-file-input text-left" id="selectedImage" name="image" ref="image">
                    <label id="imageStatus" class="custom-file-label text-left" for="selectedImage" ref="label"></label>
                </div>
                <button class="btn btn-outline-secondary mt-3" type="submit">
                    آپلود عکس
                </button>
            </div>
        </form>
        <err v-if="showErr" :message="message"></err>
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
            showErr: false,
            showPage: false,
            message: "",
            baseUrl: axios.defaults.baseURL
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
                    this.showPage = true;
                    this.$store.state.pageLoader = false;
                    this.book = response.data.book;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                    this.$router.push({ name: "books" }).catch(() => { });
                })
        },
        updateBook() {
            const summary = this.$refs.summary.value;
            this.showErr = false;
            this.$http.put("Books/update", { token: localStorage.getItem("token"), id: this.book.id, summary })
                .then(response => {
                    this.showErr = false;
                    this.$toast.success(response.data.message);
                    this.$router.push({ name: "showBook", params: { id: this.book.id } }).catch(() => { });
                }).catch((err) => {
                    console.log(err);
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
        },
        async uploadImage() {
            let formData = new FormData(this.$refs.form);
            formData.append("token", localStorage.getItem("token"));
            formData.append("id", this.book.id);
            const response = await fetch(`${this.baseUrl}Books/image`, {
                method: "put",
                body: formData
            })
            const data = await response.json();
            if (response.status != 200) {
                this.showErr = true;
                this.message = data.message;
            } else {
                this.showErr = false;
                this.$toast.success(data.message);
                this.$router.push({ name: "showBook", params: { id: this.book.id } }).catch(() => { });
            }
        }
    },
}
</script>

<style scoped>
.myForm {
    border-bottom: 1px solid rgba(206, 206, 206, 0.5);
    padding-bottom: 20px;
}

.custom-file-input~.custom-file-label::after {
    content: "انتخاب عکس" !important;
}

.img {
    width: 200px;
    height: 200px;
}

@media(max-width : 768px) {
    .img {
        width: 100%;
    }
}
</style>