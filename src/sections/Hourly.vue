<template>
  <section class="hourly">
    <h2 class="hourly__title">Hourly Forecast</h2>
    <Splide
      :options="splideOptions"
      @splide:drag="onSplideDrag"
      @splide:dragged="onSplideDragged"
      v-if="shouldDisplayMainContent"
    >
      <SplideSlide v-for="(data, ind) in hourlyData.data" :key="data">
        <span class="hourly__time">{{ data.time }}</span>
        <span class="hourly__img">
          <img :src="data.weatherImgSrc" alt="Image of the current weather" />
        </span>
        <span class="hourly__temperature"
          >{{ data.apparentTemp }}
          {{ hourlyData.hourly_units.apparent_temperature }}</span
        >
      </SplideSlide>
    </Splide>
    <p class="hourly__empty-state" v-if="shouldDisplayEmptyContent">
      No data to display
    </p>
    <Loader class="hourly__loader" v-if="shouldDisplayLoader" />
  </section>
</template>

<script>
import Loader from '../components/Loader.vue';

// NPM
import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default {
  components: {
    Loader,
    Splide,
    SplideSlide,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    hourlyData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      splideOptions: {
        controls: false,
        arrows: false,
        pagination: false,
        live: false,
        autoWidth: true,
      },
    };
  },
  methods: {
    onSplideDrag(e) {
      const ROOT = e.root;
      ROOT.classList.add('hourly--dragging');
    },
    onSplideDragged(e) {
      const ROOT = e.root;
      ROOT.classList.remove('hourly--dragging');
    },
  },
  computed: {
    shouldDisplayMainContent() {
      return Object.keys(this.hourlyData).length !== 0 && !this.isLoading;
    },
    shouldDisplayEmptyContent() {
      return Object.keys(this.hourlyData).length === 0 && !this.isLoading;
    },
    shouldDisplayLoader() {
      return Object.keys(this.hourlyData).length === 0 && this.isLoading;
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../assets/scss/1-Settings/css-properties/font-size/major-second';
@use '../assets/scss/1-Settings/css-properties/colors/text';
@use '../assets/scss/1-Settings/css-properties/colors/main';
@use '../assets/scss/2-Tools/mixins/css-properties/margin';
@use '../assets/scss/2-Tools/mixins/css-properties/padding';
@use '../assets/scss/2-Tools/mixins/css-properties/font-size';

// prettier-ignore
.hourly {
  padding: .1rem;
  overflow: hidden;
  background-color: darken(map.get(main.$primary, 200), 75%);
  border-radius: 20px;
  @include margin.top((
      xsm: 25,
  ));
  @include padding.vertical((
      xsm: 25
  ));

  &__title {
    font-weight: 700;
    color: map.get(main.$primary, 100);

    @include margin.left((
        xsm: 20
    ));
  }

  &__time {
    white-space: nowrap;
    font-weight: 600;
    color: map.get(main.$secondary, 500);
    @include font-size.responsive((
        xsm: map.get(major-second.$scale, 4)
    ));
  }

  &__temperature {
    font-weight: 700;
    color: white;
    @include font-size.responsive((
        xsm: map.get(major-second.$scale, 5) - 3
    ));
  }

  &__img {
    width: 50px;
    display: flex;
    @include margin.vertical((
        xsm: 15
    ));

    > img {
      width: 100%;
      pointer-events: none;
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

  & :deep() {
    .splide {
      cursor: grab;
      list-style: none;
      display: flex;
      @include margin.top((
          xsm: 30
      ));

      &__track {
        width: 100%;
      }

      &__list {
        display: flex;
      }

      &__slide {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        width: 185px;
        border-right: 2px solid map.get(text.$main, 400);
        @include padding.vertical((
            xsm: 7
        ));

        &:last-of-type {
          border-right: 0;
        }
      }
    }
  }

  /* States */
  .hourly--dragging {
    user-select: none;
    cursor: grabbing;
  }
}
</style>
