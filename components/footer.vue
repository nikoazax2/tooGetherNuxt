<template>
  <div class="lefooter">
    <div class="conteneur">
      <div class="myevents" @click="goto('/myevents')">
        <v-icon>
          mdi-archive-star
        </v-icon>
      </div>
      <div class="maps" @click="goto('/')">
        <v-icon>
          mdi-home
        </v-icon>
      </div>
      <div class="recherche" @click="goto('/recherchevent')">
        <v-icon>
          mdi-search-web
        </v-icon>
      </div>
      <div class="maps" @click="goto('/map')">
        <v-icon>
          mdi-map
        </v-icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  computed: {},
  created: function() {},
  data: function() {
    return {};
  },
  components: {},
  methods: {
    goto(route) {
      this.$router.push(route);
    }
  },
  watch: {}
};
</script>
<style lang="scss">
* {
  font-family: "Noto Sans", sans-serif;
}
.body {
  height: 20px;
}
.lefooter {
  position: fixed;
  height: 40px;
  background-color: #65c9ff;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 10000;
}
.conteneur {
  display: inline-flex;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  i {
    color: white !important;
    font-size: 30px !important;
  }
}
</style>
