<template>
    <article class="create">
        <h5>
            آپلود عکس
        </h5>
        <p>
            برای آپلود عکس به موارد زیر توجه کنید
        </p>
        <p>
            عکس شما نباید بیشتر از 2 مگابایت باشد
        </p>
        <p>
            عکس شما باید پسوند های زیر را داشته باشد
        </p>
        <p>
            jpeg , png , jpg
        </p>
        <form ref="form" @submit.prevent="uploadImage">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <button class="btn btn-success" type="button" v-on:click="upload">
                        آپلود عکس
                    </button>
                </div>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="selectedImage" name="image" ref="image">
                    <label id="imageStatus" class="custom-file-label text-left" for="selectedImage" ref="label"></label>
                </div>
            </div>
            <p class="mt-3" v-if="isUpload">در حال آپلود عکس بر روی سرور</p>
        </form>
        <err v-if="showErr" :message="message"></err>
    </article>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            showErr: false,
            message: "",
            token: localStorage.getItem("token"),
            baseUrl: axios.defaults.baseURL,
            isUpload: false
        }
    },
    methods: {
        async upload() {
            if (this.isUpload == true) {
                this.showErr = true;
                this.message = "شما در حال آپلود عکس دیگری هستید";
                return false;
            }
            this.isUpload = true;
            let formData = new FormData(this.$refs.form);
            formData.append("token", this.token);
            const response = await fetch(`${this.baseUrl}Users/upload-image`, {
                method: "post",
                body: formData
            })
            const data = await response.json();
            if (response.status != 200) {
                this.showErr = true;
                this.message = data.message;
                this.isUpload = false;
            } else {
                this.isUpload = false;
                this.showErr = false;
                this.$toast.success("عکس شما با موفقیت بروزرسانی شد");
                const image = document.querySelector("#avatar");
                image.setAttribute("src", `${this.baseUrl}images/uploads/avatars/${data.imageName}`);
            }
        }
    }
}
</script>

<style scoped>
.custom-file-input~.custom-file-label::after {
    content: "انتخاب عکس" !important;
}
</style>