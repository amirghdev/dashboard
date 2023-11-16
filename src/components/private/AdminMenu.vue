<template>
    <div class="adminMenu mt-3">
        <ul class="menu mb-0">
            <li class="list-item">
                <router-link to="/Home/Admin" class="list-item-link" active-class="active" exact title="خانه">
                    <i class="fa fa-home text-dark"></i>
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="/Home/Admin/Users" class="list-item-link" active-class="active" title="لیست کاربران">
                    <i class="fa-solid fa-users text-dark"></i>
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="/Home/Admin/Response" class="list-item-link" active-class="active" title="جواب پشتیبانی">
                    <i class="fa-solid fa-headset text-dark"></i>
                </router-link>
            </li>
            <li class="list-item">
                <router-link :to="{ name: 'siteSetting' }" class="list-item-link" active-class="active" title="تنظیمات">
                    <i class="fa-solid fa-cog text-dark"></i>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {

}
</script>

<style scoped>
.menu {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
}

.menu .list-item {
    list-style-type: none;
    transition: all 300ms ease-in-out;
}

.menu .list-item-link {
    text-decoration: none;
    color: #fff;
    width: 100%;
    display: block;
    padding: 0 10px;
    cursor: pointer;
    transition: all 300ms ease-in-out;
}

.menu .list-item:hover {
    transform: scale(1.2);
}

.active svg {
    color: #17a2b8 !important;
}

svg {
    font-size: 1.5em;
}
</style>