<template>
    <article id="semester" class="create" v-if="showPage">
        <h3 class="text-center">{{ course.name }} (<span class="text-danger"> {{ course.unit }} </span>)</h3>
        <div class="row flex-row-reverse">
            <div class="col-md-6">
                <h4>
                    اطلاعات کلاس
                </h4>
                <p>
                    مکان و زمان برگزاری : {{ course.place == null ? "مشخص نشده است" : course.place }}
                </p>
                <p>
                    نام استاد :
                    {{ (course.teacher == null || course.teacher == "") ? "هنوز وارد نشده است" : course.teacher }}
                </p>
                <p>
                    وضعیت کلاس : {{ changeStatus(course.status) }}
                </p>
                <p>
                    تعداد غیبت :
                    {{ course.absence }}
                </p>
                <p>
                    نمره :
                    {{ (course.grade == null) ? 'وارد نشده است' : course.grade }}
                </p>
            </div>
            <div class="col-md-6 my-2">
                <h4>میان ترم</h4>
                <p>
                    وضعیت میان ترم :
                    {{ changeMidterm(course.midterm) }}
                </p>
                <p>
                    توضیحات میان ترم : {{ course.midterm_text == null ? "وارد نشده است" : course.midterm_text }}
                </p>
            </div>
            <div class="col-md-6 my-2">
                <h4>
                    ارائه
                </h4>
                <p>
                    وضعیت ارائه : {{ course.presentation == false ? "ندارد" : "دارد" }}
                </p>
                <p v-if="course.presentation">
                    توضیحات ارائه : {{ course.presentation_text == null ? "وارد نشده است" : course.presentation_text }}
                </p>
            </div>
            <div class="col-md-6 my-2">
                <h4>
                    پروژه
                </h4>
                <p>
                    وضعیت پروژه : {{ course.project == false ? "ندارد" : "دارد" }}
                </p>
                <p v-if="course.project">
                    توضیحات پروژه : {{ course.project_text == null ? "وارد نشده است" : course.project_text }}
                </p>
            </div>
            <div class="col-12 my-2">
                <h5>توضیحات</h5>
                <p>
                    {{ (course.description == null || course.description == "") ? "وارد نشده است" : course.description }}
                </p>
            </div>
        </div>
        <button class="btn btn-outline-secondary mt-2">
            <router-link
                :to="{ name: 'manageCourse', params: { courseId: $route.params.courseId, id: $route.params.id } }">مدیریت</router-link>
        </button>
    </article>
</template>

<script>
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    data() {
        return {
            course: {},
            showPage: false
        }
    },
    beforeCreate() {
        this.$store.state.pageLoader = true;
    },
    created() {
        this.$store.state.showUniversity = false;
        this.validation();
    },
    methods: {
        validation() {
            this.$http.post("Courses/findOne", { id: this.$route.params.courseId, semesterId: this.$route.params.id, token: localStorage.getItem("token") }).then((response) => {
                console.log(response);
                this.showPage = true;
                this.$store.state.showUniversity = true;
                this.$store.state.pageLoader = false;
                this.course = response.data.course;
            }).catch((err) => {
                this.$toast.error(err.response.data.message);
                this.$store.state.showUniversity = true;
                this.$router.push({ name: "university" }).catch(() => { });
            })
        },
        changeStatus(status) {
            let text = "";
            if (status == 0) {
                text = "مشخصی نشده است";
            }
            if (status == 1) {
                text = "پاس شده است";
            }
            if (status == 2) {
                text = "حذف شده است";
            }
            return text;
        },
        changeMidterm(midterm) {
            let text = "";
            if (midterm == 0) {
                text = "مشخصی نشده است";
            }
            if (midterm == 1) {
                text = "میان ترم دارد";
            }
            if (midterm == 2) {
                text = "میان ترم ندارد";
            }
            return text;
        }
    },
}
</script>

<style scoped>
@media(max-width : 578px) {

    .col-md-6,
    .col-12 {
        padding: 0;
    }
}
</style>