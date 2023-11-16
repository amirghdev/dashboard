<template>
    <section v-if="showPage" class="d-flex flex-column justify-content-between align-content-between">
        <article class="items d-flex flex-wrap flex-row-reverse">
            <div>
                <h5 class="text-center">
                    اعلانات
                </h5>
                <p>
                    {{ information }}
                </p>
            </div>
            <div>
                <h5 class="text-center">
                    کارهای این ماه
                </h5>
                <p>
                    {{ `تعداد کارهای ماه ${monthChanger($store.state.todoMonth)} : ${todosCount}` }}
                </p>
            </div>
            <div>
                <h5 class="text-center">
                    نوشته های این ماه
                </h5>
                <p>
                    {{ `تعداد نوشته های ماه ${monthChanger($store.state.textMonth)} سال ${$store.state.textYear} :
                                        ${textsCount}`
                    }}
                </p>
            </div>
            <div v-if="university">
                <h5 class="text-center">
                    ترم {{ semester.unit }}
                </h5>
                <p>
                    تعداد کل : {{ semester.total }}
                </p>
                <p>
                    تعداد پاس شده : {{ semester.total_pass }}
                </p>
            </div>
            <div v-if="university">
                <h5 class="text-center">
                    امتحان های ترم {{ semester.unit }}
                </h5>
                <p v-if="exams.length == 0">
                    شما برای ترم {{ semester.unit }} امتحانی وارد نکرده اید
                </p>
                <p v-else>
                    <span v-for="(exam) in exams" :key="exam.id" class="d-block">
                        <router-link :to="{ name: 'showExam', params: { id: exam.id } }">
                            {{ exam.name }}
                        </router-link>
                        : {{ `${exam.day} / ${exam.month} / ${exam.year}` }}
                    </span>
                </p>
            </div>
            <div>
                <h5 class="text-center">
                    هزینه ها
                </h5>
                <p>
                    {{ `هزینه های ${monthChanger($store.state.financialMonth)} ماه : ${financialMonth == null ? '0' :
                        financialMonth} تومان` }}
                </p>
                <p>
                    {{ `هزینه های سال ${$store.state.financialYear} : ${financialYear == null ? 0 : financialYear} تومان` }}
                </p>
            </div>
        </article>
    </section>
</template>

<script>
import mixing from "../../mixing"
export default {
    mixins: [mixing],
    data() {
        return {
            showPage: false,
            datas: [],
            information: String,
            todosCount: 0,
            textsCount: 0,
            semester: {},
            exams: [],
            university: false,
            financialMonth: 0,
            financialYear: 0,
        }
    },
    beforeCreate() {
        this.$store.state.pageLoader = true;
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let data = {
                userId: this.$store.state.user.id,
                todoMonth: this.$store.state.todoMonth,
                todoYear: this.$store.state.todoYear,
                textMonth: this.$store.state.textMonth,
                textYear: this.$store.state.textYear,
                financialMonth: this.$store.state.financialMonth,
                financialYear: this.$store.state.financialYear,
            }
            if (this.$store.state.user.university != false && this.$store.state.user.semesterId != 0) {
                this.university = true;
                data.semesterId = this.$store.state.user.semesterId;
            }
            this.$http.post("getData", { data, token: localStorage.getItem("token") }).then((response) => {
                console.log(response);
                const { information, todosCount, textsCount, totalMonth, totalYear } = response.data.result;
                this.information = information;
                this.todosCount = todosCount;
                this.textsCount = textsCount;
                if (this.university) {
                    const { semester, exams } = response.data.result;
                    this.semester = semester;
                    this.exams = exams;
                }
                this.financialMonth = totalMonth;
                this.financialYear = totalYear;
                // this.getQuote();
                this.showPage = true;
                this.$store.state.pageLoader = false;
            }).catch((err) => {
                if (err.response) {
                    this.$toast.error(err.response.data.message, { timeout: 5000 });
                }
            })
        },
        getQuote() {
            this.$http.get("https://api.api-ninjas.com/v1/quotes?category=success", { headers: { "X-Api-Key": "goTOzV3918vS5KlrtfVMaw==7mS34C1kc5eCPnc8" } }).then((response) => {
                console.log(response);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>

<style scoped>
div {
    color: var(--dark);
    background-color: var(--light);
    border-radius: 7px;
    padding: 15px;
    margin: 10px;
    width: calc(calc(100% / 3) - 20px);
    overflow: scroll;
    transition: all 300ms ease-in-out;
}

@media(max-width: 992px) {
    div {
        width: calc(calc(100% / 2) - 20px);
    }
}

@media(max-width : 768px) {
    div {
        width: 100%;
    }
}

/* section {
    min-height: 85vh;
} */
</style>