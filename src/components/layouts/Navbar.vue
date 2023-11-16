<template>
    <nav>
        <div class="managment d-flex flex-row align-items-center justify-content-center">
            <div class="mr-4">
                {{ `${user.firstName} ${user.lastName}` }}
                <img :src="image" alt="عکس پیدا نشد" class="img-fluid rounded-circle ml-2" id="avatar"
                    crossorigin="anonymous">
            </div>
            <div class="theme-change mt-1 d-flex justify-content-center">
                <div v-show="theme == 'dark'" v-on:click="change('light')">
                    <i class="fas fa-sun mr-2"></i>
                </div>
                <div v-show="theme == 'light'" v-on:click="change('dark')">
                    <i class="fas fa-moon"></i>
                </div>
            </div>
        </div>
        <div class="d-flex">
            <div v-on:click="closeSide" v-show="showClose">
                <i class="fa fa-close"></i>
            </div>
            <div v-on:click="openSide" v-show="showOpen">
                <i class="fa fa-bars"></i>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios';

export default {
    props: [
        "user"
    ],
    data() {
        return {
            theme: String,
            showClose: true,
            showOpen: false,
            image: "",
            baseUrl: axios.defaults.baseURL
        }
    },
    created() {
        // if (this.user.avatar_confirmation == true) {
        //     this.image = `http://localhost:3000/images/upload/avatars/${this.user.avatar}`;
        // } else {
        //     this.image = "http://localhost:3000/images/avatar.png"
        // }
        this.image = `${this.baseUrl}images/uploads/avatars/${this.user.avatar}`
        this.getTheme();
    },
    methods: {
        change(theme) {
            this.$http.post("theme", { id: this.$store.state.user.id, theme: theme, token: localStorage.getItem("token") }).then((response) => {
                if (theme == "light") {
                    document.body.classList.remove("dark");
                    this.theme = "light";
                    localStorage.setItem("theme", theme);
                } else {
                    document.body.classList.add("dark");
                    localStorage.setItem("theme", theme);
                    this.theme = "dark";
                }
                this.$toast.success(`${response.data.message}`, {
                    icon: {
                        iconClass: "fa fa-smile"
                    },
                })
            }).catch((err) => {
                this.$toast.error("مشکلی در عوض شدن تم شما وجود دارد");
            })
        },
        getTheme() {
            this.theme = localStorage.getItem("theme");
        },
        closeSide() {
            this.showClose = false;
            this.showOpen = true;
            document.querySelector("aside").classList.add("hide");
            document.querySelector("main").classList.add("open");
        },
        openSide() {
            this.showClose = true;
            this.showOpen = false;
            document.querySelector("aside").classList.remove("hide")
            document.querySelector("main").classList.remove("open");
        }
    },
}
</script>

<style scoped>
nav {
    width: 100%;
    background-color: var(--light);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
    transition: background 300ms ease-in-out;
}

svg {
    font-size: 20px;
    cursor: pointer;
}

img {
    width: 30px;
    cursor: pointer;
}
</style>