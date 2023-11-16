<template>
    <section v-if="showPage">
        <section id="home" class="container-fluid p-0">
            <!-- sidebar section -->
            <transition appear appear-active-class="animate__animated animate__fadeIn" mode="out-in">
                <app-menu :user="user"></app-menu>
            </transition>
            <!-- sidebar section -->
            <main class="d-flex flex-column">
                <!-- navbar section -->
                <transition appear appear-active-class="animate__animated animate__fadeIn" mode="out-in">
                    <navbar :user="user"></navbar>
                </transition>
                <!-- navbar section -->
                <!-- main content section -->
                <section class="main-content">
                    <transition appear enter-active-class="animate__animated animate__fadeIn" mode="out-in">
                        <router-view></router-view>
                    </transition>
                    <div class="preload" v-show="$store.state.pageLoader">
                        <pulse-loader></pulse-loader>
                    </div>
                </section>
                <!-- main content section -->
            </main>
        </section>
    </section>
</template>

<script>
import sideBar from "../layouts/SideBar.vue";
import navBar from "../layouts/Navbar.vue"
import mixing from "../../mixing";
export default {
    mixins: [
        mixing,
    ],
    components: {
        "app-menu": sideBar,
        "navbar": navBar
    },
    data() {
        return {
            user: Object,
            showPage: false,
            showLoad: true
        }
    },
    created() {
        this.$store.state.showLoad = true;
        this.validation();
    },
    methods: {
        async validation() {
            // check if token is set
            if (localStorage.getItem("token")) {
                // check with database
                await this.$http.post("auth", { token: localStorage.getItem("token") })
                    .then(async (response) => {
                        if (response.data.user.university == true) {
                            await this.$http.post("Users/findSemester", { unit: response.data.user.unit, token: localStorage.getItem("token") }).then((res) => {
                                if (res.data.semester != null) {
                                    response.data.user.semesterId = res.data.semester.id;
                                }
                            })
                        }
                        this.user = response.data.user;
                        this.$store.state.user = response.data.user;
                        localStorage.setItem("theme", response.data.user.theme);
                        this.$store.state.theme = response.data.user.theme;
                        this.setTheme();
                    }).catch((err) => {
                        // validation failed in backEnd
                        localStorage.clear();
                        this.$toast.error(err.response.data.message, { timeout: 5000 })
                        this.$store.state.showLoad = false;
                        this.$router.push("/").catch(() => { });
                    })
            }
            // token is not set
            else {
                localStorage.clear();
                this.$toast.error("لطفا وارد اکانت خود شوید");
                this.$store.state.showLoad = false;
                this.$router.push("/");
            }
        },
        setTheme() {
            (localStorage.getItem("theme") == "dark") ? document.body.classList.add("dark") : document.body.classList.remove("dark");
            this.showPage = true;
            this.$store.state.showLoad = false;
        }
    },
}
</script>

<style scoped>
main {
    width: calc(100% - 200px);
    transition: background 300ms ease-in-out;
}

main.open {
    width: 100%;
}

.main-content {
    margin: 25px;
    text-align: right;
    position: relative;
}

@media(max-width: 768px) {
    main {
        width: calc(100% - 50px);
    }
}

.preload {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

