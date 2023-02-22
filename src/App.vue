<template>
  <div class="row">
    <div class="col-xsm-12 col-lg-9">
      <Search @searchPlace="fetchWeather" />
      <Hourly :hourlyData="hourlyData" />
    </div>
    <div class="col-xsm-12 col-lg-3">
      <Daily />
    </div>
  </div>
</template>

<script>
import Search from './sections/Search.vue';
import Daily from './sections/Daily.vue';
import Hourly from './sections/Hourly.vue';

// Helpers
import Weather from './assets/js/Helpers/APIs/Weather';
import DateConversion from './assets/js/Helpers/DateConversion';
import WeatherInterpretation from './assets/js/Helpers/WeatherInterpretation';

export default {
  components: {
    Search,
    Daily,
    Hourly,
  },
  data() {
    return {
      hourlyData: { hourly_units: {}, data: [] },
    };
  },
  mounted() {
    const handleResult = (res) => {
      const DATA = res.data;

      if (Object.keys(DATA).length !== 0) {
        const HOURLY_TIME_LIST = DATA.hourly.time;
        const HOURLY_WEATHER_CODE_LIST = DATA.hourly.weathercode;
        const HOURLY_APPARENT_TEMP = DATA.hourly.apparent_temperature;

        // Create a new set of data
        const HOURLY_DATA_ARR = DATA.hourly.time.map((hour, ind) => {
          const TIME = new Date(hour).toLocaleTimeString('en', {
            timeStyle: 'short',
          });
          const WEATHER_CODE = HOURLY_WEATHER_CODE_LIST[ind];
          const APPARENT_TEMP = HOURLY_APPARENT_TEMP[ind];

          // Get the weather intrepration
          const WEATHER_INTERPRETATION =
            WeatherInterpretation.getImageDataFromWeatherCode(
              hour,
              WEATHER_CODE
            );
          const IMG_SRC = WEATHER_INTERPRETATION.imgSrc;

          return {
            time: TIME,
            apparentTemp: APPARENT_TEMP,
            weatherImgSrc: IMG_SRC,
          };
        });

        // Create a new hour array
        this.hourlyData = Object.assign(
          {},
          {
            hourly_units: DATA.hourly_units,
            data: HOURLY_DATA_ARR,
          }
        );

        console.log(DATA);
        console.log(this.hourlyData);
      }
    };
    const handleError = (err) => {
      console.log(err);
    };

    // Testing
    Weather.getWeather({
      latitude: 14.6,
      longitude: 120.98,
      hourly: 'apparent_temperature,weathercode',
      start_date: DateConversion.toYMD(new Date()),
      end_date: DateConversion.toYMD(new Date()),
    })
      .then(handleResult)
      .catch(handleError);
  },
  methods: {
    fetchWeather({ latitude, longitude }) {
      // Handle the request
      const handleResult = (e) => {
        console.log(e);
      };
      const handleError = (e) => {
        console.log(e);
      };

      // Send request to the server
      Weather.getWeather({ latitude, longitude })
        .then(handleResult)
        .catch(handleError);
    },
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
