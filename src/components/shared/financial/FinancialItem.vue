<template>
    <div class="today-items">
        <div class="item" v-for="item in items" :key="`${item.id}`">
            <p class="item-text mb-0">
                <span>
                    {{ `${item.year} / ${item.month} / ${item.day}` }}
                </span>
                <span class="mr-1">
                    {{ `${item.subject} : ` }}
                </span>
                <span class="mr-1">
                    ({{ `${item.price}` }})
                </span>
            </p>
            <div class="item-control">
                <button class="item-btn mr-2" v-on:click="deleteItem(item)" title="پاک کن">
                    <i class="fa fa-trash "></i>
                </button>
            </div>
        </div>
        <div class="item" v-if="month != null">
            جمع : {{ month }}
        </div>
        <!-- <div class="item">
            هزینه کل : {{ total }}
        </div> -->
    </div>
</template>

<script>
export default {
    props: [
        "items",
        "month"
    ],
    methods: {
        deleteItem(item) {
            let url;
            (item.type == "financial") ? url = "financial/deleteFinancial" : url = "financial/deleteIncome";
            console.log(url);
            this.$http.delete(url, { data: { id: item.id, token: localStorage.getItem("token") } })
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
.item-text {
    width: 90%;
    flex-wrap: wrap;
}

.item-control {
    width: 10%;
}
</style>