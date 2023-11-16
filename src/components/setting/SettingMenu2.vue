<template>
    <div class="settingMenu">
        <ul class="menu" v-bind:class="{ show: addShow }">
            <li class="list-item">
                <router-link to="/Home/Setting" class="list-item-link" exact active-class="active">
                    خوش آمدید
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="" class="list-item-link">
                    خوش آمدید
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="" class="list-item-link">
                    خوش آمدید
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="" class="list-item-link">
                    خوش آمدید
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show : false
        }
    },
}
</script>

<style scoped>

.menu{
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
}

.menu .list-item{
    width: 100%;
    list-style-type: none;
}

.menu .list-item .list-item-link{
    display: block;
    width: 100%;
    padding: 10px;
    transition: all 300ms ease-in-out;
    color: #000;
    text-decoration: none;
}

.menu .list-item .list-item-link:hover{
    background-color: rgba(0, 0, 0, 0.1);
}


.active {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 7px ;
}

</style>