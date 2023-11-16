<template>
    <section class="login" v-show="showPage">
        <div class="container create">
            <form method="POST" v-on:submit.prevent="login" class="p-3">
                <h3 class="text-info text-center">فرم ورود</h3>
                <div class="form-group">
                    <label for="username" class="text-left">نام کاربری</label>
                    <input type="text" placeholder="نام کاربری خود را وارد کنید" name="username" class="form-control"
                        ref="username" autofocus>
                </div>
                <div class="form-group">
                    <label for="username" class="text-left">پسورد</label>
                    <input type="password" placeholder="پسورد خود را وارد کنید" name="username" class="form-control"
                        ref="password">
                </div>
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-success">وارد شوید</button>
                    <router-link :to="{ name: 'register' }">ثبت نام کنید</router-link>
                </div>
                <p class="mt-3">
                    <router-link :to="{ name: 'forgot' }">
                        رمز عبور خود را فراموش کردید ؟
                    </router-link>
                </p>
            </form>
            <err :message="errMessage" v-if="showErr"></err>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            showErr: false,
            errMessage: String,
            showPage: false
        }
    },
    created() {
        this.$store.state.pageLoader = false;
        // if user already login redirect to app
        if (localStorage.getItem("token")) {
            this.$router.push({ name: "home" });
            this.showPage = false;
            // this.$toast("شما از قبل وارد شده اید", {
            //     type: "warning",
            //     timeout: 2000
            // })
        }
        else {
            this.showPage = true;
        }
    },
    methods: {
        login() {
            const username = this.$refs.username.value;
            const password = this.$refs.password.value;
            const data = {
                username,
                password
            }
            this.$http.post("login", data).then((response) => {
                // set session and login
                this.showErr = false;
                localStorage.setItem("token", response.data.token);
                // localStorage.setItem("theme", response.data.theme);
                this.$toast.success("سلام خوش آمدی", {
                    icon: {
                        iconClass: "fas fa-smile-wink"
                    }
                })
                this.$router.push({ name: "home" })
            }).catch((error) => {
                if (error.response) {
                    this.showErr = true;
                    this.errMessage = error.response.data.message;
                }
            })
        },

    }
};
</script>

<style scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

form {
    position: relative;
}
</style>