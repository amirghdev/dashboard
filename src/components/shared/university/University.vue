<template>
    <article id="university" class="create" v-show="$store.state.showUniversity">
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
                this.$store.state.showUniversity = false;
                this.$toast.error("لطفا ابتدا بخش دانشگاه را فعال کنید");
                this.$router.push({ name: "setting" });
            } else {
                this.$store.state.showUniversity = true;
            }
        },
    },
};
</script>