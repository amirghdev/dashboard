<template>
    <article id="createIncome" class="create">
        <h3 class="text-center mb-3">
            ساخت درامد جدید
        </h3>
        <form @submit.prevent="createIncome">
            <div class="form-group">
                <input type="text" name="subject" class="form-control" placeholder="عنوان درامد را وارد کنید" ref="subject">
            </div>
            <div class="form-group">
                <input type="tel" placeholder="قیمت را به تومان وارد کنید" name="price" class="form-control" ref="price">
            </div>
            <div class="form-group text-dark">
                <date-picker v-model="date" format="jYYYY/jMM/jDD" />
            </div>
            <button class="btn btn-outline-secondary" type="submit">ساخت</button>
        </form>
        <err v-if="showErr" :message="message"></err>
    </article>
</template>

<script>
export default {
    data() {
        return {
            showErr: false,
            date: "",
            message: "",
            day: 0,
            month: 0,
            year: 0
        }
    },
    mounted() {
        this.$refs.subject.focus();
    },
    watch: {
        date() {
            let newDay = this.date.split("/")[2];
            let newMonth = this.date.split("/")[1];
            let newYear = this.date.split("/")[0];
            if (newDay.startsWith("0")) {
                newDay = newDay.substring(1, 2);
            }
            this.day = newDay;
            this.month = newMonth;
            this.year = newYear;
        }
    },
    methods: {
        createIncome() {
            const subject = this.$refs.subject.value;
            const price = this.$refs.price.value;
            this.$http.post("financial/createFinancial", { day: this.day, month: this.month, year: this.year, token: localStorage.getItem("token"), subject, price, type: "income" })
                .then(response => {
                    this.showErr = false;
                    this.$toast.success(response.data.message);
                    this.$router.push({ name: "financial" }).catch(() => { });
                }).catch((err) => {
                    this.showErr = true;
                    this.message = err.response.data.message;
                })
        }

    },
}
</script>
