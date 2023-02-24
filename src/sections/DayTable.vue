<template>
  <div :class="getRootWrapperClass">
    <div v-if="canDisplayData">
      <div class="day-table__img-wrapper">
        <span class="img-bg"></span>
        <span class="img">
          <img :src="dayInfo.imgSrc" alt="test" />
        </span>
      </div>

      <ul class="day-table__list">
        <!-- Sun Rise -->
        <li class="day-table__list-item">
          <span class="list__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M62.41 432h105.5c18.99-46.79 64.29-80.01 117.9-80.01s98.9 33.23 117.9 80.01h105.5l29.85-43.02c6.332-9.127 1.104-21.75-9.826-23.72l-109-19.7L400.6 236.5c-1.975-10.93-14.59-16.16-23.72-9.826l-91.01 63.16l-91.01-63.16c-9.125-6.334-21.74-1.107-23.72 9.826l-19.7 109L42.39 365.3c-10.93 1.977-16.16 14.6-9.826 23.72L62.41 432zM203.3 432h165c-16.56-28.59-47.1-48.01-82.52-48.01S219.9 403.4 203.3 432zM551.1 463.1H24C10.8 463.1 0 474.8 0 487.1C0 501.2 10.8 512 24 512H551.1C565.2 512 576 501.2 576 487.1C576 474.8 565.2 463.1 551.1 463.1zM227.1 121L256 98.58V192c0 17.69 14.33 32 32 32s32-14.31 32-32V98.58L348 121c13.77 11.03 33.92 8.75 44.97-5c11.05-13.81 8.812-33.94-5-45l-80-64c-1.459-1.162-3.166-1.746-4.76-2.621c-1.266-.7012-2.385-1.535-3.748-2.062C295.8 .8867 291.9 0 288 0S280.2 .8867 276.5 2.316C275.2 2.844 274 3.678 272.8 4.379C271.2 5.254 269.5 5.838 268 7l-80 64C174.2 82.06 171.1 102.2 183 116C194 129.8 214.2 132 227.1 121z"
              />
            </svg>
          </span>
          <span class="list__label">Sunrise</span>
          <span class="list__value">{{ dayInfo.sunrise }}</span>
        </li>

        <!-- Sunset -->
        <li class="day-table__list-item">
          <span class="list__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M62.41 432h105.5c18.99-46.79 64.29-80.01 117.9-80.01s98.9 33.23 117.9 80.01h105.5l29.85-43.02c6.332-9.127 1.104-21.75-9.826-23.72l-109-19.7L400.6 236.5c-1.975-10.93-14.59-16.16-23.72-9.826l-91.01 63.16l-91.01-63.16c-9.125-6.334-21.74-1.107-23.72 9.826l-19.7 109L42.39 365.3c-10.93 1.977-16.16 14.6-9.826 23.72L62.41 432zM203.3 432h165c-16.56-28.59-47.1-48.01-82.52-48.01S219.9 403.4 203.3 432zM551.1 463.1H24C10.8 463.1 0 474.8 0 487.1C0 501.2 10.8 511.1 24 511.1H551.1c13.2 0 24-10.8 24-24C576 474.8 565.2 463.1 551.1 463.1zM268 217c1.459 1.162 3.166 1.746 4.76 2.621c1.266 .7012 2.385 1.535 3.748 2.062C280.2 223.1 284.1 224 288 224s7.771-.8867 11.48-2.316c1.363-.5273 2.482-1.361 3.748-2.062c1.594-.875 3.301-1.459 4.76-2.621l80-64c13.81-11.06 16.05-31.19 5-45c-11.02-13.81-31.19-16.03-44.97-5L320 125.4V32c0-17.69-14.33-32-32-32S256 14.31 256 32v93.42L227.1 103C214.2 91.97 194.1 94.25 183 108c-11.05 13.81-8.812 33.94 5 45L268 217z"
              />
            </svg>
          </span>
          <span class="list__label">Sunset</span>
          <span class="list__value">{{ dayInfo.sunset }}</span>
        </li>

        <!-- Windspeed -->
        <li class="day-table__list-item">
          <span class="list__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M32 192h320c52.94 0 96-43.06 96-96s-43.06-96-96-96h-32c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c17.66 0 32 14.34 32 32s-14.34 32-32 32H32C14.31 128 0 142.3 0 160S14.31 192 32 192zM160 320H32c-17.69 0-32 14.31-32 32s14.31 32 32 32h128c17.66 0 32 14.34 32 32s-14.34 32-32 32H128c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c52.94 0 96-43.06 96-96S212.9 320 160 320zM416 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h384c17.66 0 32 14.34 32 32s-14.34 32-32 32h-32c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c52.94 0 96-43.06 96-96S468.9 224 416 224z"
              />
            </svg>
          </span>
          <span class="list__label">Windspeed</span>
          <span class="list__value">{{ dayInfo.windspeed }} km/h</span>
        </li>

        <!-- Temperature Up -->
        <li class="day-table__list-item">
          <span class="list__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M159.1 322.9V112C159.1 103.1 152.9 96 144 96C135.1 96 128 103.1 128 112v210.9c-22 7.875-35.25 30.38-31.25 53.38C100.6 399.4 120.6 416.1 144 416.1c23.37 0 43.37-16.71 47.25-39.83C195.2 353.3 181.1 330.8 159.1 322.9zM255.1 112C255.1 50.13 205.9 0 144 0C82.13 0 32 50.13 32 112v166.5C12.25 303.3 0 334 0 368C0 447.5 64.5 512 144 512c79.5 0 143.1-64.5 143.1-144c0-34-12.25-64.88-32-89.5V112zM219.9 393.4C208.1 426.1 178.4 447.1 144 447.1c-34.38 0-65-21.84-75.88-54.59C57.25 360.8 68.5 324.9 96 304.3V112c0-26.5 21.5-48.01 48-48.01c26.5 0 47.1 21.51 47.1 48.01v192.3C219.5 324.9 230.7 360.8 219.9 393.4zM504.1 124l-64-80c-12.12-15.19-37.84-15.19-49.97 0l-64 80c-11.05 13.81-8.812 33.94 5 45c13.75 11.03 33.94 8.781 44.97-5L384 155.2V448c0 17.69 14.33 32 32 32s32-14.31 32-32V155.2L455 164c6.312 7.906 15.61 12 25 12c7.016 0 14.08-2.281 19.97-7C513.8 157.9 516 137.8 504.1 124z"
              />
            </svg>
          </span>
          <span class="list__label">Maximum Apparent Temperature</span>
          <span class="list__value">{{ dayInfo.apparentTemp.max }} °C</span>
        </li>

        <!-- Temperature Down -->
        <li class="day-table__list-item">
          <span class="list__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M159.1 322.9l-.0002-18.92C159.1 295.1 152.9 287.1 144 287.1c-8.875 0-15.1 7.115-15.1 15.99L128 322.9c-22 7.875-35.25 30.38-31.25 53.38C100.6 399.4 120.6 416.1 144 416.1c23.37 0 43.37-16.71 47.25-39.83C195.2 353.3 181.1 330.8 159.1 322.9zM255.1 112C255.1 50.13 205.9 0 144 0C82.13 0 32 50.13 32 112v166.5C12.25 303.3 0 334 0 368C0 447.5 64.5 512 144 512c79.5 0 143.1-64.5 143.1-144c0-34-12.25-64.88-32-89.5V112zM219.9 393.4C208.1 426.1 178.4 447.1 144 447.1c-34.38 0-65-21.84-75.88-54.59C57.25 360.8 68.5 324.9 96 304.3V112C96 85.5 117.5 64 144 64c26.5 0 47.1 21.5 47.1 48v192.3C219.5 324.9 230.7 360.8 219.9 393.4zM499.1 343c-13.77-11.03-33.92-8.75-44.97 5L448 356.8V64c0-17.69-14.33-32-32-32s-32 14.31-32 32v292.8L376.1 348c-11.03-13.81-31.19-16.03-44.97-5c-13.81 11.06-16.05 31.19-5 45l64 80C397.1 475.6 406.3 480 416 480s18.92-4.406 24.98-12l64-80C516 374.2 513.8 354.1 499.1 343z"
              />
            </svg>
          </span>
          <span class="list__label">Minimum Apparent Temperature</span>
          <span class="list__value">{{ dayInfo.apparentTemp.min }} °C</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dayInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getRootWrapperClass() {
      let BASE = 'day-table';
      BASE += this.dayInfo.isDay ? ' daytime' : ' nighttime';

      console.log(this.dayInfo.isDay);
      return BASE;
    },
    canDisplayData() {
      return Object.keys(this.dayInfo).length;
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../assets/scss/1-Settings/css-properties/font-size/major-second';
@use '../assets/scss/1-Settings/css-properties/colors/main';
@use '../assets/scss/1-Settings/css-properties/colors/text';
@use '../assets/scss/2-Tools/mixins/css-properties/margin';
@use '../assets/scss/2-Tools/mixins/css-properties/font-size';
@use '../assets/scss/2-Tools/mixins/css-properties/padding';
@use '../assets/scss/2-Tools/mixins/css-properties/all-properties';

// prettier-ignore
.day-table {
  @include margin.top((
      xsm: 15
  ));
  @include all-properties.init((
      xsm: (
          display: flex,
          flex-direction: column,
          align-items: center
      ),
      xl: (
          flex-direction: row,
      )
  ));

  /* States */
  &.daytime {
    .day-table__img-wrapper .img-bg {
      background: radial-gradient(rgba(255, 233, 5, 0.15), rgba(255, 233, 5, 0));
    }
  }

  &.nighttime {
    .day-table__img-wrapper .img-bg {
      background: radial-gradient(rgba(5, 9, 255, 0.25), rgba(5, 9, 255, 0));
    }
  }

  /* Children */
  &__img-wrapper {
    position: relative;
    width: 250px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    @include margin.right((
        xl: 35
    ));

    .img-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      width: 150%;
      height: 150%;
      z-index: -1;
      border-radius: 50%;
      filter: blur(40px);
    }

    .img {
      display: flex;
      width: 250px;

      > img {
        width: 100%;
      }
    }
  }

  &__list {
    @include all-properties.init((
        xsm: (
            display: flex,
            flex-wrap: wrap,
            list-style: none,
            justify-content: center
        ),
        xl: (
            justify-content: flex-start
        )
    ))
  }

  &__list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid map.get(main.$primary, 900);
    @include padding.bottom((
        xsm: 4
    ));
    @include padding.horizontal((
        xsm: 10
    ));
    @include margin.bottom((
        xsm: 35
    ));

    .list {
      &__value {
        flex-shrink: 0;
        @include margin.left((
            xsm: 20
        ));
      }

      &__value,
      &__label {
        font-weight: 700;
        color: map.get(main.$primary, 900);
        @include font-size.responsive((
            xsm: map.get(major-second.$scale, 2)
        ));
      }

      &__icon {
        @include all-properties.init((
            xsm: (
                display: flex,
                flex-shrink: 0,
                width: 15px,
                height: 15px,
                fill: map.get(main.$primary, 900),
            )
        ));
        @include margin.right((
            xsm: 8
        ));

        > img {
          width: 100%;
        }
      }
    }
  }
}
</style>
