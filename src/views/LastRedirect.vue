<template></template>

<script>
export default {
  name: "Last",
  created() {
    const last = this.$store.getters.getLast;
    this.$router.push({ name: last.type, params: { id: last.id } });
  },
};
</script>

<style></style>
