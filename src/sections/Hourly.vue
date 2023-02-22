<template>
  <div class="hourly">
    <Splide
      :options="splideOptions"
      @splide:drag="onSplideDrag"
      @splide:dragged="onSplideDragged"
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
  </div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
export default {
  components: {
    Splide,
    SplideSlide,
  },
  props: {
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
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../assets/scss/1-Settings/css-properties/font-size/major-second';
@use '../assets/scss/1-Settings/css-properties/colors/text';
@use '../assets/scss/2-Tools/mixins/css-properties/margin';
@use '../assets/scss/2-Tools/mixins/css-properties/padding';
@use '../assets/scss/2-Tools/mixins/css-properties/font-size';

// prettier-ignore
.hourly {
  padding: .1rem;
  overflow: hidden;
  background-color: map.get(text.$main, 500);
  border-radius: 8px;
  @include margin.top((
    xsm: 25
  ));

  &__time{
    white-space: nowrap;
    font-weight: 600;
    color: map.get(text.$main, 300);
    @include font-size.responsive((
      xsm: map.get(major-second.$scale, 4)
    ));
  }

  &__temperature{
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

  &::v-deep .splide{
    cursor: grab;
    list-style: none;
    display: flex;
    @include margin.all-sides((
      xsm: [20, 10]
    ));
    &__track{
      width: 100%;
    }
    &__list{
      display: flex;
    }
    &__slide{
      display: flex;
      flex-direction: column;
      align-items: center;
      border-right: 2px solid map.get(text.$main, 400);
      @include margin.right((
        xsm: 25
      ));
      @include padding.left((
        xsm: 35
      ));
      @include padding.right((
        xsm: 35
      ));
      @include padding.vertical((
        xsm: 7
      ));

      &:last-of-type{
        border-right: 0;
      }
    }
  }

  /* States */
  .hourly--dragging{
    user-select: none;
    cursor: grabbing;
  }

}
</style>
