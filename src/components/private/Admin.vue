<template>
    <article class="admin create">
        <transition appear enter-active-class="animate__animated animate__fadeIn" mode="out-in">
            <router-view></router-view>
        </transition>
        <admin-menu></admin-menu>
    </article>
</template>

<script>
import AdminMenu from './AdminMenu.vue';
export default {
    components: { AdminMenu },
    data() {
        return {
            showPage : false
        }
    },
    created() {
        this.validate();
    },
    methods: {
        validate() {
            const data = {
                username: sessionStorage.getItem("username"),
                password: sessionStorage.getItem("password")
            }
            this.$http.post(`auth/auth.php?action=check`, JSON.stringify(data))
                .then(response => {
                    this.showPage = true;
                    if (response.data.data.is_admin == 0) {
                        this.$vToastify.error("شما ادمین نیستید");
                        this.$router.push("/Home");
                    }
                })
        }
    },
}
</script>   

<style scoped>

.admin{
    height: 100%;
}

</style>