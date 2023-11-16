<template>
    <aside>
        <div class="general-status">
            <p class="m-0 date-desktop">
                تاریخ امروز : {{ `${$store.state.currentDate} ${monthChanger($store.state.currentMonth)}` }}
            </p>
            <div class="date-mobile w-100">
                <i class="fas fa-smile"></i>
            </div>
        </div>
        <ul>
            <li class="list-item">
                <router-link to="/Home" class="list-item-link" active-class="active" exact title="خانه">
                    <i class="fa fa-home"></i> <span>خانه</span>
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="/Home/Todos" class="list-item-link" active-class="active" title="کار های روزانه">
                    <i class="fas fa-edit"></i> <span>کار روزانه</span>
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="/Home/Texts" class="list-item-link" active-class="active" title="نوشته های ماهانه">
                    <i class="fa fa-file-text"></i><span>نوشته</span>
                </router-link>
            </li>
            <li class="list-item" v-if="user.university == true">
                <router-link to="/Home/Exams" class="list-item-link" active-class="active" title="امتحان ها">
                    <i class="fas fa-book-dead"></i><span>امتحان</span>
                </router-link>
            </li>
            <li class="list-item" v-if="user.university == true">
                <router-link to="/Home/University" class="list-item-link" active-class="active" title="دانشگاه">
                    <i class="fas fa-university"></i><span>دانشگاه</span>
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="/Home/Financial" class="list-item-link" active-class="active" title="امور مالی">
                    <i class="fas fa-money-bill"></i><span>امور مالی</span>
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="/Home/Book" class="list-item-link" active-class="active" title="کتاب ها">
                    <i class="fas fa-book"></i><span>کتاب</span>
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="/Home/BookMark" class="list-item-link" active-class="active" title="بوک مارک ها">
                    <i class="fas fa-bookmark"></i><span>بوک مارک</span>
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="/Home/Setting" class="list-item-link" active-class="active" title="تنظیمات">
                    <i class="fas fa-cog"></i><span>تنظیمات</span>
                </router-link>
            </li>
            <li class="list-item" v-if="user.is_admin == true">
                <router-link to="/Home/Admin" class="list-item-link" active-class="active" title="ادمین">
                    <i class="fa fa-user-secret"></i><span>پنل ادمین</span>
                </router-link>
            </li>
            <li class="list-item" v-on:click="logOut">
                <a class="list-item-link" title="خارج شو">
                    <i class="fas fa-power-off  text-danger"></i><span>خروج</span>
                </a>
            </li>
        </ul>
    </aside>
</template>
<script>
import mixing from '../../mixing';
export default {
    mixins: [mixing],
    props: [
        "user"
    ],
    data() {
        return {
            menuItems: [],
            addShow: false,
            showHelp: false,
            admin: false
        }
    },
    methods: {
        logOut() {
            this.$http.post("logout", { token: localStorage.getItem("token") }).then((response) => {
                localStorage.clear();
                this.$toast.success("به سلامت منتظرت هستیم", {
                    icon: {
                        iconClass: "fas fa-hand-paper"
                    },
                    timeout: 3000
                })
                this.$router.push("/");
            }).catch((err) => {
                if (err.response) {
                    this.$toast.error(err.response.data.message);
                }
            })
        },
        date() {
            return `${this.$store.state.currentDate} ${mixing.methods.monthChanger(this.$store.state.currentMonth)}`
        }
    }
}
</script>

<style scoped>
aside {
    background-color: var(--light);
    color: var(--dark);
    width: 200px;
    transition: all 300ms ease-in-out;
}

aside.hide {
    transform: translateX(200px);
    visibility: hidden;
    pointer-events: none;
    display: none;
}

aside .list-item {
    display: flex;
    width: 100%;
    transition: all 300ms ease-in-out;
    color: var(--dark);
}

svg {
    color: var(--dark);
    font-size: 18px !important;
    margin-left: 10px;
}

span {
    color: var(--dark);
    font-size: 16px;
}

aside .list-item-link {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
    padding: 20px 15px;
    cursor: pointer;
    transition: all 300ms ease-in-out;
}

aside .list-item:hover {
    background-color: var(--grey);
}

.active {
    background-color: var(--grey);
}

.general-status {
    padding: 23px 15px;
    text-align: center;
}

.date-mobile {
    display: none;
}

@media(max-width : 768px) {

    aside {
        width: 50px;
    }

    .list-item span {
        display: none;
    }

    .date-desktop {
        display: none;
    }

    .general-status {
        padding: 0;
    }

    .date-mobile {
        display: block;
        margin-right: 10px;
    }

    .date-mobile svg {
        padding: 23px 15px;
        margin-left: 0;

    }

}
</style>