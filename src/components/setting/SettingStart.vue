<template>
  <div class="settingStart">
    <h3 class="text-center">
      تنظیمات
    </h3>
    <p>
      در این بخش میتوانید تنظیمات برنامه خود را مشاهده و تغییر بدهید , برای وارد شدن به هر بخش مورد نظر روی آن کلیک کنید
    </p>
    <setting-menu></setting-menu>
  </div>
</template>

<script>
import SettingMenu from './SettingMenu.vue'
export default {
  components: { SettingMenu },
}
</script>

