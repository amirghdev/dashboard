<template>
    <article id="exam" class="create" v-show="$store.state.showExam">
        <transition appear enter-active-class="animate__animated animate__fadeIn" mode="out-in">
            <router-view></router-view>
        </transition>
    </article>
</template>

<script>
export default {
    created() {
        this.validate();
    },
    methods: {
        validate() {
            if (this.$store.state.user.university == false) {
                this.$store.state.showExam = false;
                this.$toast.error("لطفا ابتدا بخش دانشگاه را فعال کنید", { timeout: 3000 });
                this.$router.push({ name: "ActiveUniversity" });
            } else {
                this.$store.state.showExam = true;
            }
        },

    }
}
</script>
