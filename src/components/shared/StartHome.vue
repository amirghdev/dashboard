<template>
    <article class="welcome">
        <p class="text-center mb-0 w-100">
            {{ user.firstName }} {{ user.lastName }} عزیز خوش آمدید 
        </p>
    </article>
</template>
    
<script>
import mixings from "../../mixing";
export default {
    mixins: [mixings],
    props: [
        "user"
    ],
    methods: {
        monthChanger(month) {
            return mixings.methods.monthChanger(month);
        },
        dateChanger(timestamp) {
            return mixings.methods.dateChanger(timestamp);
        },
    },
}
</script>

<style scoped>
article {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 10px 15px;
    border-radius: 25px;
    transition: all 300ms ease-in-out;
}

.close {
    position: absolute;
    right: 25px;
    cursor: pointer;
}

@media (max-width:768px) {
    article {
        border-radius: 0;
    }
}
</style>