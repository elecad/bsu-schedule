<template>
  <div>
    <group-mobile-view class="hidden-md-and-up"></group-mobile-view>
    <group-desktop-view class="hidden-sm-and-down"></group-desktop-view>
    <!-- 
    <h3 class="hidden-sm-and-down">PC</h3>
    <h3 class="hidden-md-and-up">Mobile</h3> -->
  </div>
</template>

<script>
import groupMobileView from "@/views/group/mobile/GroupMobileView.vue";
import groupDesktopView from "@/views/group/desktop/GroupDesktopView.vue";
export default {
  name: "GroupMain",
  components: { groupMobileView, groupDesktopView },
};
</script>

<style></style>
