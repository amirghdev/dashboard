<template>
    <div class="usersList text-right" v-show="showPage">
        <h3 class="text-center text-dark">
            فعال سازی کاربران
        </h3>
        <table class="table table-striped bg-light" v-show="showUsers">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">نام کاربری</th>
                    <th scope="col">نام کاربر</th>
                    <th scope="col">عملیات</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <th scope="row">{{ ++index }}</th>
                    <td>{{ user.username }}</td>
                    <td>{{ `${user.first_name} ${user.last_name}` }}</td>
                    <td>
                        <a class="text-danger" :data-id="user.id" v-on:click="activeUser">فعال کن</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="text-danger mt-3" v-show="showErr" ref="err"></p>
        <!-- toast sections -->
        <div class="info" ref="activeUser">
            <p class="text-success mb-0">
                کاربر مورد نظر تایید شد
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showErr: false,
            users: [],
            showUsers: false,
            showPage: false,
        }
    },
    created() {
        this.getItem();
    },
    methods: {
        getItem() {
            // get all users for table
            this.$http.get(`users/users.php?action=select&type=notactive`)
                .then(response => {
                    this.showPage = true;
                    if (response.data.status == 1) {
                        this.showErr = false;
                        this.users = response.data.data;
                        this.showUsers = true;
                    }
                    // if there is no user
                    else {
                        this.showUsers = false;
                        this.showErr = true;
                        this.$refs.err.textContent = response.data.response;
                    }
                })
        },
        activeUser(e) {
            const id = e.target.getAttribute("data-id");
            this.$http.get(`users/users.php?action=active&id=${id}`)
                .then(response => {
                    if (response.data.status == 1) {
                        location.reload();
                    }
                    else {
                        this.showErr = true;
                        this.$refs.err.textContent = response.data.response;
                    }
                })
        }
    },
}
</script>

<style scoped>
a:hover {
    cursor: pointer;
}
</style>

