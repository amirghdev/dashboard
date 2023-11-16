<template>
    <div class="settingContact text-right">
        <h3 class="text-center">
            ارتباط با من
        </h3>
        <div class="showContact" v-if="showContact">
            <div v-if="awnser">
                <h5>
                    موضوع پیام ارسال شده
                </h5>
                <p>
                    {{ contact.subject }}
                </p>
                <h5>
                    پیام ارسال شده
                </h5>
                <p>
                    {{ contact.text }}
                </p>
                <h5>
                    جواب ادمین
                </h5>
                <p>
                    {{ contact.response }}
                </p>
                <button class="btn btn-danger" v-on:click="closeContact(contact.id)">بستن</button>
            </div>
            <p v-else class="text-danger">
                پیام شما به مدیر ارسال شده است ، لطفا منتظر جواب بمانید .
            </p>
        </div>
        <div class="createContact" v-else>
            <p>
                لطفا فرم زیر را برای ارتباط با من پر کنید .
            </p>
            <div class="form-group">
                <input type="text" class="form-control" ref="subject" name="subject"
                    placeholder="لطفا موضوع خود را وارد کنید . " v-on:keypress.enter="createContact">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" ref="text" name="text" placeholder="لطفا متن خود را وارد کنید . "
                    v-on:keypress.enter="createContact">
            </div>
            <button class="btn btn-success" v-on:click="createContact">ارسال</button>
            <p class="text-danger mt-3" ref="err" v-show="showErr"></p>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            showContact: false,
            showErr: false,
            errors: [],
            contact: {},
            awnser: false
        }
    },
    created() {
        // check if user hase contact
        this.$http.get(`contacts/contact.php?username=${this.$store.state.currentUser}&type=user&action=select`)
            .then(response => {
                if (response.data.status == 1) {
                    this.showContact = true;
                    this.contact = response.data.data;
                    // check if there is a awnser
                    if (response.data.data.response == null) {
                        this.awnser = false;
                    }
                    else {
                        this.awnser = true;
                    }
                }
                else {
                    this.sendContact = false;
                }
            })
    },
    methods: {
        createContact() {
            const subject = this.$refs.subject.value;
            const text = this.$refs.text.value;
            this.errors = [];
            if (subject == "") {
                this.errors.push("موضوع نمیتواند خالی باشد ");
            }
            if (text == "") {
                this.errors.push("متن نمیتواند خالی باشد ");
            }
            if (this.errors.length > 0) {
                this.showErr = true;
                this.$refs.err.textContent = this.errors.join(" , ");
            }
            else {
                this.showErr = false;
                this.$http.get(`contacts/contact.php?username=${this.$store.state.currentUser}&subject=${subject}&text=${text}&action=create`)
                    .then(response => {
                        if (response.data.status == 1) {
                            this.$vToastify.success("پیام شما به مدیر ارسال شد" , " ");
                            this.showErr = false;
                            this.showContact = true;
                        }
                        else {
                            this.$refs.err.textContent = response.data.response;
                        }
                    })
            }
        },
        closeContact(id) {
            this.$http.get(`contacts/contact.php?username=${this.$store.state.currentUser}&id=${id}&action=change`)
                .then(response => {
                    if (response.data.status == 1) {
                        this.showContact = false;
                        this.$vToastify.warning("پیام شما بسته شد" , " ");
                    }
                })
        }
    },
}
</script>

