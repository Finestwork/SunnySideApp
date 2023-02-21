<template>
  <div class="row">
    <div class="col-lg-9">Test</div>
    <div class="col-lg-3">
      <Daily />
    </div>
  </div>
</template>

<script>
import Daily from './sections/Daily.vue';
export default {
  components: {
    Daily,
  },
};
</script>

<style lang="scss">
@use 'sass:map';
@use 'assets/scss/1-Settings/css-properties/colors/text';
@use 'assets/scss/3-Generics/reset-form-fields';
@use 'assets/scss/3-Generics/normalize';
@use 'assets/scss/5-Layouts/columns';

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}
html {
  font-size: 62.5%; // 10px of 16px
  box-sizing: border-box;
}
body {
  font-size: 1.6rem;
  font-family: 'Open Sans', sans-serif;
  overflow-x: hidden;
  background-color: map.get(text.$main, 900);
}

main {
  height: 100vh;
  display: flex;
  align-items: center;
}

.row {
  width: 100%;
}
</style>
