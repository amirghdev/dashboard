<template>
    <div id="exam-start" v-if="showPage">
        <h3 class="text-center">
            امتحان ها
        </h3>
        <div class="exam-container">
            <exam-item v-if="showExams" :exams="exams" @getItems="getItems"></exam-item>
            <err v-else :message="`شما هنوز برای ترم ${$store.state.user.unit} امتحانی درست نکرده اید`"></err>
        </div>
        <err v-if="showErr" :message="message"></err>
        <button class="btn btn-outline-secondary mt-3">
            <router-link :to="{ name: 'createExam' }" tag="a">ساخت</router-link>
        </button>
    </div>
</template>

<script>
import ExamItem from './ExamItem.vue';
export default {
    components: {
        "exam-item": ExamItem
    },
    data() {
        return {
            exams: [],
            showErr: false,
            showExams: false,
            showPage: false,
            message: ""
        }
    },
    beforeCreate() {
        this.$store.state.showExam = false;
        this.$store.state.pageLoader = true;
    },
    created() {
        this.getItems();
    },
    methods: {
        getItems() {
            // get all exams
            this.$http.post("Exams/findAll", { token: localStorage.getItem("token"), semester_unit: this.$store.state.user.unit })
                .then(response => {
                    this.showPage = true;
                    this.$store.state.showExam = true;
                    this.$store.state.pageLoader = false;
                    this.showErr = false;
                    this.exams = response.data.exams;
                    (response.data.exams.length > 0) ? this.showExams = true : this.showExams = false;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
    }
}
</script>
