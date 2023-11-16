<template>
    <div class="adminResponse text-right" v-show="showPage">
        <h3 class="text-dark text-center">
            پشتیبانی
        </h3>
        <table class="table table-striped bg-light" v-show="showContact">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">نام کاربری</th>
                    <th scope="col">موضوع</th>
                    <th scope="col">وضعیت</th>
                    <th scope="col">عملیات</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(contact, index) in contacts" :key="contact.id">
                    <th scope="row">{{ ++index }}</th>
                    <td>{{ contact.username }}</td>
                    <td>{{ contact.subject }}</td>
                    <td>{{ (contact.response == null) ? "پاسخ داده نشده است" : "پاسخ داده شده است" }}</td>
                    <td>
                        <router-link :to="`/Home/Admin/Response/${contact.id}`">
                            مشاهده
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="mt-3 text-danger" ref="err" v-show="showErr"></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showErr: false,
            contacts: [],
            showContact: false,
            showPage : false
        }
    },
    created() {
        // get all contacts
        this.$http.get(`contacts/contact.php?action=select&type=admin&username=${this.$store.state.currentUser}`)
            .then(response => {
                this.showPage = true;
                if (response.data.status == 1) {
                    this.showErr = false;
                    this.contacts = response.data.data;
                    this.showContact = true;
                }
                else {
                    this.showContact = false;
                    this.showErr = true;
                    this.$refs.err.textContent = response.data.response;
                }
            })
    },
}
</script>

<style></style>