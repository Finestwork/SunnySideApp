<template>
  <div class="row">
    <div class="col-xsm-12 col-xl-9">
      <Search @searchPlace="fetchWeather" />
      <DayTable :dayInfo="dayInfo" />
      <Hourly :hourlyData="hourlyData" :isLoading="isLoading" />
    </div>
    <div class="col-xsm-12 col-xl-3">
      <Daily :forecast="dailyForecast" :isLoading="isLoading" />
    </div>
  </div>
</template>

<script>
import Search from './sections/Search.vue';
import Daily from './sections/Daily.vue';
import Hourly from './sections/Hourly.vue';
import DayTable from './sections/DayTable.vue';

// Helpers
import Weather from './assets/js/Helpers/APIs/Weather';
import DateConversion from './assets/js/Helpers/DateConversion';
import WeatherInterpretation from './assets/js/Helpers/WeatherInterpretation';
import DailyForecast from './assets/js/Helpers/DailyForecast';
import DayInfo from './assets/js/Helpers/DayInfo';

export default {
  components: {
    Search,
    Daily,
    Hourly,
    DayTable,
  },
  data() {
    return {
      hourlyData: {},
      dayInfo: {},
      dailyForecast: [],
      isLoading: false,
    };
  },
  methods: {
    fetchWeather({ latitude, longitude, timezone }) {
      this.isLoading = true;

      const handleHourlyDataRequest = (res) => {
        const DATA = res.data;

        if (Object.keys(DATA).length !== 0) {
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
        }
      };
      const handleDailyDataRequest = (res) => {
        this.dailyForecast = DailyForecast.extractData(res.data);
        this.dayInfo = DayInfo.extractData(res.data);
        this.isLoading = false;
      };
      const handleGeneralError = () => {
        this.isLoading = false;
        const TOAST_MSG =
          "Unfortunately, you can't search for now, Please try again later.";
        const TOAST_OPTIONS = {
          duration: 3000,
        };

        this.$toast.error(TOAST_MSG, TOAST_OPTIONS);
      };

      const HOURLY_REQUEST = Weather.getWeather({
        latitude: latitude,
        longitude: longitude,
        timezone: timezone,
        hourly: 'apparent_temperature,weathercode',
        start_date: DateConversion.toYMD(new Date()),
        end_date: DateConversion.toYMD(new Date()),
      });
      const DAILY_REQUEST = Weather.getWeather({
        latitude: latitude,
        longitude: longitude,
        timezone: timezone,
        daily:
          'weathercode,apparent_temperature_max,apparent_temperature_min,temperature_2m_min,sunrise,sunset,windspeed_10m_max',
        start_date: DateConversion.toYMD(new Date()),
        end_date: DateConversion.toYMD(DateConversion.addDate(6)),
      });

      Promise.all([HOURLY_REQUEST, DAILY_REQUEST])
        .then(([hourlyData, dailyData]) => {
          handleHourlyDataRequest(hourlyData);
          handleDailyDataRequest(dailyData);
        })
        .catch(handleGeneralError);
    },
  },
};
</script>

<style lang="scss">
@use 'sass:map';
@use 'assets/scss/1-Settings/css-properties/font-size/major-second';
@use 'assets/scss/1-Settings/css-properties/colors/safety';
@use 'assets/scss/1-Settings/css-properties/colors/text';
@use 'assets/scss/1-Settings/css-properties/colors/main';
@use 'assets/scss/2-Tools/mixins/css-properties/padding';
@use 'assets/scss/2-Tools/mixins/css-properties/font-size';
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
  color: map.get(text.$main, 800);
  font-family: 'Open Sans', sans-serif;
  overflow-x: hidden;
  background-color: map.get(main.$primary, 50);
}

// prettier-ignore
main {
  min-height: 100vh;
  display: flex;
  @include padding.horizontal((
    xsm: 35
  ));
  @include padding.vertical((
      xsm: 20
  ));
}

.row {
  width: 100%;
}

// prettier-ignore
.v-toast__item {
  &.v-toast__item--error{
    background-color: map.get(safety.$danger, 500);

    .v-toast {
      &__icon {
        display: none;
      }
      &__text {
        font-weight: 600;
        @include font-size.responsive((
            xsm: map.get(major-second.$scale, 3)
        ));
      }
    }
  }

}
</style>
