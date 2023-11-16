<template>
    <div class="exams">
        <div class="item" v-for="item in exams" :key="item.id">
            <div class="item-text">
                <p class="mb-0" :data-id="item.id" :class="{ done: item.completed == true }">
                    ( <span class="text-warning"> {{ `${item.year} / ${item.month} / ${item.day}` }} </span> )
                    <span :data-id="item.id">{{ item.name }}</span>
                </p>
            </div>
            <div class="item-control">
                <button class="item-btn" v-on:click="deleteItem(item)" title="پاک کن">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="item-btn ml-2" v-on:click="show(item.id)" title="کامل نشان بده">
                    <i class="fa fa-eye"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "exams"
    ],
    methods: {
        deleteItem(item) {
            this.$http.delete("Exams/delete", { data: { id: item.id, token: localStorage.getItem("token") } })
                .then(() => {
                    this.$toast.success(`${item.name} حذف شد`);
                    this.$emit("getItems");
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
        show(id) {
            this.$router.push({ name: "showExam", params: { id } });
        },
    },
}
</script>

<style scoped></style>