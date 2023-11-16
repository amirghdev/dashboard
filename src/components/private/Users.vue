<template>
    <div class="usersList text-right" v-show="showPage">
        <h3 class="text-center text-dark my-2">
            لیست کاربران برنامه
        </h3>
        <ve-table :columns="columns" :table-data="users" />
        <!-- <table class="table table-striped bg-light" v-show="showUsers">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">نام کاربری</th>
                    <th scope="col">نام کاربر</th>
                    <th scope="col">تاریخ ثبت نام</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <th scope="row">{{ ++index }}</th>
                    <td>{{ user.username }}</td>
                    <td>{{ `${user.first_name} ${user.last_name}` }}</td>
                    <td>{{ changeDate(user.register) }}</td>
                </tr>
            </tbody>
        </table> -->
        <!-- <h3 class="text-center text-dark my-3">
            کاربران آنلاین
        </h3>
        <table class="table table-striped bg-light" v-show="showOnline">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">نام کاربری</th>
                    <th scope="col">دسترسی</th>
                    <th scope="col">ساعت ورود</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in onlineUsers" :key="user.id">
                    <th scope="row">{{ ++index }}</th>
                    <td>{{ user.username }}</td>
                    <td>{{ (user.is_admin == 0) ? "کاربر" : "ادمین" }}</td>
                    <td>{{ timeChanger(user.login) }}</td>
                </tr>
            </tbody>
        </table> -->
        <p class="text-danger mt-3" v-show="showErr" ref="err"></p>
        <p class="text-danger mt-3" v-show="onlineErr" ref="err2"></p>
    </div>
</template>

<script>
import mixing from "../../mixing"
export default {
    mixins: [mixing],
    data() {
        return {
            showErr: false,
            users: [],
            showUsers: false,
            onlineUsers: [],
            showOnline: false,
            onlineErr: false,
            showPage: false,
            columns: [
                { field: "username", key: "u", title: "نام کاربری", align: "right" },
                { field: "fullname", key: "f", title: "نام", align: "right" },
                { field: "register", key: "b", title: "ثبت نام", align: "center" },
                { field: "how", key: "h", title: "نحوه آشنایی", align: "left", },
            ],
        }
    },
    created() {
        this.getUsers();
        this.getOnlineUsers();
    },
    methods: {
        getUsers() {
            // get all users for table
            this.$http.get(`users/users.php?action=select&type=users`)
                .then(response => {
                    this.showPage = true;
                    if (response.data.status == 1) {
                        this.showErr = false;
                        this.users = response.data.data;
                        this.showUsers = true;
                        this.addToUsers(response.data.data);
                    }
                    // if there is no user
                    else {
                        this.showUsers = false;
                        this.showErr = true;
                        this.$refs.err.textContent = response.data.response;
                    }
                })
        },
        getOnlineUsers() {
            // get all online users for table
            this.$http.get(`users/users.php?action=select&type=online`)
                .then(response => {
                    this.showPage = true;
                    if (response.data.status == 1) {
                        this.showOnline = true;
                        this.onlineErr = false;
                        this.onlineUsers = response.data.data;
                    }
                    // if there is no user
                    else {
                        this.showOnline = false;
                        this.onlineErr = true;
                        this.$refs.err2.textContent = response.data.response;
                    }
                })
        },
        addToUsers(users) {
            users.forEach((user) => {
                user.fullname = `${user.first_name} ${user.last_name}`;
                user.register = this.changeDate(user.register);
                (user.how == null || user.how == "") ? user.how = "وارد نشده است" : user.how;
            })
        },
        timeChanger(timestamp) {
            return mixing.methods.timeChanger(timestamp);
        },
        changeDate(timestamp) {
            const date = new Date(Number(timestamp)).toLocaleDateString("fa-Ir");
            return date;
        }
    },
}
</script>
