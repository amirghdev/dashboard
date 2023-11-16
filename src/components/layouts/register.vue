<template>
    <section class="register" v-if="showPage">
        <div class="container text-dark create">
            <form class="p-3 text-right" action="#" method="POST" v-on:submit.prevent="register">
                <h3 class="text-center text-info">فرم ثبت نام</h3>
                <div class="form-group">
                    <label for="username">نام کاربری</label>
                    <input type="text" placeholder="نام کاربری خود را وارد کنید" name="username" class="form-control"
                        ref="username">
                </div>
                <div class="form-group">
                    <label for="username">پسورد</label>
                    <input type="password" placeholder="پسورد خود را وارد کنید" name="username" class="form-control"
                        ref="password">
                </div>
                <div class="form-group">
                    <label for="username">ایمیل</label>
                    <input type="email" placeholder="ایمیل خود را وارد کنید" name="email" class="form-control" ref="email">
                </div>
                <div class="form-group">
                    <label for="first_name">نام شما</label>
                    <input type="text" placeholder="نام خود را وارد کنید" name="first_name" class="form-control"
                        ref="first_name">
                </div>
                <div class="form-group">
                    <label for="last_name">نام خانوادگی شما</label>
                    <input type="text" placeholder="نام خانوادگی خود را وارد کنید" name="last_name" class="form-control"
                        ref="last_name">
                </div>
                <p class="text-info">
                    لطفا اکانت خود را توسط ایمیل ارسال شده تایید کنید
                </p>
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-success">ثبت نام کن</button>
                    <router-link :to="{ name: 'login' }">وارد شوید</router-link>
                </div>
                <!-- response section -->
                <p class="text-success text-right mt-3" v-show="showSuccess" ref="success"></p>
                <!-- response section -->
            </form>
            <err v-if="showErr" :message="errMessage"></err>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            errors: [],
            showErr: false,
            showSuccess: false,
            errMessage: String,
            showPage: false
        }
    },
    created() {
        // if user already login redirect to app
        if (localStorage.getItem("token")) {
            this.$router.push({ name: "home" });
            this.showPage = false;
            this.$toast.warning("شما از قبل وارد شده اید");
        }
        else {
            this.showPage = true;
        }
    },
    mounted() {
        this.$refs.username.focus();
    },
    methods: {
        register() {
            const username = this.$refs.username.value;
            const password = this.$refs.password.value;
            const firstName = this.$refs.first_name.value;
            const lastName = this.$refs.last_name.value;
            const email = this.$refs.email.value;
            // add a wait section
            const data = {
                username,
                password,
                firstName,
                lastName,
                email,
                theme: localStorage.getItem("theme")
            }
            // send data to back
            this.$http.post("register", data)
                .then(response => {
                    this.showErr = false;
                    this.$toast.success("ثبت نام شما انجام شد لطفا اکانت خود را توسط ایمیل ارسال شده تایید کنید", { timeout: 10000 })
                    this.$router.push({ name: "login" })
                }).catch((error) => {
                    if (error.response) {
                        this.showErr = true;
                        this.errMessage = error.response.data.message;
                        this.showSuccess = false;
                    }
                })
        }
    },
};
</script>

<style scoped>
.register {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

form {
    position: relative;
}

label {
    color: var(--dark);
}
</style>