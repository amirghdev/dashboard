<template>
    <nav class="my-3 bg-dark">
        <span class="burger" v-on:click="(addShow = !addShow)">
            <i class="fa fa-bars"></i>
        </span>
        <ul class="menu" v-bind:class="{ show: addShow }">
            <li class="list-item">
                <router-link to="/Home/Projects/Create" class="list-item-link" active-class="active">ساخت</router-link>
            </li>
            <li class="list-item">
                <router-link to="/Home/Projects/Front" class="list-item-link" active-class="active">فرانت اند</router-link>
            </li>
            <li class="list-item">
                <router-link to="/Home/Projects/Back" class="list-item-link" active-class="active">بک اند</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {

    data() {
        return {
            menuItems: [],
            addShow: false
        }
    },
    mounted() {
        this.menuItems = document.querySelectorAll(".list-item");
        this.menuItems.forEach(item => {
            item.addEventListener("click", () => {
                this.addShow = false
            })
        })
    },
}
</script>




<style scoped>
nav {
    display: block;
    position: relative;
}

nav .menu {
    display: flex;
}

nav .menu .list-item {
    list-style-type: none;
    transition: all 300ms ease-in-out;
    text-align: center;
    width: 100%;
}

nav .menu .list-item-link {
    text-decoration: none;
    color: #fff;
    width: 100%;
    display: block;
    padding: 20px;
    cursor: pointer;
}

nav .menu .list-item:hover {
    background-color: rgba(0, 0, 0, 0.3);
}

.active {
    background-color: rgba(0, 0, 0, 0.3);
}

/* burger */

.burger {
    position: absolute;
    display: none;
    padding: 10px;
    font-size: 25px;
    cursor: pointer;
    color: #fff;
}

.show {
    display: block !important;
}

@media (max-width: 992px) {

    nav {
        display: flex;
        flex-direction: column;
    }

    .burger {
        visibility: visible;
        pointer-events: initial;
        display: inline-block;
        position: relative;
    }

    .burger i,
    svg {
        width: 100%;
        display: block;
    }

    nav .menu {
        display: none;
    }

}
</style>

