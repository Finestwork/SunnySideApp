<template>
  <div class="search">
    <div class="search__text-input-wrapper" ref="textInputWrapper">
      <input
        ref="searchInput"
        type="text"
        placeholder="Search city name here"
        @focus="onFocus"
        @keyup="searchPlace"
      />
    </div>

    <div class="search__result" ref="searchResult" v-if="isFocused">
      <!-- Search Results -->
      <div class="result__items" v-if="shouldDisplayResultItems">
        <button
          class="result__btn"
          type="button"
          @click="selectPlace"
          :data-index="ind"
          v-for="(result, ind) in searchResults"
        >
          <span class="btn__flag">
            <img :src="result.flagSrc" :alt="`${result.countryName}'s flag'`" />
          </span>
          <span>{{ result.name }}</span>
        </button>
      </div>

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
      <p class="result__search-not-found" v-if="shouldDisplaySearchNotFound">
        Search Not Found
      </p>

      <!-- Error -->
      <p class="result__error" v-if="shouldDisplaySearchError">
        Uh-oh! Can't search, please try again later.
      </p>
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
      searchResultsRaw: [],
      searchResults: [],
      isSearchLoading: false,
      searchNotFound: false,
      searchError: false,
      isFocused: false,
      previousSearch: '',
    };
  },
  created() {
    this.searchPlace = EventRateLimiter.debounce(this.searchPlace, 450);
  },
  mounted() {
    this.attachEventToBody();
  },
  emits: ['searchPlace'],
  methods: {
    // Search place only when key is up
    searchPlace(e) {
      const VALUE = e.target.value.trim();

      // Do nothing VALUE is the same as the previous search
      if (this.previousSearch === VALUE) return;

      // If empty string, clear do not search
      if (VALUE === '') {
        this.resetData();
        this.isSearchLoading = false;
        this.previousSearch = '';
        return;
      }

      // if there's a new search, clear the previous result
      this.resetData();
      this.isSearchLoading = true;
      this.previousSearch = VALUE;

      // Functions to handle the request
      const handleResult = (res) => {
        // If no result found return nothing
        if (!res.data || !res.data.hasOwnProperty('results')) {
          this.isSearchLoading = false;
          this.searchNotFound = true;
          return;
        }

        // Function to properly display the search result
        const createCountryName = (obj) => {
          let name = obj.name === obj.country ? '' : `${obj.name}, `;

          if (obj.hasOwnProperty('admin1')) name += `${obj.admin1}, `;
          if (obj.hasOwnProperty('admin2')) name += `${obj.admin2}, `;
          if (obj.hasOwnProperty('admin3')) name += `${obj.admin3}, `;

          name += obj.country;

          return name;
        };

        // Save the result
        this.searchResultsRaw = res.data.results;

        // Create a new array
        this.searchResults = res.data.results.map((obj) => {
          return {
            flagSrc: `/images/flags/${obj.country_code.toLowerCase()}.svg`,
            countryName: `${obj.country} flag`,
            name: createCountryName(obj),
          };
        });

        this.isSearchLoading = false;
      };

      const handleError = () => {
        this.isSearchLoading = false;
        this.searchNotFound = false;
        this.searchError = true;
      };

      // Send the request
      GeoLocation.getPlace({ name: VALUE })
        .then(handleResult)
        .catch(handleError);
    },

    // Select place to display weather
    selectPlace(e) {
      const BTN = e.currentTarget;
      const IND = parseInt(BTN.dataset.index);

      // Search weather to display
      this.$emit('searchPlace', this.searchResultsRaw[IND]);

      // Reset the component
      this.resetData();
      this.isSearchLoading = false;
      this.previousSearch = '';
    },

    // Show result when search input is focused
    onFocus() {
      this.isFocused = true;
    },

    /*
     * =====================
     * Helpers
     * =====================
     */

    // Hide search result when search input is out of focused
    attachEventToBody() {
      document.body.addEventListener('click', (e) => {
        const TARGET = e.target;
        const { searchInput: SEARCH_INPUT, searchResult: SEARCH_RESULT } =
          this.$refs;
        const IS_OUT_OF_FOCUSED =
          TARGET !== SEARCH_INPUT &&
          !!SEARCH_RESULT &&
          TARGET !== SEARCH_RESULT &&
          !SEARCH_RESULT.contains(TARGET);

        if (IS_OUT_OF_FOCUSED) {
          this.isFocused = false;
        }
      });
    },

    // Resets everything except to loading state
    resetData() {
      this.searchResults = [];
      this.searchResultsRaw = [];
      this.searchNotFound = false;
      this.searchError = false;
    },
  },
  computed: {
    shouldDisplayResultItems() {
      return (
        this.searchResults.length !== 0 &&
        !this.isSearchLoading &&
        !this.searchNotFound &&
        !this.searchError
      );
    },
    shouldDisplayLoading() {
      return (
        this.searchResults.length === 0 &&
        this.isSearchLoading &&
        !this.searchNotFound &&
        !this.searchError
      );
    },
    shouldDisplaySearchNotFound() {
      return (
        this.searchResults.length === 0 &&
        !this.isSearchLoading &&
        this.searchNotFound &&
        !this.searchError
      );
    },
    shouldDisplaySearchError() {
      return (
        this.searchResults.length === 0 &&
        !this.isSearchLoading &&
        !this.searchNotFound &&
        this.searchError
      );
    },
  },
  watch: {
    isFocused(isFocused) {
      if (isFocused) {
        this.$nextTick(() => {
          PositionHelper.caclcTopFromSibling(
            this.$refs.textInputWrapper,
            this.$refs.searchResult,
            10
          );
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../assets/scss/1-Settings/css-properties/font-size/major-second';
@use '../assets/scss/1-Settings/css-properties/colors/text';
@use '../assets/scss/1-Settings/css-properties/colors/main';
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
      background-color: darken(map.get(main.$primary, 200), 75%);
      @include padding.all-sides((
          xsm: 13
      ));
      @include font-size.responsive((
          xsm: map.get(major-second.$scale, 3)
      ));

      &:focus {
        outline: none;
        box-shadow: 0 0 0 4px rgba(map.get(main.$primary, 800), 0.5);
      }

      &:hover,
      &:focus {
        background-color: darken(map.get(main.$primary, 800), 3%);
      }
    }
  }

  &__result {
    overflow: hidden;
    z-index: 999;
    position: absolute;
    left: 0;
    width: 100%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: white;
    font-weight: 600;

    .result__btn {
      width: 100%;
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

      &:hover {
        background-color: map.get(text.$main, 50);
      }

      .btn__flag {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        overflow: hidden;
        position: relative;
        flex-shrink: 0;
        @include margin.right((
            xsm: 6
        ));

        img {
          width: auto;
          height: 100%;
        }
      }
    }

    .result__loader {
      @include margin.vertical((
          xsm: 13
      ));
      @include margin.horizontal((
          xsm: 10
      ));

      .loader {
        @include margin.bottom((
            xsm: 8
        ));

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    .result__error,
    .result__search-not-found {
      text-align: center;
      font-weight: 600;
      color: map.get(text.$main, 300);
      @include font-size.responsive((
          xsm: map.get(major-second.$scale, 4)
      ));
      @include padding.vertical((
          xsm: 15
      ));
    }

  }
}
</style>
