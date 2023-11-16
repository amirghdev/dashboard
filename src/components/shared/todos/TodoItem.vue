<template>
    <div class="today-todos">
        <div class="item" v-for="(item, index) in todos" :key="`${item.id}_${item.completed}`">
            <p class="item-text mb-0" :class="{ done: item.completed == true }">
                <span class="text-danger"> .{{ ++index }} </span><span> {{ item.text }} </span>
            </p>
            <div class="item-control">
                <button class="item-btn mr-2" v-on:click="moveItem(item)" title="به فردا اضافه کن">
                    <i class="fa fa-solid fa-share-from-square"></i>
                </button>
                <button class="item-btn mr-2" v-on:click="deleteItem(item)" title="پاک کن">
                    <i class="fa fa-trash "></i>
                </button>
                <button class="item-btn" v-on:click="change(item)" title="عوض کن">
                    <i
                        :class="{ fas: item.completed == true, 'fa-redo': item.completed == true, far: item.completed == false, 'fa-check-square': item.completed == false }"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: [
        "todos"
    ],
    methods: {
        change(item) {
            this.$http.put("Todos/change", { id: item.id, token: localStorage.getItem("token") })
                .then(response => {
                    if (response.data.type) {
                        this.$toast.success(`${item.text}انجام شد`);
                    } else {
                        this.$toast.info(`${item.text}انجام نشد`);
                    }
                    item.completed = response.data.type;
                    // this.$emit("getItem");
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
        deleteItem(item) {
            this.$http.delete("Todos/delete", { data: { id: item.id, token: localStorage.getItem("token") } })
                .then(() => {
                    this.$toast.success(`${item.text} حذف شد`);
                    this.$emit("getItems");
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
        moveItem(item) {
            this.$http.put("Todos/tomorrow", { id: item.id, token: localStorage.getItem("token") })
                .then(() => {
                    this.$toast.success(`${item.text} به فردا انتقال یافت`);
                    this.$emit("getItems");
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
    },
}
</script>