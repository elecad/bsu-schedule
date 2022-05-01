<template>
  <div :id="id">
    <slot></slot>
  </div>
</template>

<script>
import { CupertinoPane } from "cupertino-pane";
import SystemUI from "@/class/SystemUI";

export default {
  name: "BottomSheet",
  props: {
    id: String,
    value: Boolean,
    isNow: Boolean,
  },
  data: () => ({
    panel: null,
    fireFix: navigator.userAgent.includes("Firefox"),
  }),
  watch: {
    value(newValue) {
      if (newValue) {
        this.openSheet();
      } else {
        this.closeSheet();
      }
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
        this.$emit("input", true);

        if (this.fireFix) {
          return;
        }

        this.stopScroll();
      },
      onDidPresent: (e) => {
        if (!this.fireFix) {
          return;
        }

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
      onWillDismiss: (e) => {
        this.$emit("input", false);
        this.startScroll();
      },
      onBackdropTap: (e) => {
        this.closeSheetTapBackdrop();
        this.startScroll();
      },
      onTransitionEnd: () => {
        if (!this.fireFix) {
          return;
        }

        document.body.style.overscrollBehaviorY = null;
        document.querySelector("html").style.overflow = null;
      },
    };
    this.panel = new CupertinoPane(this.$el, settings);
  },

  methods: {
    openSheet() {
      // console.log("fireFix", this.fireFix);

      this.panel.present({ animate: true });
      document.getElementsByClassName("move")[0].style.background = this.isNow
        ? "#5c6bc0"
        : "#c0c0c0";
      if (!this.$store.getters.getSettings.dark) {
        SystemUI.overlayOnTheme(400);
      }
    },
    stopScroll() {
      document.body.style.overscrollBehaviorY = "contain";
      document.querySelector("html").style.overflow = "hidden";
    },
    startScroll() {
      setTimeout(() => {
        document.body.style.overscrollBehaviorY = null;
        document.querySelector("html").style.overflow = null;
      }, 150);
    },
    closeSheet() {
      this.panel.destroy({ animate: true });
      if (!this.$store.getters.getSettings.dark) {
        SystemUI.overlayOffTheme(400);
      }
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
