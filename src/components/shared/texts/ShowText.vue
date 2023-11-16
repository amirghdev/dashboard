<template>
    <article id="showText" class="create" v-if="showPage">
        <h3 class="text-center">
            {{ text.subject }}
        </h3>
        <div class="form-group mt-2">
            <textarea name="text" ref="text" class="form-control" v-model="text.text"
                v-on:keypress.enter="update(text.id)"></textarea>
        </div>
        <button class="btn btn-outline-secondary" v-on:click="update(text.id)">بروزرسانی</button>
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
            message: String
        }
    },
    beforeCreate() {
        this.$store.state.pageLoader = true;
    },
    created() {
        this.validate();
    },
    methods: {
        validate() {
            //check if text id exist in database
            this.$http.post("Texts/findOne", { id: this.$route.params.id, token: localStorage.getItem("token") })
                .then(response => {
                    this.text = response.data.text;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                    this.$router.push({ name: "texts" });
                })
            this.$store.state.pageLoader = false;
            this.showPage = true;
        },
        update(id) {
            const text = this.$refs.text.value;
            this.$http.put("Texts/update", { id, text, token: localStorage.getItem("token") })
                .then(() => {
                    this.showErr = false;
                    this.$toast.success(`${this.text.subject} بروزرسانی شد`);
                    this.$router.push({ name: "texts" }).catch(() => { });
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                })

        }
    },
}
</script>