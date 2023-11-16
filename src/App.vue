<template>
  <section id="app">
    <transition appear enter-active-class="animate__animated animate__fadeIn" mode="out-in">
      <router-view></router-view>
    </transition>
    <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793"
      opacity="80" name="spinning" v-show="$store.state.showLoad"></loader>
  </section>
</template>

<script>
export default {
  created() {
    const hasDarkPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (hasDarkPreference == true) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    // (hasDarkPreference == true) ? document.body.classList.add("dark") : document.body.classList.remove("dark");
  },
};
</script>

<style></style>