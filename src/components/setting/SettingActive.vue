<template>
    <div class="settingActive mt-3">
        <h3>
            فعال سازی
        </h3>
        <div class="activeUniversity text-right">
            <h5>
                دانشگاه
            </h5>
            <p>
                برای فعال سازی بخش دانشگاه باید اول شماره ترم در حال حاضر خود را وارد کنید .
            </p>
            <p>
                توجه : لطفا در پایان ترم شماره ترم خود را <span class="text-danger">بروز</span> کنید .
            </p>
            <p>
                شماره ترم ثبت شده : <span class="text-danger" ref="unit">{{ ($store.state.user.unit == null) ? "وارد نشده است" :
                $store.state.user.unit }}</span>
            </p>
            <div class="active row">
                <div class="col-md-8 mt-2">
                    <input type="number" ref="unit" v-on:keypress.enter="active" class="form-control"
                        placeholder="لطفا شماره ترم خود را وارد کنید">
                </div>
                <div class="col-md-2 mt-2" v-show="showActive" v-on:click="active">
                    <button class="btn btn-success">فعال کنید</button>
                </div>
                <div class="col-md-2 mt-2" v-show="showChange" v-on:click="change">
                    <button class="btn btn-warning">عوض کنید</button>
                </div>
                <div class="col-12">
                    <p class="text-danger mt-3" ref="err" v-show="showErr"></p>
                </div>
            </div>
        </div>
        <div class="activeProgramming">

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showActive: false,
            showChange: false,
            unit: 0,
            showErr: false,
            showUnit: false,
            errors: [],
        }
    },
    created() {
        setTimeout(() => {
            if (this.$store.state.user.unit == null) {
                this.showActive = true;
            }
            else {
                this.showChange = true;
            }
        }, 300);
    },
    mounted() {

    },
    methods: {
        active() {
            this.errors = [];
            const unit = this.$refs.unit.value;
            if (unit == "") {
                this.errors.push("شماره ترم نمیتواند خالی باشد");
            }
            else if (unit < 1) {
                this.errors.push("شماره ترم نمیتواند کوچک تر از 1 باشد");
            }
            else if(unit == this.$refs.unit)
            {
                
            }
            if (this.errors.length > 0) {
                this.showErr = true;
                this.$refs.err.textContent = this.errors.join(" , ");
            }
            else {
                this.showErr = false;
                this.$http.get(`setting/active.php?username=${this.$store.state.currentUser}&id=${this.$store.state.user.id}&unit=${unit}&type=university&select=active`)
                    .then(response => {
                        if (response.data.status == 1) {
                            this.showErr = false;
                            sessionStorage.setItem("unit" , unit);
                            location.reload();
                        }
                        else {
                            this.showErr = true;
                            this.$refs.err.textContent = response.data.response;
                        }
                    })
            }
        },
        change() {
            this.errors = [];
            const unit = this.$refs.unit.value;
            if (unit == "") {
                this.errors.push("شماره ترم نمیتواند خالی باشد");
            }
            else if (unit < 1) {
                this.errors.push("شماره ترم نمیتواند کوچک تر از 1 باشد");
            }
            else if(unit == this.$store.state.user.unit)
            {
                this.errors.push("شماره ترم جدید نمیتواند با قبلی برابر باشد");
            }
            if (this.errors.length > 0) {
                this.showErr = true;
                this.$refs.err.textContent = this.errors.join(" , ");
            }
            else {
                this.showErr = false;
                this.$http.get(`setting/active.php?username=${this.$store.state.currentUser}&id=${this.$store.state.user.id}&unit=${unit}&type=university&select=change`)
                    .then(response => {
                        if (response.data.status == 1) {
                            this.showErr = false;
                            sessionStorage.setItem("unit" , unit);
                            location.reload();
                        }
                        else {
                            this.showErr = true;
                            this.$refs.err.textContent = response.data.response;
                        }
                    })
            }

        }
    },
}
</script>

