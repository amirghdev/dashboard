<template>
    <article id="showExam" class="create" v-if="showPage">
        <h3 class="text-center">
            {{ exam.name }} <span class="text-danger">({{ exam.semester_unit }})</span>
        </h3>
        <div class="row flex-row-reverse">
            <div class="col-12 my-3">
                <h5>موارد امتحان</h5>
                <p>
                    {{ exam.subject }}
                </p>
            </div>
            <div class="col-6 my-3">
                <h5>تاریخ امتحان</h5>
                <p>
                    {{ `${exam.year} / ${exam.month} / ${exam.day}` }}
                </p>
            </div>
            <div class="col-6 my-3">
                <h5>وضعیت امتحان</h5>
                {{ exam.completed == false ? "انجام نشده است" : `انجام شده است` }}
            </div>
            <div class="col-6 my-3">
                <h5>نمره </h5>
                <p class="">
                    {{ (exam.grade == null) ? "وارد نشده است" : exam.grade }}
                </p>
            </div>
        </div>
        <button class="btn btn-outline-secondary mt-3">
            <router-link :to="{ name: 'manageExam', params: { id: exam.id } }">مدیریت</router-link>
        </button>
    </article>
</template>

<script>
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    data() {
        return {
            exam: {},
            showPage: false
        }
    },
    beforeCreate() {
        this.$store.state.showExam = false;
        this.$store.state.pageLoader = true;
    },
    created() {
        this.validate();
    },
    methods: {
        validate() {
            this.$http.post("Exams/findOne", { id: this.$route.params.id, token: localStorage.getItem("token") })
                .then(response => {
                    this.$store.state.showExam = true;
                    this.$store.state.pageLoader = false;
                    this.showPage = true;
                    this.exam = response.data.exam;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                    this.$router.push({ name: "exams" }).catch(() => { });
                })
        }
    },
}
</script>

<style></style>