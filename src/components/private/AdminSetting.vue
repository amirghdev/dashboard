<template>
    <div class="text-dark" v-show="showPage">
        <h3 class="text-center">
            تنظیمات
        </h3>
        <div class="version text-right">
            <div class="form-group">
                <h5>
                    ورژن داشبورد
                </h5>
                <input type="text" class="form-control my-3" v-model="info.text" ref="text" v-on:keypress.enter="update">
                <button class="btn btn-success" v-on:click="update">بروزرسانی</button>
            </div>
            <p class="text-danger mt-3" ref="err" v-show="showErr"></p>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            showPage: false,
            showErr: false,
            info: {},
            errors: []
        }
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            this.$http.get(`information.php?type=select`).then(response => {
                this.info = response.data.data;
                this.showPage = true;
            })
        },
        update() {
            const text = this.$refs.text.value.trim();
            if (text == "") {
                this.errors.push("نوشته نمیتواند خالی باشد");
            }
            if (this.errors.length > 0) {
                this.showErr = true;
                this.$refs.err.textContent = this.errors.join(" , ");
            }
            else {
                this.showErr = false;
                this.$http.get(`information.php?type=update&text=${text}`).then(response => {
                    
                    if (response.data.status == 1) {
                        this.showErr = false;
                        alert("ورژن داشبورد بروز شد");
                    } else {
                        this.showErr = true;
                        this.$refs.err.textContent = response.data.response;
                    }
                })
            }
        }
    },
}
</script>

<style scoped></style>