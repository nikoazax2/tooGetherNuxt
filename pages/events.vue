<template>
  <p>{{ events }}</p>
</template>

<script>
export default {
  data() {
    return { events: [] };
  },
  async fetch() {
    let res = await this.$axios.get("/activities");
    this.events = res.data;
  }
};
</script>

<style></style>
