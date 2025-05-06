<template>
  <div>
    <div class="d-flex align-center">
      <v-autocomplete
        @change="goNewSchedule"
        v-model.trim="select"
        :search-input.sync="searchText"
        :items="autocomplete"
        :loading="loading"
        dense
        filled
        :no-data-text="noResultText"
        hide-details
        :hide-no-data="hideNoData || loading"
        :placeholder="placholder"
        :prepend-inner-icon="innerIcon"
        :append-icon="''"
        solo
        flat
        no-filter
      ></v-autocomplete>
    </div>
  </div>
</template>

<script>
import SearchAPI from '@/class/SearchAPI';

export default {
  name: 'Search',
  data: () => ({
    loading: false,
    hideNoData: false,
    isSearch: false,
    heightAppBar: '75px',
    heightInput: '50px',
    placholder: 'Поиск...',
    noResultText: 'Необходимо 3 или более символов',
    innerIcon: 'mdi-magnify',
    overlayOpacity: '0.2',
    autocomplete: [],

    searchText: null,
    select: null,

    timeout: null,
    abortController: null,
  }),
  computed: {},
  watch: {
    searchText(val) {
      clearTimeout(this.timeout);

      if (this.abortController) {
        this.abortController.abort();
        this.abortController = null;
      }

      if (val == null) return;

      if (val.length < 3) {
        this.loading = false;
        this.hideNoData = false;
        this.noResultText = 'Необходимо 3 или более символов';
        this.autocomplete = [];

        return;
      }
        
      this.hideNoData = true;

      if (val !== this.select) {
        this.search(val);
      }
    },
    isSearch(newValue) {
      if (newValue) {
        this.stopScroll();
      } else {
        this.startScroll();
      }
    },
  },
  methods: {
    search(value) {
      this.timeout = setTimeout(() => {
        this.loading = true;

        if (this.abortController) {
          this.abortController.abort();
        }
        
        this.abortController = new AbortController();
        fetch('/schedule/search?q='+value.trim(), { signal: this.abortController.signal })
          .then(r => {
            if (!r.ok) {
              throw 'fetch error';
            }

            return r.json();
          })
          .then(r => {
            const fu = { t: 'teacher', g: 'group', a: 'location' };

            this.autocomplete = r.map(v => {
              return { text: v.name, value: { id: v.id, label: v.name, type: fu[v.type]}};
            });

            this.noResultText = 'Ничего не найдено :(';
            this.hideNoData = false;
            this.loading = false;
          })
          .catch(e => {
            if (e && e.name == 'AbortError') {
              return;
            }

            console.error(e);

            SearchAPI.query({
              query: value,
              setFunction: this.setResultFunction,
            });
          });
      }, 500);
    },

    setResultFunction(obj) {
      if (obj.text == 'Идёт поиск...' && !obj.result.length) {
        this.noResultText = obj.text;

        return;
      }

      this.hideNoData = false;
      this.loading = false;
      this.noResultText = obj.text;
      this.autocomplete = obj.result;
    },

    changeTheme() {
      this.$store.commit('CHANGE_THEME');
      this.$vuetify.theme.dark = this.$store.getters.getTheme;
    },

    goNewSchedule(value) {
      if (value) {
        if (
          !(
            this.$router.currentRoute.name == value.type &&
            this.$router.currentRoute.params.id == value.id
          )
        ) {
          this.$router.push({ name: value.type, params: { id: value.id } });
        }
        this.isSearch = false;
        this.select = '';
        this.searchText = '';
        this.autocomplete = [];
      }
    },
    stopScroll() {
      document.body.style.overscrollBehaviorY = 'contain';
      document.querySelector('html').style.overflow = 'hidden';
    },
    startScroll() {
      document.body.style.overscrollBehaviorY = 'auto';
      document.querySelector('html').style.overflow = 'auto';
    },
  },
};
</script>

<style></style>
