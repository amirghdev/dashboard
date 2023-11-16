<template>
    <ul class="menu list-group">
        <!-- <li class="list-item">
                <router-link to="/Home/Setting" class="list-item-link" active-class="active" exact title="درباره ما">
                    <i class="fa-solid fa-hand-holding-heart  text-dark"></i>
                </router-link>
            </li> -->
        <!-- <li class="list-item">
                <router-link to="/Home/Setting/Guide" class="list-item-link" active-class="active" title="آموزش ها">
                    <i class="fab fa-get-pocket text-dark"></i>
                </router-link>
            </li> -->
        <!-- <li class="list-item">
                <router-link to="/Home/Setting/Contact" class="list-item-link" active-class="active" title="ارتباط با من">
                    <i class="fa-solid fa-headset text-dark"></i>
                </router-link>
            </li> -->
        <li class="list-item">
            <router-link :to="{ name: 'password' }" class="list-item-link" active-class="active" title="رمز عبور">
                رمز عبور
            </router-link>
        </li>
        <li class="list-item">
            <router-link :to="{ name: 'ActiveUniversity' }" class="list-item-link" active-class="active" title="دانشگاه">
                دانشگاه
            </router-link>
        </li>
        <li class="list-item">
            <router-link :to="{ name: 'active-programming' }" class="list-item-link" active-class="active"
                title="برنامه نویسی">
                برنامه نویسی
            </router-link>
        </li>
        <li class="list-item">
            <router-link :to="{ name: 'profile' }" class="list-item-link" active-class="active" title="پروفایل">
                عکس پروفایل
            </router-link>
        </li>
    </ul>
</template>
<script>
export default {

}
</script>

<style scoped>
li {
    margin: 10px 0;
}

li a {
    /* color: var(--dark); */
    transition: all 300ms ease-in-out;
}
</style>