<template>
    <article id="cteateCourse" class="create" v-if="showPage">
        <h3 class="text-center py-2">
            ساخت یک واحد جدید برای ترم <span> {{ semester.unit }} </span>
        </h3>
        <form @submit.prevent="createCourse">
            <div class="form-group">
                <input type="tel" name="unit" class="form-control" placeholder="تعداد واحد این درس را وارد کنید" ref="unit">
            </div>
            <div class="form-group">
                <input type="text" name="name" class="form-control" placeholder="نام درس را وارد کنید" ref="name">
            </div>
            <button class="btn btn-outline-secondary" type="submit">ساخت</button>
        </form>
        <err v-if="showErr" :message="message"></err>
    </article>
</template>

<script>
export default {
    data() {
        return {
            showPage: false,
            showErr: false,
            semester: {},
            message: String
        }
    },
    beforeCreate() {
        this.$store.state.showUniversity = false;
    },
    created() {
        this.validate();
    },
    methods: {
        validate() {
            // check if semester exist
            this.$http.post("Semesters/findSemester", { id: this.$route.params.id, token: localStorage.getItem("token") })
                .then(response => {
                    this.$store.state.showUniversity = true;
                    this.showPage = true;
                    this.semester = response.data.semester;
                    this.$nextTick(() => {
                        this.$refs.unit.focus();
                    })
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                    this.$router.push({ name: "university" });
                })
        },
        createCourse() {
            // validate
            const name = this.$refs.name.value;
            const unit = this.$refs.unit.value;
            this.$http.post("Courses/create", { token: localStorage.getItem("token"), semesterId: this.semester.id, name, unit })
                .then(() => {
                    this.showErr = false;
                    this.$toast.success(`${name} ساخته شد`);
                    this.$router.push({ name: "showSemester", params: { id: this.semester.id } }).catch(() => { });
                }).catch((err) => {
                    console.log(err);
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
        }
    },
}
</script>