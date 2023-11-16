<template>
    <article class="container text-right">
        <div class="create w-100">
            <div v-if="showSuccess == false">
                <h3 class="text-center">
                    فراموشی رمز عبور
                </h3>
                <div class="form-group">
                    <h6>
                        ایمیل
                    </h6>
                    <input type="email" class="form-control" placeholder="لطفا ایمیل خود را وارد کنید" name="email"
                        ref="email" v-on:keypress.enter="send">
                    <p class="mt-3">ارسال ایمیل ممکن است کمی طول بکشد</p>
                    <button class="btn btn-success mt-3" v-on:click="send">ارسال</button>
                </div>
                <err v-if="showErr" :message="message"></err>
            </div>
            <p v-if="showSuccess" class="text-center text-success">
                ایمیل به زودی برای شما ارسال خواهد شد
            </p>
        </div>
    </article>
</template>

<script>
export default {
    data() {
        return {
            showErr: false,
            message: "",
            showSuccess: false
        }
    },
    created() {
        if (localStorage.getItem("token")) {
            this.$router.push("/");
        }
    },
    methods: {
        send() {
            const email = this.$refs.email.value;
            this.$http.post("forgot-password", { email })
                .then(() => {
                    this.showErr = false;
                    this.showSuccess = true;
                }).catch((err) => {
                    if (err.response) {
                        this.message = err.response.data.message;
                        this.showSuccess = false;
                        this.showErr = true;
                    }
                })
        }
    },
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
    font-size: 17px;
    margin-bottom: 0;
}
</style>