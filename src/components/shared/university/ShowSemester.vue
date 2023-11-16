<template>
    <article id="semester" v-if="showPage">
        <h4 class="text-center">شما در حال مدیریت ترم <span> {{ semester.unit }} </span> هستید</h4>
        <div class="d-flex align-items-center justify-content-between">
            <h5>
                تعداد واحد های این ترم : <span class="text-danger"> {{ (semester.total == null) ? 0 : semester.total }}
                </span>
            </h5>
            <h5>
                <router-link :to="{ name: 'universityTexts', params: { id: $route.params.id } }" class="text-warning">نوشته
                    ها</router-link>
            </h5>
        </div>
        <div class="courses-container">
            <course-item v-if="showCourses" :courses="courses" @getItems="getItems" :semester="semester"
                @decrease="decrease"></course-item>
            <err v-else :message="'شما هنوز برای این ترم واحدی ایجاد نکرده اید'"></err>
        </div>
        <err v-if="showErr" :message="message"></err>
        <button class="btn btn-outline-secondary mt-2">
            <router-link :to="{ name: 'createCourse', params: { id: semester.id } }" tag="a">ساخت</router-link>
        </button>
    </article>
</template>

<script>
import mixing from '../../../mixing';
import CourseItem from "./CourseItem.vue"
export default {
    mixins: [mixing],
    components: {
        "course-item": CourseItem
    },
    data() {
        return {
            semester: {},
            courses: [],
            showErr: false,
            showPage: false,
            message: String,
            showCourses: false
        }
    },
    beforeCreate() {
        this.$store.state.showUniversity = false;
        this.$store.state.pageLoader = true;
    },
    created() {
        this.validation();
    },
    methods: {
        validation() {
            this.$http.post("Semesters/findSemester", { token: localStorage.getItem("token"), id: this.$route.params.id })
                .then(response => {
                    this.semester = response.data.semester;
                    this.getItems();
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                    this.$store.state.showUniversity = true;
                    this.$router.push({ name: "university" }).catch(() => { });
                    // this.$router.push("/404");
                })
        },
        getItems() {
            // get all course from this semester
            this.$http.post("Courses/findAll", { token: localStorage.getItem("token"), semesterId: this.semester.id })
                .then((response) => {
                    this.showPage = true;
                    this.$store.state.showUniversity = true;
                    this.$store.state.pageLoader = false;
                    this.showErr = false;
                    this.courses = response.data.courses;
                    (response.data.courses.length > 0) ? this.showCourses = true : this.showCourses = false;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                    // this.showErr = true;
                    // this.message = err.response.data.message;
                })
        },
        decrease(unit) {
            this.semester.total -= Number(unit);
        }
    },
}
</script>