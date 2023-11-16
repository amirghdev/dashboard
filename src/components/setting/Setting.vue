<template>
    <!-- <article id="setting">
        <transition appear enter-active-class="animate__animated animate__fadeIn" mode="out-in">
            <router-view></router-view>
        </transition>
    </article> -->
    <section class="create">
        <h3 class="text-center">
            تنظیمات
        </h3>
        <university></university>
        <password></password>
        <profile></profile>
    </section>
</template>

<script>
import ActiveUniversity from './ActiveUniversity.vue';
import Password from './Password.vue';
import Profile from './profile.vue';
export default {
    components: {
        "university": ActiveUniversity,
        "password": Password,
        "profile": Profile
    }
}
</script>

<style scoped>
/* .setting {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(206, 206, 206, 0.8);
    color: #000;
    border-radius: 7px;
    padding: 15px;
    position: relative;
} */
</style>