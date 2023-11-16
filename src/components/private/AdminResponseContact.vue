<template>
    <div class="adminResponseContact text-right text-dark">
        <h3 class="text-center">
            پیام شماره {{ contact.id }}
        </h3>
        <h5>
            موضوع پیام
        </h5>
        <p>
            {{ contact.subject }}
        </p>
        <h5>
            متن پیام
        </h5>
        <p>
            {{ contact.text }}
        </p>
        <h5>
            جواب
        </h5>
        <p v-if="(contact.response != null)">
            {{ contact.response }}
        </p>
        <div v-else>
            <input type="text" class="form-control" ref="response" placeholder="جواب خود را وارد کنید"
                v-on:keypress.enter="response">
            <button class="btn btn-success mt-2" v-on:click="response">ثبت</button>
        </div>
        <p class="text-danger mt-3" ref="err" v-show="showErr"></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showErr: false,
            contact: {},
            errors: []
        }
    },
    created() {
        // check if contact exist
        this.$http.get(`contacts/contact.php?action=select&type=checkContact&id=${this.$route.params.id}&username=${this.$store.state.currentUser}`)
            .then(response => {
                if (response.data.status == 0) {
                    this.$router.push("/Home/Admin/Response")
                }
                else {
                    this.contact = response.data.data;
                }
            })
    },
    methods: {
        response() {
            const response = this.$refs.response.value;
            if (response == "") {
                this.errors.push("متن جواب نمیتواند خالی باشد ");
            }
            if (this.errors.length > 0) {
                this.showErr = true;
                this.$refs.err.textContent = this.errors.join(' , ');
            }
            else {
                this.showErr = false;
                this.$http.get(`contacts/contact.php?action=response&type=firstResponse&username=${this.$store.state.currentUser}&id=${this.contact.id}&response=${response}`)
                    .then(response => {
                        if (response.data.status == 1) {
                            this.showErr = false;
                            this.$router.push("/Home/Admin/Response");
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

<style>

</style>