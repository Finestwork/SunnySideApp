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
      <!-- Search Results -->
      <button class="result__btn" type="button" v-for="result in searchResults">
        <span class="btn__flag">
          <img :src="result.flagSrc" :alt="`${result.countryName}'s flag'`" />
        </span>
        <span>{{ result.name }}</span>
      </button>

      <!-- Loader -->
      <div class="result__loader" v-if="shouldDisplayLoading">
        <div class="loader" v-for="n in 5">
          <ContentLoader
            viewBox="0 0 400 20"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="25" y="2.5" rx="3" ry="3" width="300" height="15" />
            <circle cx="10" cy="10" r="10" />
          </ContentLoader>
        </div>
      </div>
      <!-- Not Found -->

      <!-- Error -->
    </div>
  </div>
</template>

<script>
import EventRateLimiter from '../assets/js/Helpers/EventRateLimiter';
import GeoLocation from '../assets/js/Helpers/APIs/GeoLocation';
import PositionHelper from '../assets/js/Helpers/PositionHelper';

// NPM
import { ContentLoader } from 'vue-content-loader';

export default {
  components: {
    ContentLoader,
  },
  data() {
    return {
      searchResults: [],
      isSearchLoading: false,
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

      // If empty string, clear the array
      if (VALUE === '') {
        this.searchPlace = [];
        return;
      }

      // if there's a new search, clear the previous result
      this.isSearchLoading = true;
      this.searchResults = [];

      // Functions to handle the request
      const handleResult = (res) => {
        // If no result found return nothing
        if (!res.data || !res.data.hasOwnProperty('results')) return;

        const createCountryName = (obj) => {
          let name = obj.name === obj.country ? '' : `${obj.name}, `;

          if (obj.hasOwnProperty('admin1')) name += `${obj.admin1}, `;
          if (obj.hasOwnProperty('admin2')) name += `${obj.admin2}, `;
          if (obj.hasOwnProperty('admin3')) name += `${obj.admin3}, `;

          name += obj.country;

          return name;
        };

        // Create a new array
        this.searchResults = res.data.results.map((obj) => {
          return {
            flagSrc: `/images/flags/${obj.country_code.toLowerCase()}.svg`,
            countryName: `${obj.country} flag`,
            name: createCountryName(obj),
          };
        });

        this.this.isSearchLoading = false;
        console.log(res);
      };

      const handleError = (err) => {
        this.isSearchLoading = false;
        console.log(err);
      };

      // Send the request
      GeoLocation.getPlace({ name: VALUE })
        .then(handleResult)
        .catch(handleError);
    },
  },
  computed: {
    shouldDisplayLoading() {
      return this.searchResults.length === 0 && this.isSearchLoading;
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

    .result__loader{
      @include margin.vertical((
        xsm: 13
      ));
      @include margin.horizontal((
        xsm: 10
      ));
      .loader{
        @include margin.bottom((
          xsm: 8
        ));

        &:last-of-type{
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
