<template>
    <div class="university-items">
        <div class="item" v-for="item in semesters" :key="item.id" :data-id="item.id">
            <div class="item-text">
                <p class="mb-0" :data-id="item.id">
                    ترم <span class="text-danger"> {{ item.unit }} </span>
                </p>
            </div>
            <div class="item-control">
                <button class="item-btn" v-on:click="deleteItem(item.id)" title="پاک کن">
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
        "semesters"
    ],
    methods: {
        deleteItem(id) {
            this.$http.delete("Semesters/delete", { data: { id, token: localStorage.getItem("token") } })
                .then(response => {
                    if (response.data.reset == true) {
                        this.$store.state.user.university = false;
                        this.$store.state.user.semesterId = null;
                        this.$store.state.user.unit = 0;
                        this.$router.push({ name: "setting" }).catch(() => { });
                    } else {
                        if (response.data.change == true) {
                            this.$store.state.user.unit = response.data.unit;
                            this.$store.state.user.semesterId = response.data.semesterId;
                        }
                    }
                    this.$toast.success(response.data.message);
                    this.$emit("getItems");
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                })
        },
        show(id) {
            this.$router.push({ name: "showSemester", params: { id } }).catch(() => { });
        },
    },
}
</script>

<style scoped>
.university-items {
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