<template>
  <article class="active-university create">
    <div v-if="$store.state.user.university == false">
      <h5>
        فعال سازی بخش دانشگاه
      </h5>
      <form @submit.prevent="activeUniversity">
        <div class="form-group mt-3">
          <input type="tel" placeholder="شماره ترم جدید را وارد کنید" class="form-control" ref="unit">
        </div>
        <div class="form-group mt-3">
          <input type="tel" placeholder="سال ترم را وارد کنید" class="form-control" ref="year">
        </div>
        <button class="btn btn-outline-secondary" type="submit">فعال سازی</button>
      </form>
      <p class="mt-2">
        بعد از فعال سازی دانشگاه بخش های دانشگاه و امتحان ها برای شما فعال میشود
      </p>
    </div>
    <div v-else>
      <h5>
        بروزرسانی ترم دانشگاه
      </h5>
      <p>
        شماره ترم فعلی شما : <span class="text-info"> {{ $store.state.user.unit }} </span>
      </p>
      <form @submit.prevent="updateUniversity">
        <input type="text" ref="unit" placeholder="شماره ترم جدید را وارد کنید" class="form-control">
        <button type="submit" class="btn btn-outline-secondary mt-3">بروزرسانی</button>
      </form>
    </div>
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
    activeUniversity() {
      const unit = this.$refs.unit.value;
      const year = this.$refs.year.value;
      this.$http.put("Users/activeUniversity", { token: localStorage.getItem("token"), unit, year }).then((response) => {
        this.showErr = false;
        this.$store.state.user.university = true;
        this.$store.state.user.semesterId = response.data.id;
        this.$store.state.user.unit = unit;
        this.$toast.success(response.data.message);
        this.$router.push({ name: "university" }).catch(() => { });
      }).catch((err) => {
        this.showErr = true;
        this.message = err.response.data.message;
        this.$refs.unit.focus();
      })
    },
    updateUniversity() {
      const unit = this.$refs.unit.value;
      this.$http.put("Users/updateUniversity", { token: localStorage.getItem("token"), unit }).then((response) => {
        this.showErr = false;
        this.$toast.success(response.data.message);
        this.$store.state.user.unit = unit;
        this.$store.state.user.semesterId = response.data.id;
        this.$router.push({ name: "university" }).catch(() => { });
      }).catch((err) => {
        this.showErr = true;
        this.message = err.response.data.message;
      })
    }
  },
}
</script>

