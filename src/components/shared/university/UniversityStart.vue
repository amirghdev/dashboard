<template>
    <div id="university-start" v-if="showPage">
        <h3 class="text-center">دانشگاه</h3>
        <div class="university-container">
            <university-item v-if="showSemester" :semesters="semesters" @getItems="getItems"></university-item>
            <err v-else :message="'شما هنوز ترمی وارد نکرده اید'"></err>
        </div>
        <button class="btn btn-outline-secondary mt-2">
            <router-link :to="{ name: 'createSemester' }" tag="a">ساخت</router-link>
        </button>
    </div>
</template>

<script>
import UniversityItem from './UniversityItem.vue';
export default {
    components: {
        "university-item": UniversityItem
    },
    data() {
        return {
            semesters: [],
            showErr: false,
            showSemester: false,
            showPage: false
        };
    },
    beforeCreate() {
        this.$store.state.pageLoader = true;
    },
    created() {
        this.getItems();
    },
    methods: {
        getItems() {
            // get all semesters
            this.$http.post("Semesters/findAll", { token: localStorage.getItem("token") })
                .then((response) => {
                    this.showPage = true;
                    this.$store.state.pageLoader = false;
                    this.semesters = response.data.semesters;
                    this.showErr = false;
                    (response.data.semesters.length > 0) ? this.showSemester = true : this.showSemester = false;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
    },
}
</script>

<style scoped></style>