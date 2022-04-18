<template>
  <vue-bottom-sheet
    ref="BottomSheet"
    overlay
    click-to-close
    swipe-able
    @closed="closed"
    :id="id"
    background-scrollable
  >
    <v-container fluid class="py-0">
      <slot></slot>
    </v-container>
  </vue-bottom-sheet>
</template>

<script>
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
export default {
  name: "CupertinoSlider",

  props: {
    id: String,
    isOpen: Boolean,
  },

  watch: {
    isOpen(newValue) {
      if (newValue) {
        this.open();
      } else {
        this.close();
      }
    },
  },

  components: { VueBottomSheet },

  data: () => ({}),

  methods: {
    open() {
      this.$refs.BottomSheet.open();
    },
    close() {
      this.$refs.BottomSheet.close();
    },
    closed() {
      this.$emit("close--cupertiono--slider");
    },
  },
};
</script>

<style>
/* .fix--margin--cupertino {
  margin-bottom: 90px;
} */

.bottom-sheet__pan {
  padding-top: 5px !important;
  padding-bottom: 0px !important;
}
.bottom-sheet__bar {
  height: 5px !important;
}
.bottom-sheet__content {
  height: auto !important;
  min-height: 200px;
}

.bottom-sheet__backdrop {
  /* opacity: 1 !important; */
  /* animation: none !important; */
  /* animation-name: none !important; */
}

.bottom-sheet.closed {
  opacity: 1 !important;
}
</style>
