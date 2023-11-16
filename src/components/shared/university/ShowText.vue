<template>
    <article id="showText" class="create" v-if="showPage">
        <h3 class="text-center mb-3">
            {{ text.subject }}
        </h3>
        <div class="form-group">
            <textarea name="text" ref="text" class="form-control" v-model="text.text"
                v-on:keypress.enter="update(text.id, text.text.trim())"></textarea>
        </div>
        <button class="btn btn-outline-secondary" v-on:click="update(text.id, text.text)">بروزرسانی</button>
        <err v-if="showErr" :message="message"></err>
    </article>
</template>

<script>
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    data() {
        return {
            text: {},
            showErr: false,
            showPage: false,
            semester: {},
            message: ""
        }
    },
    beforeCreate() {
        this.$store.state.showUniversity = false;
        this.$store.state.pageLoader = true;
    },
    created() {
        this.getText();
    },
    methods: {
        getText() {
            this.$http.post("Semester/Texts/findOne", { id: this.$route.params.id, token: localStorage.getItem('token') })
                .then((response) => {
                    this.showErr = false;
                    this.showPage = true;
                    this.$store.state.showUniversity = true;
                    this.$store.state.pageLoader = false;
                    this.text = response.data.text;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                    this.$store.state.showUniversity = true;
                    this.$router.push({ name: "university" }).catch(() => { });
                })
        },
        update(id, text) {
            this.$http.put("Semester/Texts/update", { token: localStorage.getItem('token'), id, text: text.trim() })
                .then(response => {
                    this.showErr = false;
                    this.$toast.success(response.data.message);
                    this.$router.push({ name: "universityTexts", params: { id: this.$route.params.id } }).catch(() => { });
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                    this.$refs.text.focus();
                })
        }
    },
}
</script>