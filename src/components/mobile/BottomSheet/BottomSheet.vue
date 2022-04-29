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
      onDidPresent: (e) => {
        this.stopScroll();
        this.$emit("input", true);
      },
      onWillDismiss: (e) => {
        this.startScroll();
        this.$emit("input", false);
      },
      onBackdropTap: (e) => {
        this.closeSheetTapBackdrop();
      },
      onTransitionEnd: () => {
        this.startScroll();
      },
    };
    this.panel = new CupertinoPane(this.$el, settings);
    document.body.style.overflowY = "auto";
    document.querySelector("html").style.overflow = "auto";
  },

  methods: {
    openSheet() {
      this.panel.present({ animate: true });
      document.getElementsByClassName("move")[0].style.background = this.isNow
        ? "#5c6bc0"
        : "#c0c0c0";
    },
    stopScroll() {
      let backdropEl = document.querySelector(
        ".cupertino-pane-wrapper .backdrop"
      );
      let paneEl = document.querySelector(".cupertino-pane-wrapper .pane");

      if (!backdropEl || !paneEl) return;

      backdropEl.style.touchAction = "none";

      paneEl.addEventListener("touchmove", (e) => {
        if (document.body.style.overscrollBehaviorY == "contain") return;

        document.body.style.overscrollBehaviorY = "contain";
        document.querySelector("html").style.overflow = "hidden";
      });
    },
    startScroll() {
      document.body.style.overscrollBehaviorY = "auto";
      document.querySelector("html").style.overflow = "auto";
    },
    closeSheet() {
      this.panel.destroy({ animate: true });
      this.$emit("input", false);
    },
    closeSheetTapBackdrop() {
      this.panel.destroy({ animate: true });
      this.$emit("input", false);
    },
  },
};
</script>

<style>
.pane {
  max-width: 100% !important;
}
</style>
