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
    isNow: Boolean,
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
        this.$emit("input", false);
        this.startScroll();
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
      document.getElementsByClassName("move")[0].style.background = this.isNow
        ? "#5c6bc0"
        : "#c0c0c0";
    },
    stopScroll() {
      document.body.style.overscrollBehaviorY = "contain";
      document.querySelector("html").style.overflow = "hidden";
    },
    startScroll() {
      setTimeout(() => {
        document.body.style.overscrollBehaviorY = "auto";
        document.querySelector("html").style.overflow = "auto";
      }, 150);
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
