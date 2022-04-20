<template>
  <div :id="id">
    <slot></slot>
  </div>
</template>

<script>
import { CupertinoPane } from "cupertino-pane";

export default {
  name: "BottomSheet",
  props: {
    id: String,
    value: Boolean,
  },
  data: () => ({
    panel: null,
  }),
  watch: {
    value(newValue) {
      if (newValue) {
        this.openSheet();
      } else {
        this.closeSheet();
      }
      // console.log(this.panel.isHidden());
    },
  },
  mounted() {
    const settings = {
      breaks: {
        top: { enabled: false },
        middle: { enabled: true },
        bottom: { enabled: false },
      },
      fitHeight: true,
      backdrop: true,
      bottomClose: true,
      onWillPresent: (e) => {
        this.stopScroll();
        this.$emit("input", true);
      },
      onWillDismiss: (e) => {
        this.startScroll();
        this.$emit("input", false);
      },
      onBackdropTap: (e) => {
        this.closeSheetTapBackdrop();
        this.startScroll();
      },
    };
    this.panel = new CupertinoPane(this.$el, settings);
  },

  methods: {
    openSheet() {
      this.panel.present({ animate: true });
    },
    stopScroll() {
      document.body.style.overflowY = "hidden";
      document.body.style.overscrollBehaviorY = "contain";
      document.querySelector("html").style.overflow = "hidden";
    },
    startScroll() {
      document.body.style.overflowY = "auto";
      document.body.style.overscrollBehaviorY = "auto";
      document.querySelector("html").style.overflow = "auto";
    },
    closeSheet() {
      console.log("Закрытие!");
      this.panel.destroy({ animate: true });
    },
    closeSheetTapBackdrop() {
      this.panel.destroy({ animate: true });
      this.$emit("input", false);
      this.startScroll();
    },
  },
};
</script>

<style>
.pane {
  max-width: 100% !important;
}
</style>
