<template>
    <article id="createSemester" class="create">
        <h3 class="text-center py-2">
            ساخت یک ترم جدید
        </h3>
        <form @submit.prevent="createSemester">
            <div class="form-group">
                <input type="tel" class="form-control" placeholder="شماره ترم خود را وارد کنید" ref="unit">
            </div>
            <div class="form-group">
                <input type="tel" class="form-control"
                    placeholder="سال ترم خود را وارد کنید مانند ترم مهر 14011 ترم بهمن 14012 ترم تابستان 14013" ref="year">
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
            message: ""
        }
    },
    mounted() {
        this.$refs.unit.focus();
    },
    methods: {
        createSemester() {
            const year = this.$refs.year.value;
            const unit = this.$refs.unit.value;
            this.$http.post("Semesters/create", { token: localStorage.getItem("token"), year, unit })
                .then(response => {
                    this.showErr = false;
                    if (Number(unit) == this.$store.state.user.unit) {
                        this.$toast.success("ترم شما با موفقیت ساخته و مشخصات شما بروز شد");
                        setTimeout(() => {
                            location.href = "/Home/university";
                        }, 500);
                    }
                    else {
                        this.$toast.success("ترم شما با موفقیت ساخته شد");
                        this.$router.push({ name: "university" }).catch(() => { });
                    }
                    // this.$toast.success(`ترم ${unit} ساخته شد`);
                    // this.$router.push({ name: "university" });
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
        }
    },
}
</script>
