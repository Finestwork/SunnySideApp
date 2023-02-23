<template>
  <aside class="daily-forecast">
    <h2 class="daily-forecast__title">7-Day Forecast</h2>
    <ul class="daily-forecast__list">
      <li class="daily-forecast__list-item" v-for="data in forecast">
        <span class="daily-forecast__day">{{data.time}}</span>
        <span class="daily-forecast__img-wrapper">
          <span class="daily-forecast__img">
            <img :src="data.imgSrc" alt="Weather Image" />
          </span>
          <span class="daily-forecast__weather">{{data.imgInterpretation}}</span>
        </span>
        <span class="daily-forecast__temperature">{{data.temperature.max}}°C</span>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    forecast: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../assets/scss/1-Settings/css-properties/colors/text';
@use '../assets/scss/1-Settings/css-properties/colors/main';
@use '../assets/scss/1-Settings/css-properties/font-size/major-second';
@use '../assets/scss/2-Tools/mixins/css-properties/width-and-height';
@use '../assets/scss/2-Tools/mixins/css-properties/font-size';
@use '../assets/scss/2-Tools/mixins/css-properties/padding';
@use '../assets/scss/2-Tools/mixins/css-properties/margin';

// prettier-ignore
.daily-forecast{
  border-radius: 20px;
  background-color: darken(map.get(main.$primary, 200), 75%);
  @include padding.all-sides((
      xsm: [20, 25]
  ));

  &__title{
    font-weight: 700;
    text-transform: uppercase;
    color: map.get(main.$primary, 100);
    @include font-size.responsive((
        xsm: map.get(major-second.$scale, 4)
    ));
    @include margin.bottom((
        xsm: 35
    ));
  }

  &__list{
    list-style: none;
    &-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid map.get(text.$main, 400);
      @include font-size.responsive((
        xsm: map.get(major-second.$scale, 3)
    ));
      @include padding.bottom((
          xsm: 15
      ));
      @include margin.bottom((
          xsm: 35
      ));

      &:last-of-type{
        margin-bottom: 0;
        padding-bottom: 0;
        border: none;
      }
    }
  }

  &__day{
    color: map.get(text.$main, 100);
  }

  &__img-wrapper{
    display: flex;
    align-items: center;
  }

  &__img{
    @include width-and-height.set((
      xsm: (width: 35px)
    ));
    @include margin.right((
        xsm: 7
    ));
    > img{
      width: 100%;
    }
  }

  &__temperature{
    width: 50px;
    text-align: right;
    color: map.get(main.$primary, 500);
  }
  &__day{
    width: 30px;
  }

  &__day,
  &__weather{
    color: map.get(text.$main, 100);
  }

  &__day,
  &__temperature,
  &__weather{
    font-weight: 600;
  }

}
</style>
