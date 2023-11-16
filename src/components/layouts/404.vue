<template>
    <article class="container">
        <div class="create w-100 p-5 text-center">
            <h1 class="text-danger">404</h1>
            <p>صحفه مورد نظر شما پیدا نشد</p>
            <p>به <router-link :to="`/Home`">خانه</router-link> برگردید</p>
            <p>اگر به مشکلی برخوردید با <router-link to="/Home/Setting/Contact" class="text-danger">من</router-link> در ارتباط باشید</p>
        </div>
    </article>
</template>

<script>
export default {
    
}
</script>

<style scoped>

article{
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

p{
    font-size: 20px;
    margin-bottom: 0;
}

</style>