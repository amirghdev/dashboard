<template>
    <article id="text" class="create" v-if="showPage">
        <h3 class="text-center">نوشته های این ترم</h3>
        <div class="text-container" v-if="showTexts">
            <text-item :texts="texts" v-on:getItems="getItems"></text-item>
        </div>
        <err :message="'شما برای این ترم نوشته ای وارد نکرده اید'" v-else></err>
        <button class="btn btn-outline-secondary mt-2">
            <router-link :to="{ name: 'createSemesterText' }">ساخت</router-link>
        </button>
    </article>
</template>

<script>
import TextItem from './TextItem.vue';
export default {
    components: {
        "text-item": TextItem
    },
    data() {
        return {
            showPage: false,
            texts: [],
            showErr: false,
            message: String,
            showTexts: false
        }
    },
    beforeCreate() {
        this.$store.state.showUniversity = false;
        this.$store.state.pageLoader = true;
    },
    created() {
        // this.validation();
        this.getItems();
    },
    methods: {
        // validate semesterID
        validation() {
            this.$http.post("Semesters/findSemester", { id: this.$route.params.id, token: localStorage.getItem('id') })
                .then(response => {
                    if (response.data.status == 1) {
                        this.semester = response.data.semester;
                        this.getItem();
                    }
                    else {
                        this.$toast.error(response.data.message);
                        this.$store.state.showUniversity = true;
                        this.$router.push({ name: "university" });
                    }
                })
        },
        // get all semester texts
        getItems() {
            this.$http.post("Semester/Texts/findAll", { token: localStorage.getItem('token'), semesterId: this.$route.params.id })
                .then(response => {
                    this.showErr = false;
                    this.showPage = true;
                    this.$store.state.showUniversity = true;
                    this.$store.state.pageLoader = false;
                    this.texts = response.data.texts;
                    (this.texts.length > 0) ? this.showTexts = true : this.showTexts = false;
                }).catch((err) => {
                    console.log(err);
                    // this.showErr = true;
                    // this.message = err.response.data.message;
                    this.$toast.error(err.response.data.message);
                    this.$store.state.showUniversity = true;
                    this.$router.push({ name: "university" });
                })
        },
    },
}
</script>