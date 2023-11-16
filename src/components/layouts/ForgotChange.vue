<template>
    <article class="container">
        <div class="create w-100 p-5 text-right">
            <div v-if="valid">
                <div class="form-group">
                    <h5> پسورد </h5>
                    <input type="password" placeholder="پسورد جدید خود را وارد کنید" class="form-control mt-2"
                        v-on:keypress.enter="update" ref="password" name="password">
                </div>
                <button class="btn btn-success" v-on:click="update">عوض کن</button>
            </div>
            <err v-if="showErr" :message="message"></err>
        </div>
    </article>
</template>

<script>
export default {
    data() {
        return {
            id: Number,
            showErr: false,
            message: "",
            showSuccess: false,
            valid: false
        }
    },
    created() {
        this.getUser();
    },
    updated() {
        this.$refs.password.focus();
    },
    methods: {
        getUser() {
            this.$http.post("getUserData", { token: this.$route.params.token })
                .then(response => {
                    this.id = response.data.id;
                    this.valid = true;
                }).catch((err) => {
                    if (err.response) {
                        this.showErr = true;
                        this.showSuccess = false;
                        this.message = err.response.data.message;
                    }
                })
        },
        update() {
            const password = this.$refs.password.value;
            this.showErr = false;
            this.$http.post("reset-password", { id: this.id, password })
                .then(() => {
                    this.showErr = false;
                    this.showSuccess = true;
                    this.$toast.success("رمز عبور شما با موفقیت بروزرسانی شد");
                    setTimeout(() => {
                        this.$router.push("/");
                    }, 2000);
                }).catch((err) => {
                    if (err.response) {
                        console.log(err.response);
                        this.showErr = true;
                        this.showSuccess = false;
                        this.message = err.response.data.message;
                    }
                })
        }
    }
}
</script>

<style scoped>
article {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

p {
    font-size: 16px;
    margin-bottom: 0;
    line-height: 40px;
}
</style>