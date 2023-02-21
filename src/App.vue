<template>
  <div class="row">
    <div class="col-lg-9">
      <Search />
    </div>
    <div class="col-lg-3">
      <Daily />
    </div>
  </div>
</template>

<script>
import Search from './sections/Search.vue';
import Daily from './sections/Daily.vue';

export default {
  components: {
    Search,
    Daily,
  },
};
</script>

<style lang="scss">
@use 'sass:map';
@use 'assets/scss/1-Settings/css-properties/colors/text';
@use 'assets/scss/2-Tools/mixins/css-properties/padding';
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

// prettier-ignore
main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  @include padding.vertical((
      xsm: 20
  ));
}

.row {
  width: 100%;
}
</style>
