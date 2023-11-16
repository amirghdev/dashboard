<template>
    <ul>
        <li v-for="item in items" :key="item.href">
            <!-- <router-link :to="{ name: item.href }">
                {{ item.text }}
            </router-link> -->
            <router-link :to="item.href">
                {{ item.text }}
            </router-link>
            <span class="mx-1">/</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: [
        "items"
    ]
}
</script>

<style scoped>
ul {
    display: flex;
    padding: 10px 15px;
    color: var(--dark);
}

span {
    color: var(--dark-grey);
}
</style>