<template>
  <aside class="daily-forecast">
    <h2 class="daily-forecast__title">7-Day Forecast</h2>
    <ul class="daily-forecast__list" v-if="shouldDisplayMainContent">
      <li class="daily-forecast__list-item" v-for="data in forecast">
        <span class="daily-forecast__day">{{ data.time }}</span>
        <span class="daily-forecast__img-wrapper">
          <span class="daily-forecast__img">
            <img :src="data.imgSrc" alt="Weather Image" />
          </span>
          <span class="daily-forecast__weather">{{
            data.imgInterpretation
          }}</span>
        </span>
        <span class="daily-forecast__temperature"
          >{{ data.apparentTemperature }}°C</span
        >
      </li>
    </ul>
    <p class="daily-forecast__empty-state" v-if="shouldDisplayEmptyContent">
      No data to display
    </p>
    <Loader class="daily-forecast__loader" v-if="shouldDisplayLoader" />
  </aside>
</template>

<script>
import Loader from '../components/Loader.vue';

export default {
  components: {
    Loader,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    forecast: {
      type: Array,
      required: true,
    },
  },
  computed: {
    shouldDisplayMainContent() {
      return this.forecast.length !== 0 && !this.isLoading;
    },
    shouldDisplayEmptyContent() {
      return this.forecast.length === 0 && !this.isLoading;
    },
    shouldDisplayLoader() {
      return this.forecast.length === 0 && this.isLoading;
    },
  },
};
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
@use '../assets/scss/2-Tools/mixins/css-properties/all-properties';

// prettier-ignore
.daily-forecast {
  border-radius: 20px;
  background-color: darken(map.get(main.$primary, 200), 75%);
  @include all-properties.init((
      xsm: (
          max-width: 500px
      ),
      xl: unset
  ));
  @include margin.top((
      xsm: 35,
      xl: 0
  ));
  @include padding.all-sides((
      xsm: [20, 25]
  ));

  &__title {
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

  &__list {
    list-style: none;

    &-item {
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

      &:last-of-type {
        margin-bottom: 0;
        padding-bottom: 0;
        border: none;
      }
    }
  }

  &__empty-state{
    font-weight: 500;
    text-align: center;
    font-style: italic;
    color: map.get(main.$primary, 700);
    @include font-size.responsive((
        xsm: map.get(major-second.$scale, 4)
    ));
  }

  &__loader{
    margin-left: auto;
    margin-right: auto;
  }

  &__empty-state,
  &__loader{
    @include margin.top((
        xsm: 20
    ));
  }

  &__day {
    color: map.get(text.$main, 100);
  }

  &__img-wrapper {
    display: flex;
    align-items: center;
  }

  &__img {
    @include width-and-height.set((
        xsm: (width: 35px)
    ));
    @include margin.right((
        xsm: 7
    ));

    > img {
      width: 100%;
    }
  }

  &__temperature {
    width: 50px;
    text-align: right;
    color: map.get(main.$primary, 500);
  }

  &__day {
    width: 30px;
  }

  &__day,
  &__weather {
    color: map.get(text.$main, 100);
  }

  &__day,
  &__temperature,
  &__weather {
    font-weight: 600;
  }

}
</style>
