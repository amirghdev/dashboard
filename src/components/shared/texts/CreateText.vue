<template>
    <article id="createText" class="create">
        <h3 class="text-center py-2">
            ساخت یک نوشته جدید برای <span>{{ `${monthChanger($store.state.textMonth)} ماه سال ${$store.state.textYear}`
            }}</span>
        </h3>
        <form @submit.prevent="createText">
            <div class="form-group">
                <input type="text" name="subject" class="form-control" placeholder="موضوع نوشته را وارد کنید" ref="subject">
            </div>
            <div class="form-group">
                <input type="text" name="text" class="form-control" placeholder="متن نوشته را وارد کنید" ref="text">
            </div>
            <button class="btn btn-outline-secondary" type="submit">
                ساخت
            </button>
        </form>
        <err v-if="showErr" :message="message"></err>
    </article>
</template>
<script>
import mixing from '../../../mixing'
export default {
    mixins: [mixing],
    data() {
        return {
            showErr: false,
            message: String,
        }
    },
    mounted() {
        this.$refs.subject.focus();
    },
    methods: {
        // monthChange(month) {
        //     return mixing.methods.monthChanger(month);
        // },
        createText() {
            const text = this.$refs.text.value;
            const subject = this.$refs.subject.value;
            this.$http.post("Texts/create", { token: localStorage.getItem("token"), text, subject, year: this.$store.state.textYear, month: this.$store.state.textMonth })
                .then(() => {
                    this.showErr = false;
                    this.$toast.success(`${subject} ساخته شد`);
                    this.$router.push({ name: "texts" }).catch(() => { });
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
        }
    },
}
</script>

<style scoped>
label {
    margin-bottom: 10px;
}
</style>