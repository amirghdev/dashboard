<template>
    <article id="text" class="create" v-if="showPage">
        <h3 class="text-center">نوشته ها</h3>
        <div class="text-container d-flex flex-wrap">
            <div class="pickDate text-dark col-lg-3 col-12">
                <date-picker v-model="date" type="year-month" />
            </div>
            <div class="month-text col-lg-9 col-12 px-0">
                <h5>
                    نوشته های <span>{{ `${monthChanger(month)} ماه سال ${year}` }}</span>
                </h5>
                <text-item :texts="texts" v-on:getItems="getItems" v-if="showText"></text-item>
                <err :message="`شما برای ${monthChanger($store.state.textMonth)} سال ${this.$store.state.textYear} نوشته ای وارد نکرده اید`"
                    v-else>
                </err>
                <button class="btn btn-outline-secondary mt-2">
                    <router-link :to="{ name: 'createText' }" tag="a">ساخت</router-link>
                </button>
            </div>
        </div>
        <err :message="message" v-if="showError"></err>
    </article>
</template>

<script>
import TextItem from './TextItem.vue';
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    components: {
        "text-item": TextItem
    },
    data() {
        return {
            texts: [],
            items: Array,
            showError: false,
            showText: false,
            showPage: false,
            date: "",
            message: "",
            month: this.$store.state.textMonth,
            year: this.$store.state.textYear
        }
    },
    watch: {
        //* change store date then render a new textlist with new date
        date() {
            let newMonth = this.date.split("/")[1];
            let newYear = this.date.split("/")[0];
            this.month = newMonth;
            this.year = newYear;
            this.$store.state.textMonth = newMonth;
            this.$store.state.textYear = newYear;
            this.getItems();
        },
    },
    beforeCreate() {
        this.$store.state.pageLoader = true;
    },
    created() {
        this.getItems();
    },
    methods: {
        getItems() {
            // get all texts from database
            this.$http.post("Texts/findAll", { token: localStorage.getItem("token"), year: this.year, month: this.month })
                .then(response => {
                    this.showPage = true;
                    this.$store.state.pageLoader = false;
                    this.showError = false;
                    this.texts = response.data.texts;
                    (response.data.texts.length > 0) ? this.showText = true : this.showText = false;
                }).catch((err) => {
                    this.showError = true;
                    this.message = err.response.data.message;
                })
        },
    },
}
</script>
