<template>
    <div id="show-exam" class="create" v-if="showPage">
        <h3 class="text-center">
            {{ exam.name }}
        </h3>
        <div class="row flex-row-reverse">
            <div class="col-12 my-3">
                <h5>موارد امتحان</h5>
                <textarea type="text" name="subject" ref="subject" class="form-control" v-model="exam.subject"
                    v-on:change="pushToUpdate('subject')"></textarea>
            </div>
            <div class="col-6 my-3">
                <h5>تاریخ امتحان : {{ `${exam.day} / ${exam.month} / ${exam.year}` }}</h5>
                <date-picker v-model="date" class="text-dark" format="jYYYY/jMM/jDD" />
            </div>
            <div class="col-6 my-3">
                <h5>وضعیت امتحان</h5>
                {{ exam.completed == false ? "انجام نشده است" : `انجام شده است : ${exam.grade}` }}
            </div>
            <div class="col-6 my-3">
                <h5>نمره امتحان </h5>
                <input type="tel" name="grade" ref="grade" class="form-control" :value="exam.grade"
                    v-on:change="pushToUpdate('grade')">
            </div>
        </div>
        <p>توجه : بعد از بروزرسانی نمره امتحان وضعیت امتحان نیز تغییر میکند</p>
        <button class="btn btn-outline-secondary mt-3" v-on:click="allUpdate">
            بروزرسانی
        </button>
        <err :message="message" v-if="showErr"></err>
    </div>
</template>

<script>
import mixing from '../../../mixing';
export default {
    mixins: [mixing],
    data() {
        return {
            update: [],
            exam: {},
            showErr: false,
            date: "",
            showPage: false,
            changeDate: false,
            day: 0,
            month: 0,
            year: 0
        }
    },
    watch: {
        date() {
            let newDay = this.date.split("/")[2];
            let newMonth = this.date.split("/")[1];
            let newYear = this.date.split("/")[0];
            if (newDay.startsWith("0")) {
                newDay = newDay.substring(1, 2);
            }
            this.day = newDay;
            this.month = newMonth;
            this.year = newYear;
            this.changeDate = true;
        }
    },
    beforeCreate() {
        this.$store.state.showExam = false;
        this.$store.state.pageLoader = true;
    },
    created() {
        this.validate();
    },
    methods: {
        pushToUpdate(name) {
            this.update.push(name);
        },
        validate() {
            this.$http.post("Exams/findOne", { id: this.$route.params.id, token: localStorage.getItem("token") })
                .then(response => {
                    this.$store.state.showExam = true;
                    this.$store.state.pageLoader = false;
                    this.showPage = true;
                    this.exam = response.data.exam;
                }).catch((err) => {
                    this.$toast.error(err.response.data.message);
                    this.$router.push({ name: "exams" }).catch(() => { });
                })
        },
        allUpdate() {
            let data = {};
            if (this.update.length == 0 && this.changeDate == false) {
                this.showErr = true;
                this.message = "لطفا اول بخشی را تغییر دهید سپس بروزرسانی کنید";
            }
            else {
                this.showErr = false;
                if (this.changeDate) {
                    data.day = this.day;
                    data.month = this.month;
                    data.year = this.year;
                }
                this.update.forEach((item) => {
                    data[item] = this.$refs[item].value.trim();
                })
                this.$http.put("Exams/update", { token: localStorage.getItem("token"), data, id: this.exam.id })
                    .then(response => {
                        this.showErr = false;
                        this.$toast.success(response.data.message);
                        this.$router.push({ name: "showExam", params: { id: this.exam.id } }).catch(() => { });
                    }).catch((err) => {
                        this.showErr = true;
                        this.message = err.response.data.message;
                    })
            }
        },
    },
}
</script>

<style scoped>
textarea {
    resize: none;
}

.semester {
    display: flex;
    flex-wrap: wrap;
}

.item {
    width: calc(calc(100% / 2) - 5px);
}

@media (max-width:558px) {
    .item {
        width: 100%;
    }
}
</style>