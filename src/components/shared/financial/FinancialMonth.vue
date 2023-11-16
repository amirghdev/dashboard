<template>
    <article class="choseMonth">
        <todos v-model="month" type="month" format="jYYYY/jM/jDD" :display-format="monthChanger(currentMonth)" />
        <div class="create my-4 text-right" v-show="showPage">
            <h5 class="text-info">
                هزینه های این ماه : <span class="text-danger">{{ (financialTotal == null || financialTotal == 0) ? 0 :
                    splitNumber(financialTotal) }}</span>
            </h5>
            <h5 class="text-info">
                درامد های این ماه : <span class="text-danger">{{ (incomeTotal == null || incomeTotal == 0) ? 0 :
                    splitNumber(incomeTotal) }}</span>
            </h5>
        </div>
        <div v-show="showPage" class="row">
            <div class="financial col-lg-6" ref="parent">
                <h4 class="text-info text-center mt-3">
                    هزینه ها
                </h4>
                <div class="items" v-show="showFinancialItems">
                    <div class="item" v-for="item in financialItems" :key="item.id" :data-status="item.is_done"
                        :data-id="item.id">
                        <div class="item-text">
                            <p class="mb-0" :data-id="item.id">
                                <span class="text-warning">{{ changeDate(item.date) }}</span> <span :data-id="item.id">{{
                                    item.subject }}</span> : (<span class="text-danger"> {{ splitNumber(item.price) }}
                                </span>)
                            </p>
                        </div>
                    </div>
                </div>
                <div class="alert alert-danger mt-3" v-show="showFinancialErr">
                    <p class="text-danger mt-3 text-right" ref="err"></p>
                </div>
            </div>
            <div class="financial col-lg-6" ref="parent">
                <h4 class="text-info text-center mt-3">
                    درامد ها
                </h4>
                <div class="items" v-show="showIncomeItems">
                    <div class="item" v-for="item in incomeItems" :key="item.id" :data-status="item.is_done"
                        :data-id="item.id">
                        <div class="item-text">
                            <p class="mb-0" :data-id="item.id">
                                <span class="text-warning">{{ changeDate(item.date) }}</span> <span :data-id="item.id">{{
                                    item.subject }}</span> : (<span class="text-danger"> {{ splitNumber(item.price) }}
                                </span>)
                            </p>
                        </div>
                    </div>
                </div>
                <div class="alert alert-danger mt-3" v-show="showIncomeErr">
                    <p class="text-danger mt-3 text-right" ref="err2"></p>
                </div>
            </div>
        </div>

    </article>
</template>

<script>
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    data() {
        return {
            month: "",
            currentMonth: Number,
            showFinancialErr: false,
            financialItems: [],
            incomeItems: [],
            financialTotal: "",
            incomeTotal: "",
            showPage: false,
            showIncomeErr: false,
            showIncomeItems: false,
            showFinancialItems: false
        }
    },
    watch: {
        month() {
            this.currentMonth = Number(this.month.split("/")[1]);
            this.getFinancial();
            this.getIncome();
            this.getFinancialSum();
            this.getIncomeSum();
        }
    },
    methods: {
        monthChanger(month) {
            return mixing.methods.monthChanger(month);
        },
        getFinancial() {
            // get all items from this month
            this.$http.get(`financial/financial.php?username=${this.$store.state.currentUser}&og=financial&month=${this.currentMonth}&action=select&type=` + "all")
                .then(response => {
                    this.showPage = true;
                    if (response.data.status == 1) {
                        this.financialItems = response.data.data;
                        this.showFinancialErr = false;
                        this.showFinancialItems = true;
                    }
                    else {
                        this.showFinancialItems = false;
                        this.showFinancialErr = true;
                        this.$refs.err.textContent = response.data.response;
                    }
                })
        },
        getIncome() {
            // get all income items for this month
            this.$http.get(`financial/financial.php?username=${this.$store.state.currentUser}&og=income&month=${this.currentMonth}&action=select&type=` + "all")
                .then(response => {
                    this.showPage = true;
                    if (response.data.status == 1) {
                        this.showIncomeItems = true;
                        this.incomeItems = response.data.data;
                        this.showIncomeErr = false;
                    }
                    else {
                        this.showIncomeItems = false;
                        this.showIncomeErr = true;
                        this.$refs.err2.textContent = response.data.response;
                    }
                })
        },
        changeDate(timestamp) {
            const date = new Date(Number(timestamp)).toLocaleDateString("fa-Ir");
            return date;
        },
        getFinancialSum() {
            // get sum from this month
            this.$http.get(`financial/financial.php?username=${this.$store.state.currentUser}&og=financial&month=${this.currentMonth}&action=select&type=` + "sum")
                .then(response => {
                    if (response.data.status == 1) {
                        this.financialTotal = response.data.data.total;
                    }
                })
        },
        getIncomeSum() {
            // get sum from this month
            this.$http.get(`financial/financial.php?username=${this.$store.state.currentUser}&og=income&month=${this.currentMonth}&action=select&type=` + "sum")
                .then(response => {
                    if (response.data.status == 1) {
                        this.incomeTotal = response.data.data.total;
                    }
                })
        },
        splitNumber(number) {
            return mixing.methods.splitNumber(number);
        }
    },
}
</script>

<style scoped>
.item {
    width: 100%;
}

.item-text {
    width: 100%;
    text-align: right;
}
</style>