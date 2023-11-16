<template>
    <article class="container" v-if="showPage">
        <div class="create w-100 text-right">
            <err v-if="showErr" :message="message"></err>
            <div v-else>
                <p class="text-center">
                    اکانت شما تایید شد
                </p>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    data() {
        return {
            showErr: false,
            showPage: false,
            message: ""
        }
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            this.$http.post(`active-user`, { token: this.$route.params.token })
                .then(response => {
                    this.showErr = false;
                    if (response.status == 200) {
                        this.$toast.success(response.data.message);
                        localStorage.setItem("token", response.data.token);
                        this.$router.push("/").catch(() => { });
                    }
                }).catch((err) => {
                    if (err.response) {
                        this.showPage = true;
                        this.showErr = true;
                        this.message = err.response.data.message;
                    }
                })
        },
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
    font-size: 20px;
    margin-bottom: 0;
    line-height: 40px;
}
</style>