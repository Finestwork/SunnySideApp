<template>
  <div class="search">
    <div class="search__text-input-wrapper" ref="textInputWrapper">
      <input
        type="text"
        placeholder="Search city name here"
        @input="searchPlace"
      />
    </div>

    <div class="search__result" ref="searchResult">
      <button class="result__btn" type="button" v-for="result in results">
        <span class="btn__flag">
          <img :src="result.flagSrc" :alt="`${result.countryName}'s flag'`" />
        </span>
        <span>{{ result.name }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import EventRateLimiter from '../assets/js/Helpers/EventRateLimiter';
import GeoLocation from '../assets/js/Helpers/APIs/GeoLocation';
import PositionHelper from '../assets/js/Helpers/PositionHelper';

export default {
  data() {
    return {
      results: [],
    };
  },
  created() {
    this.searchPlace = EventRateLimiter.debounce(this.searchPlace, 450);
  },
  mounted() {
    PositionHelper.caclcTopFromSibling(
      this.$refs.textInputWrapper,
      this.$refs.searchResult,
      10
    );
  },
  methods: {
    searchPlace(e) {
      const VALUE = e.target.value.trim();

      if (VALUE !== '') {
        // Functions to handle the request
        const handleResult = (res) => {
          console.log(res);

          if (!res.data || !res.data.hasOwnProperty('results')) return;
          this.results = res.data.results.map((obj) => {
            return {
              flagSrc: `/images/flags/${obj.country_code.toLowerCase()}.svg`,
              countryName: obj.country,
              name: obj.name,
            };
          });
          console.log(this.results);
        };

        const handleError = (err) => {
          console.log(err);
        };

        // Send the request
        GeoLocation.getPlace({ name: VALUE })
          .then(handleResult)
          .catch(handleError);
      }
      console.log(VALUE);
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../assets/scss/1-Settings/css-properties/font-size/major-second';
@use '../assets/scss/1-Settings/css-properties/colors/text';
@use '../assets/scss/2-Tools/mixins/css-properties/padding';
@use '../assets/scss/2-Tools/mixins/css-properties/font-size';
@use '../assets/scss/2-Tools/mixins/css-properties/margin';

// prettier-ignore
.search {
    position: relative;

  &__text-input-wrapper {
    input[type='text'] {
      font-weight: 600;
      width: 100%;
      border: none;
      border-radius: 8px;
      transition: box-shadow .35s ease-in-out;
      color: map.get(text.$main, 50);
      background-color: map.get(text.$main, 500);
      @include padding.all-sides((
        xsm: 13
      ));
      @include font-size.responsive((
        xsm: map.get(major-second.$scale, 3)
      ));
      &:focus {
        outline: none;
        box-shadow: 0 0 0 4px rgba(map.get(text.$main, 500), 0.5);
      }

      &:hover,
      &:focus{
        background-color: darken(map.get(text.$main, 500), 3%);
      }
    }
  }

  &__result{
    overflow: hidden;
    position: absolute;
    left: 0;
    width: 100%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: white;
    font-weight: 600;

    .result__btn{
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
        border: none;
        background-color: white;
        overflow: hidden;
        align-items: center;
        color: map.get(text.$main, 700);
        @include padding.all-sides((
            xsm: 10
        ));

        &:hover{
            background-color: map.get(text.$main, 50);
        }

        .btn__flag{
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          overflow: hidden;
          position: relative;
          @include margin.right((
            xsm: 6
          ));
          img{
            width: auto;
            height: 100%;
          }
        }
    }
  }
}
</style>
