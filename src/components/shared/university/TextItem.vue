<template>
    <div class="semester-text">
        <div v-for="item in texts" :key="item.id" class="item">
            <div class="item-text">
                <p class="mb-0">
                    {{ item.subject }}
                </p>
            </div>
            <div class="item-control">
                <button class="item-btn" v-on:click="deleteItem(item.id)" title="پاک کن">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="item-btn ml-2" v-on:click="show(item)" title="کامل نشان بده">
                    <i class="fa fa-eye"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "texts"
    ],
    methods: {
        deleteItem(id) {
            this.$http.delete("Semester/Texts/delete", { data: { id, token: localStorage.getItem('token') } })
                .then(response => {
                    this.$toast.success(response.data.message);
                    this.$emit("getItems");
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
        show(item) {
            this.$router.push({ name: "showSemesterText", params: { id: item.id, semesterId: item.semesterId } }).catch(() => { });
        }
    },
}
</script>

<style scoped>
.semester-text {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
}

.item {
    width: calc(calc(100% / 2) - 15px);
    margin: 10px;
}

.item:nth-of-type(odd) {
    margin-right: 0;
}

@media (max-width:992px) {
    .item {
        width: 100%;
        margin: 10px 0;
    }
}
</style>