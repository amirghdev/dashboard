<template>
    <article id="createText" class="text-dark text-right create">
        <h3 class="text-info text-center py-2">
            ساخت یک بوک مارک جدید
        </h3>
        <div class="form-group">
            <input type="text" name="name" class="form-control" placeholder="نام بوک مارک را وارد کنید" ref="name"
                v-on:keypress.enter="createBookMark">
        </div>
        <div class="form-group">
            <input type="text" name="link" class="form-control" placeholder="آدرس بوک مارک را وارد کنید ." ref="link"
                v-on:keypress.enter="createBookMark">
        </div>
        <button class="btn btn-secondary" v-on:click="createBookMark">ساخت</button>
        <p class="text-right text-danger mt-2" v-show="showErr" ref="err"></p>
    </article>
</template>
<script>
import mixing from '../../../mixing';
export default {
    data() {
        return {
            errors: [],
            showErr: false,
            name: String,
            category: {}
        }
    },
    created() {
        this.name = this.chnageName(this.$route.params.name);
        this.getCategory();
    },
    mounted() {
        // seo
        this.$refs.name.focus();
    },
    methods: {
        chnageName(name) {
            return mixing.methods.nameToShow(name);
        },
        getCategory() {
            this.$http.get(`bookmarks/bookmarks.php?action=select&type=single&username=${this.$store.state.currentUser}&name=${this.name}&og=category`)
                .then(response => {
                    if (response.data.status == 1) {
                        this.category = response.data.data;
                    }
                    else {
                        this.$router.push("/Home/BookMark");
                    }
                })
        },
        createBookMark() {
            // validate
            this.errors = [];
            const name = this.$refs.name.value;
            const link = this.$refs.link.value;
            if (name == "") {
                this.errors.push("نام بوک مارک نمیتواند خالی باشد");
            }
            if (link == "") {
                this.errors.push("آدرس بوک مارک نمیتواند خالی باشد");
            }
            if (this.errors.length > 0) {
                this.showErr = true;
                this.$refs.err.textContent = this.errors.join(" , ");
            }
            else {
                this.showErr = false;
                // add to database
                this.$http.get(`bookmarks/bookmarks.php?username=${this.$store.state.currentUser}&og=category&action=create&type=bookmark&name=${name}&cat_id=${this.category.id}&link=${link}`)
                    .then(response => {
                        if (response.data.status == 1) {
                            this.showErr = false;
                            this.$vToastify.success("ساخته شد", name);
                            this.$router.push({ name: "manageCategory" });
                        }
                        else {
                            this.showErr = true;
                            this.$refs.err.textContent = response.data.response;
                        }
                    })
            }
        }
    },
}
</script>
