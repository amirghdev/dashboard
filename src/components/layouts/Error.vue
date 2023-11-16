<template>
    <div class="alert alert-secondary mt-3">
        {{ message }}
    </div>
</template>

<script>
export default {
    props: [
        "message",
    ]
}
</script>

<style scoped></style>