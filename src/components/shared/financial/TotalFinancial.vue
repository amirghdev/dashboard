<template>
    <article class="create text-dark text-right" v-show="showPage">
        <h3 class="text-center text-info">
            موجودی کل
        </h3>
        <h5>موجودی خود را بروز کنید</h5>
        <div class="form-group my-2">
            <input type="number" class="form-control my-3" placeholder="موجودی کل را به تومان وارد کنید ." ref="financial"
                name="financial" v-on:keypress.enter="update">
        </div>
        <button class="btn btn-success" v-on:click="update">ذخیره</button>
        <p class="text-danger mt-3" ref="err" v-show="showErr"></p>
    </article>
</template>

<script>
export default {
    data() {
        return {
            showErr: false,
            errors: [],
            showPage: false
        }
    },
    created() {
        this.checkFinancial();
    },
    mounted() {
        this.$refs.financial.focus();
    },
    methods: {
        checkFinancial() {
            if (sessionStorage.getItem("financial") != 0) {
                this.showPage = false;
                this.$router.push("/Home/Financial");
            } else {
                this.showPage = true;
            }
        },
        update() {
            this.errors = [];
            const financial = this.$refs.financial.value;
            if (financial == "") {
                this.errors.push("موجودی کل نمیتواند خالی باشد . ");
            }
            if (/^[0-9]*$/.test(financial) == false) {
                this.errors.push("لطفا موجودی کل را به عدد وارد کنید");
            }
            if (this.errors.length > 0) {
                this.showErr = true;
                this.$refs.err.textContent = this.errors.join(" , ");
            }
            else {
                this.showErr = false;
                this.$http.get(`financial/financial.php?username=${this.$store.state.currentUser}&og=financial&action=total&financial=${financial}`)
                    .then(response => {
                        if (response.data.status == 1) {
                            this.showErr = false;
                            this.$vToastify.success("بروز شد", "بودجه");
                            sessionStorage.setItem("financial", financial);
                            this.$router.push("/Home/Financial");
                        }
                        else {
                            this.showErr = true;
                            this.$refs.err.textContent = response.data.response;
                        }
                    })
            }
        }
    }
}
</script>

<style scoped></style>