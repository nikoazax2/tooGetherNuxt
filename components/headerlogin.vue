<template>
  <div>
    <div class="divheaderconnecte">
      <div></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: {},
  created: function() {},
  data: function() {
    return {};
  },
  components: {},
  methods: {
    signOut() {}
  },
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap");
* {
  font-family: "Noto Sans", sans-serif;
}
.btndrawer {
  left: 0;
  float: left;
  color: white;
}
.item {
  //font-size: 7px;
  font-family: "Noto Sans", sans-serif;
  vertical-align: middle;
}
.divheader > button > .v-btn__content {
  font-size: 7px;
  font-family: "Noto Sans", sans-serif;
  color: white;
}
#btncreereventredinterieur {
  border-radius: 50%;
  margin-left: 5px;
  box-shadow: unset !important;
  span {
    margin-left: 2px;
    color: white !important;
  }
  color: red;
  background-color: red;
  border: solid 2px;
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  margin-top: 3px;
  margin-bottom: 3px;
}
.divheader {
  padding-top: 10px;
  z-index: 1000;
  display: flex;
  justify-content: space-evenly;
}
button {
  align-self: center;
}
#btncreerevent {
  box-shadow: 0px 0px 16px -3px rgba(0, 0, 0, 0.25);
  margin-right: 10px;
  background-color: white;
  .v-btn__content {
    color: #727c8e;
    font-weight: 700;
  }
}
.v-btn:not(.v-btn--round).v-size--small {
  padding-right: 5px !important;
  padding-left: 5px !important;
}
.connexioninscription > span {
  font-family: "Noto Sans", sans-serif;
  color: white;
  font-size: 2.5vw !important;
}
.userconnected {
  width: 50%;
  color: white;
}
.divheaderconnecte {
  padding-top: 10px;
  display: flex;
  width: 100%;
}
.titrecarduserheader {
  margin-top: -10%;
  background-color: transparent !important;
  box-shadow: unset !important;
  text-align: center;

  .v-card__title {
    font-weight: 700;
    justify-content: center;
    color: white;
    padding-bottom: 0 !important;
    font-size: 15px;
  }
}
</style>
