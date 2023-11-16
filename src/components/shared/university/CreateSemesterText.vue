<template>
    <article id="createText" class="create">
        <h3 class="text-center py-2">
            ساخت نوشته جدید
        </h3>
        <form @submit.prevent="createText">
            <div class="form-group">
                <input type="text" name="subject" class="form-control" placeholder="موضوع نوشته را وارد کنید" ref="subject">
            </div>
            <div class="form-group">
                <input type="text" name="text" class="form-control" placeholder="نوشته را وارد کنید" ref="text">
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
            showErr: false,
            message: String
        }
    },
    mounted() {
        this.$refs.subject.focus();
    },
    methods: {
        createText() {
            // validation
            const subject = this.$refs.subject.value;
            const text = this.$refs.text.value;
            this.$http.post("Semester/Texts/create", { token: localStorage.getItem('token'), text, subject, semesterId: this.$route.params.id, day: this.$store.state.currentDate, month: this.$store.state.currentMonth, year: this.$store.state.currentYear })
                .then(response => {
                    this.showErr = false;
                    this.$toast.success(response.data.message);
                    this.$router.push({ name: "universityTexts", params: { id: this.$route.params.id } }).catch(() => { });
                }).catch((err) => {
                    if (err.response.status == 404) {
                        this.$toast.error(err.response.data.message);
                        this.$router.push({ name: "university" }).catch(() => { });
                    } else {
                        this.showErr = true;
                        this.message = err.response.data.message;
                    }
                })
        }
    },
}
</script>
