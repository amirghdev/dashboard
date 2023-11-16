<template>
    <article class="start-item">
        <h4 class="text-center">
            {{ data.title }}
        </h4>
        <p>
            {{ data.text }}
        </p>
    </article>
</template>

<script>
export default {
    props: [
        "data"
    ]
}
</script>

<style scoped>
article {
    color: var(--dark);
    background-color: var(--light);
    border-radius: 7px;
    padding: 15px;
    margin: 10px;
    width: calc(calc(100% / 3) - 20px);
}

@media(max-width: 992px) {
    article {
        width: calc(calc(100% / 2) - 20px);
    }
}

@media(max-width : 768px) {
    article {
        width: 100%;
    }
}
</style>