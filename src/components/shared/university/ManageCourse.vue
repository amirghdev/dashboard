<template>
    <article id="" class="create" v-if="showPage">
        <h3 class="text-center">{{ course.name }} (<span class="text-danger"> {{ course.unit }} </span>)</h3>
        <h4>
            اطلاعات کلاس
        </h4>
        <div class="row m-0 p-0 flex-row-reverse">
            <div class="col-md-6 my-3">
                <label for="date">مکان و زمان برگزاری</label>
                <input type="text" name="date" ref="place" class="form-control" v-model="course.place"
                    v-on:change="pushToUpdate('place')">
            </div>
            <div class="col-md-6 my-3">
                <label for="teacher">نام استاد</label>
                <input type="text" name="teacher" ref="teacher" class="form-control" v-model="course.teacher"
                    v-on:change="pushToUpdate('teacher')">
            </div>
            <div class="col-md-6 my-3">
                <label for="status">وضعیت</label>
                <select name="status" ref="status" class="form-control text-right" v-on:change="pushToUpdate('status')">
                    <!-- <option v-for="item in statusOptions" :value="item.status" :selected="item.status == course.status"
                        :key="item"> {{
                            item.text }} </option> -->
                    <option value="0" :selected="course.status == 0">هنوز مشخص نشده است</option>
                    <option value="1" :selected="course.status == 1">پاس شده است</option>
                    <option value="2" :selected="course.status == 2">رد شده است</option>
                </select>
            </div>
            <div class="col-md-6 my-3">
                <label for="absence">تعداد غیبت</label>
                <input type="tel" name="absence" ref="absence" class="form-control" v-model="course.absence"
                    v-on:change="pushToUpdate('absence')">
            </div>
            <div class="col-md-6 my-3">
                <label>نمره</label>
                <input type="tel" name="grade" ref="grade" class="form-control" v-model="course.grade"
                    v-on:change="pushToUpdate('grade')">
            </div>
        </div>
        <h4>
            میان ترم
        </h4>
        <div class="row m-0 p-0 flex-row-reverse">
            <div class="col-md-6 my-3">
                <label for="midterm">وضعیت میان ترم</label>
                <select name="midterm" ref="midterm" class="form-control text-right" v-on:change="pushToUpdate('midterm')">
                    <!-- <option v-for="item in midtermOptions" :value="item.status" :selected="item.status == course.midterm"
                        :key="item">
                        {{
                            item.text }} </option> -->
                    <option value="0" :selected="course.midterm == 0">هنوز مشخص نشده است</option>
                    <option value="1" :selected="course.midterm == 1">دارد</option>
                    <option value="2" :selected="course.midterm == 2">ندارد</option>
                </select>
            </div>
            <div class="col-md-6 my-3">
                <label>توضیحات میان ترم</label>
                <input type="text" ref="midterm_text" class="form-control" v-model="course.midterm_text"
                    v-on:change="pushToUpdate('midterm_text')">
            </div>
        </div>
        <h4>
            ارائه
        </h4>
        <div class="row m-0 p-0 flex-row-reverse">
            <div class="col-md-6 my-3">
                <label>وضعیت ارائه</label>
                <select ref="presentation" class="form-control text-right" v-on:change="pushToUpdate('presentation')">
                    <option value="0" :selected="course.presentation == false">ندارد</option>
                    <option value="1" :selected="course.presentation == true">دارد</option>
                </select>
            </div>
            <div class="col-md-6 my-3">
                <label>توضیحات ارائه</label>
                <input type="text" ref="presentation_text" class="form-control" v-model="course.presentation_text"
                    v-on:change="pushToUpdate('presentation_text')">
            </div>
        </div>
        <h4>
            پروژه
        </h4>
        <div class="row m-0 p-0 flex-row-reverse">
            <div class="col-md-6 my-3">
                <label>وضعیت پروژه</label>
                <select ref="project" class="form-control text-right" v-on:change="pushToUpdate('project')">
                    <option value="0" :selected="course.project == false">ندارد</option>
                    <option value="1" :selected="course.project == true">دارد</option>
                </select>
            </div>
            <div class="col-md-6 my-3">
                <label>توضیحات پروژه</label>
                <input type="text" ref="project_text" class="form-control" v-model="course.project_text"
                    v-on:change="pushToUpdate('project_text')">
            </div>
        </div>
        <div class="col-12 my-3">
            <label>توضیحات کلی</label>
            <textarea type="text" ref="description" class="form-control" v-model="course.description"
                v-on:change="pushToUpdate('description')"></textarea>
        </div>
        <button class="btn btn-outline-secondary mt-2" v-on:click="allUpdate">
            بروزرسانی
        </button>
        <err :message="message" v-if="showErr"></err>
    </article>
</template>

<script>
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    data() {
        return {
            update: [],
            course: {},
            status: "",
            midterm: "",
            errors: [],
            showErr: false,
            type: "",
            showPage: false,
            message: "",
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
            this.$http.post("Courses/findOne", { token: localStorage.getItem("token"), id: this.$route.params.courseId, semesterId: this.$route.params.id }).then((response) => {
                this.$store.state.showUniversity = true;
                this.showPage = true;
                this.$store.state.pageLoader = false;
                this.course = response.data.course;
            }).catch((err) => {
                this.$toast.error(err.response.data.message);
                this.$store.state.showUniversity = true;
                this.$router.push({ name: "university" });
            })
        },
        pushToUpdate(name) {
            this.update.push(name);
        },
        allUpdate() {
            if (this.update.length == 0) {
                this.showErr = true;
                this.message = "لطفا اول بخشی را تغییر دهید سپس بروزرسانی کنید";
            }
            else {
                this.showErr = false;
                let data = {};
                this.update.forEach((item) => {
                    data[item] = this.$refs[item].value;
                })
                this.$http.put("Courses/update", { id: this.course.id, data, token: localStorage.getItem("token") })
                    .then(response => {
                        this.showErr = false;
                        this.$toast.success(response.data.message);
                        this.$router.push({ name: "showCourse", params: { id: this.course.semesterId, courseId: this.course.id } });
                    }).catch((err) => {
                        this.showErr = true;
                        this.message = err.response.data.message;
                    })
            }
        },
    },
}
</script>

<style scoped>
h4 {
    margin-bottom: 0;
}

@media(max-width : 578px) {

    .col-md-6,
    .col-12 {
        padding: 0;
    }
}
</style>