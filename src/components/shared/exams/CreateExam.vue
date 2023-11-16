<template>
    <article id="cteateExam" class="create" v-if="showPage">
        <h3 class="text-center">
            ساخت یک امتحان جدید
        </h3>
        <div class="showCreate" v-if="showCreate">
            <p>
                شما در حال ساخت امتحان برای ترم <span class="text-info"> {{ $store.state.user.unit }} </span> هستید برای
                بروزرسانی شماره ترم خود
                <span> <router-link :to="{ name: 'ActiveUniversity' }">اینجا</router-link> </span> کلیک کنید
            </p>
            <div class="form-group">
                <label>نام درس را از لیست زیر انتخاب کنید</label>
                <select ref="name" class="form-control">
                    <option disabled selected value="default">نام امتحان</option>
                    <option :value="course.name" v-for="course in courses" :key="course.id">
                        {{ course.name }} <span class="text-danger">({{ course.unit }})</span>
                    </option>
                </select>
            </div>
            <div class="form-group">
                <input type="text" name="subject" class="form-control" placeholder="موارد امتحان را وارد کنید"
                    ref="subject">
            </div>
            <div class="form-group">
                <date-picker v-model="date" class="text-dark" format="jYYYY/jMM/jDD" />
            </div>
            <err :message="`لطفا ابتدا برای ترم ${$store.state.user.unit} واحدی اضافه کنید`" v-if="courses.length == 0">
            </err>
            <button class="btn btn-outline-secondary mt-2" v-on:click="createExam" v-else>ساخت</button>
            <err :message="message" v-if="showErr"></err>
        </div>
        <p v-else>
            شما هنوز ترم دانشگاه با شماره <span class="text-info"> {{ $store.state.user.unit }} </span> را نساخته اید لطفا
            ابتدا ترم دانشگاه را <router-link
                :to="{ name: 'createSemester', query: { redirect: 'createExam' } }">ساخته</router-link> سپس واحد های آن
            دانشگاه
            را
            وارد کنید
        </p>
    </article>
</template>

<script>
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    data() {
        return {
            showErr: false,
            date: "",
            showCreate: false,
            showPage: false,
            courses: [],
            message: "",
            year: 0,
            month: 0,
            day: 0,
            semester: {}
        }
    },
    watch: {
        date() {
            let newDay = this.date.split("/")[2];
            let newMonth = this.date.split("/")[1];
            let newYear = this.date.split("/")[0];
            if (newDay.startsWith("0")) {
                newDay = newDay.substring(1, 2);
            }
            this.day = newDay;
            this.month = newMonth;
            this.year = newYear;
        }
    },
    beforeCreate() {
        this.$store.state.showExam = false;
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.$http.post("Semesters/findOne", { token: localStorage.getItem("token"), unit: this.$store.state.user.unit }).then((response) => {
                this.showCreate = true;
                this.semester = response.data.semester;
                this.getCourses();
            }).catch((err) => {
                this.showCreate = false;
                this.$toast.error(err.response.data.message);
            })
        },
        getCourses() {
            this.$http.post("Exams/findCourses", { token: localStorage.getItem("token"), unit: this.$store.state.user.unit, semesterId: this.semester.id }).then((response) => {
                this.$store.state.showExam = true;
                this.showPage = true;
                this.showErr = false;
                this.courses = response.data.courses;
            }).catch((err) => {
                this.$toast.error(err.response.data.message);
            })
        },
        createExam() {
            const name = this.$refs.name.value;
            const subject = this.$refs.subject.value;
            const year = this.year;
            const month = this.month;
            const day = this.day;
            this.showErr = false;
            this.$http.post("Exams/create", { token: localStorage.getItem("token"), semesterId: this.$store.state.user.semesterId, semester_unit: this.$store.state.user.unit, name, subject, year, month, day }).then((response) => {
                this.showErr = false;
                this.$toast.success(response.data.message);
                this.$router.push({ name: "exams" }).catch(() => { });
            }).catch((err) => {
                this.showErr = true;
                this.message = err.response.data.message;
            })
        }
    },
}
</script>
