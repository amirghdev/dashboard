<template>
    <article id="financial" class="create" v-if="showPage">
        <h3 class="text-center">
            مدیریت مالی
        </h3>
        <div class="financial-container d-flex flex-wrap">
            <div class="pickDate text-dark col-lg-3 col-12">
                <date-picker v-model="date" format="jYYYY/jMM/jDD" type="year-month" />
            </div>
            <div class="financial col-lg-9 col-12 px-0">
                <h5>
                    {{ `لیست درامد ها و هزینه های ${monthChanger(month)} ماه سال ${year}` }}
                </h5>
                <div class="financials mb-4">
                    <h5>
                        هزینه ها
                    </h5>
                    <h6>
                        کل هزینه ها : {{ (totalFinancial != null) ? totalFinancial : 0 }}
                    </h6>
                    <item :items="financialItems" :month="monthFinancial" @getItems="getItems" v-if="showFinancial"></item>
                    <err v-else :message="`برای تاریخ ${monthChanger(month)} ماه ${year} هزینه ای وارد نشده است`"></err>
                </div>
                <div class="incomes">
                    <h5>
                        درامد ها
                    </h5>
                    <h6>
                        <h6>
                            کل درامد ها : {{ (totalIncome != null) ? totalIncome : 0 }}
                        </h6>
                    </h6>
                    <item :items="incomeItems" :month="monthIncome" @getItems="getItems" v-if="showIncome"></item>
                    <err v-else :message="`برای تاریخ ${monthChanger(month)} ماه ${year} درامدی وارد نشده است`"></err>
                </div>
                <button class="btn btn-outline-secondary mt-3 mr-2">
                    <router-link :to="{ name: 'createFinancial', query: { 'type': 'income' } }">درامد</router-link>
                </button>
                <button class="btn btn-outline-secondary mt-3">
                    <router-link :to="{ name: 'createFinancial', query: { 'type': 'financial' } }">هزینه</router-link>
                </button>
            </div>
        </div>
    </article>
</template>

<script>
import mixings from "../../../mixing";
import financialItem from "./FinancialItem.vue";
export default {
    mixins: [mixings],
    components: {
        "item": financialItem
    },
    data() {
        return {
            financialItems: [],
            incomeItems: [],
            total: "",
            showErr: false,
            showPage: false,
            message: "",
            month: this.$store.state.financialMonth,
            year: this.$store.state.financialYear,
            date: "",
            showFinancial: false,
            showIncome: false,
            monthFinancial: 0,
            monthIncome: 0,
            totalFinancial: 0,
            totalIncome: 0
        }
    },
    watch: {
        date() {
            let newMonth = this.date.split("/")[1];
            let newYear = this.date.split("/")[0];
            this.$store.state.financialMonth = newMonth;
            this.$store.state.financialYear = newYear;
            this.month = newMonth;
            this.year = newYear;
            this.getItems();
        }
    },
    beforeCreate() {
        this.$store.state.pageLoader = true;
    },
    created() {
        this.getItems();
    },
    methods: {
        getItems() {
            // get all items for this month
            this.showPage = false;
            this.$store.state.pageLoader = true;
            this.$http.post("Financial/findAllFinancial", { year: this.year, month: this.month, token: localStorage.getItem("token") })
                .then(response => {
                    this.$store.state.pageLoader = false;
                    this.showPage = true;
                    this.showErr = false;
                    this.financialItems = response.data.financialItems;
                    this.incomeItems = response.data.incomeItems;
                    this.monthFinancial = response.data.monthFinancial;
                    this.monthIncome = response.data.monthIncome;
                    this.totalFinancial = response.data.totalFinancial;
                    this.totalIncome = response.data.totalIncome;
                    (response.data.financialItems.length > 0) ? this.showFinancial = true : this.showFinancial = false;
                    (response.data.incomeItems.length > 0) ? this.showIncome = true : this.showIncome = false;
                }).catch((err) => {
                    console.log(err);
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
        },
        deleteFinancial(id) {
            // get all we need
            const deletedDiv = document.querySelector(`.financial .item[data-id="${id}"]`);
            const parent = deletedDiv.parentNode;
            const span = document.querySelector(`.financial span[data-id="${id}"]`);
            // remove from database
            this.$http.get(`financial/financial.php?username=${this.$store.state.currentUser}&og=financial&id=${id}&action=delete`)
                .then(response => {
                    // remove from dom
                    if (response.data.status == 1) {
                        deletedDiv.classList.add("opacity-0");
                        this.$vToastify.error("حذف شد", span.textContent);
                        setTimeout(() => {
                            parent.removeChild(deletedDiv);
                            this.getFinancial();
                            // get total again
                            this.getSum();
                        }, 300);
                    }
                })
        },
        deleteIncome(id) {
            // get all we need
            const deletedDiv = document.querySelector(`.income .item[data-id="${id}"]`);
            const parent = deletedDiv.parentNode;
            const span = document.querySelector(`.income span[data-id="${id}"]`);
            // remove from database
            this.$http.get(`financial/financial.php?username=${this.$store.state.currentUser}&og=income&id=${id}&action=delete`)
                .then(response => {
                    // remove from dom

                    if (response.data.status == 1) {
                        deletedDiv.classList.add("opacity-0");
                        this.$vToastify.error("حذف شد", span.textContent);
                        setTimeout(() => {
                            parent.removeChild(deletedDiv);
                            this.getIncome();
                            // get financial again
                            this.getTotoal();
                        }, 300);
                    }
                })
        },
        changeDate(timestamp) {
            const date = new Date(Number(timestamp)).toLocaleDateString("fa-Ir");
            return date;
        },
        splitNumber(number) {
            return mixings.methods.splitNumber(number);
        }
    },
}
</script>

<style scoped>
/* .item {
    width: 100%;
}

.item-text {
    width: 90%;
    text-align: right;
}

.item-control {
    width: 10%;
    text-align: left;
} */

.vpd-input-group input {
    border-radius: 0;
}

@media (max-width: 992px) {
    .pickDate {
        margin-bottom: 25px;
    }
}
</style>