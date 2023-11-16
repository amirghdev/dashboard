<template>
    <div class="semester-courses">
        <div class="item" v-for="item in courses" :key="item.id">
            <div class="item-text">
                <p class="mb-0" :data-id="item.id">
                    <span :data-id="item.id">{{ item.name }}</span> (<span class="text-danger"> {{ item.unit }} </span>)
                </p>
            </div>
            <div class="item-control">
                <button class="item-btn" v-on:click="deleteItem(item)" title="پاک کن">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="item-btn ml-2" v-on:click="show(item.semesterId, item.id)" title="کامل نشان بده">
                    <i class="fa fa-eye"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "courses",
        "semester"
    ],
    methods: {
        deleteItem(item) {
            this.$http.delete("Courses/delete", { data: { id: item.id, semesterId: this.semester.id, token: localStorage.getItem("token") } })
                .then(() => {
                    this.$toast.success(`${item.name} حذف شد`);
                    this.$emit("getItems");
                    this.$emit("decrease", item.unit);
                }).catch((err) => {
                    console.log(err);
                    this.$toast.error(err.response.data.message);
                })
        },
        show(id, courseId) {
            this.$router.push({ name: "showCourse", params: { id, courseId } });
        }
    },
}
</script>

<style scoped>
.semester-courses {
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