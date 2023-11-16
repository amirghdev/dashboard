<template>
  <article class="password create">
    <h5>
      رمز عبور
    </h5>
    <form @submit.prevent="updatePassword">
      <div class="form-group mt-3">
        <input type="password" placeholder="رمز عبور جدید خود را وارد کنید" class="form-control" ref="password"
          name="password">
      </div>
      <button class="btn btn-outline-secondary" type="submit">بروزرسانی</button>
    </form>
    <p class="mt-2">توجه : بعد از بروزرسانی رمز عبور دوباره وارد صحفه ورود می شوید </p>
    <err v-if="showErr" :message="message"></err>
  </article>
</template>

<script>
import mixing from '../../mixing';
export default {
  mixins: [mixing],
  data() {
    return {
      showErr: false,
      message: String
    }
  },
  methods: {
    updatePassword() {
      const password = this.$refs.password.value;
      this.$http.put("Users/changePassword", { token: localStorage.getItem("token"), password })
        .then(() => {
          this.showErr = false;
          this.$toast.success("رمز عبور شما با موفقیت بروز شد");
          localStorage.clear();
          this.$router.push({ name: "login" }).catch(() => { });
        }).catch((err) => {
          this.showErr = true;
          this.message = err.response.data.message;
          this.$refs.password.focus();
        })
    },
  },
}
</script>

