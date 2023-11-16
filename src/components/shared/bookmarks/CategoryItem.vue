<template>
    <div class="category-container">
        <div class="bookmark-item text-center" v-for="item in categories" :key="item.id">
            <div class="category">
                <div class="bookmark-text">
                    <router-link :to="{ name: 'manageCategory', params: { name: nameToUrl(item.name) } }"
                        class="d-block text-dark h-100" tag="a">
                        <p class="mb-0" :data-id="item.id">
                            {{ item.name.slice(0, 20) }}
                        </p>
                    </router-link>
                </div>
                <div class="bookmark-control">
                    <button class="bookmark-btn" v-on:click="deleteCategory(item.id)" title="پاک کن">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixing from "../../../mixing";
export default {
    mixins: [mixing],
    props: [
        "categories"
    ],
    methods: {
        deleteCategory(id) {
            this.$http.delete("Bookmarks/deleteCategory", { data: { token: localStorage.getItem("token"), id } })
                .then(response => {
                    this.$toast.success(response.data.message);
                    this.$emit("getItems");
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
    },
}
</script>

<style scoped>
.category-container {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
}
</style>