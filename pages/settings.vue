<template>
  <div id="app" class="vuecreationevent" data-app>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <!-- ------------------------------------------HEADER-------------------------------------------- -->

    <degouline v-if="true" id="degoulineInscription"></degouline>
    <div class="conteneurplanet">
      <img
        class="planetquitourneinscription"
        style="position: absolute"
        src="@/assets/planetquitournerouge.gif"
      />
    </div>

    <v-card class="titrecard" to="/">
      <v-card-title>T o o G e t h e r</v-card-title>
      <v-card-text
        >Faites des rencontres en faisant ce que vous aimez</v-card-text
      >
    </v-card>
    <div class="containerdivtitrecreationevent"></div>
    <lefooter></lefooter>
  </div>
</template>

<script>
import degouline from "@/components/degoulinerouge";
import Places from "vue-places";
import fileEmoji from "../assets/emoji.json";
import lefooter from "../components/footer.vue";

// import firebase from "firebase";
// const db = firebase.firestore();
const API_URL = "http://dev-tgt.local:3001/api";
export default {
  name: "App",

  data: function() {
    return {};
  },
  components: {
    degouline: degouline,
    places: Places,
    lefooter: lefooter
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap");
* {
  font-family: "Noto Sans", sans-serif;
}
#app {
  position: relative;
  height: 100vh;
}
.vuecreationevent {
  body {
    overflow: hidden;
  }
  #degoulineInscription > svg {
    margin-top: -25vw;
    width: 100%;
    height: auto;
  }
  #degoulineInscription {
    width: 100%;
    position: absolute;
  }
  .title {
    z-index: 1;
  }
  .conteneurplanet {
    width: 100%;
  }
  .planetquitourneinscription {
    margin-top: -10% !important;
    height: 20%;
    left: 35%;
    width: 33vw;
    height: 33vw;
  }

  .titrecard {
    padding-top: 20%;
    margin-top: 0% !important;
    background-color: transparent !important;
    box-shadow: unset !important;
    text-align: center;

    .v-card__title {
      font-weight: 700;
      justify-content: center;
      color: white;
      padding-bottom: 0 !important;
      font-size: 25px;
    }
    .v-card__text {
      font-family: "Noto Sans", sans-serif;
      opacity: 0.7;
      color: white !important;
      font-size: 12px;
    }
  }
  .containerdiv {
    margin: auto;
    width: 100%;
    margin-top: 20%;
  }
  .titleinsription {
    margin-top: 5px;
    font-size: 17px;
    //font-weight: 700;
    text-align: center;
    font-size: 18px;
    font-weight: 600 !important;
    color: #e92626;
  }
  .rowcreerevenet {
    padding-left: 15px;
    padding-top: 9px;
    border-radius: 20px;
    margin: 20px;
    height: 40px;
    box-shadow: 0px 0px 16px -3px rgba(0, 0, 0, 0.25);
    div > input {
      width: 95%;
    }
    .col-md-6 {
      padding-top: 0;
    }
    .inputlieux {
      margin-top: -8px;
      border: unset;
    }
  }
  .btnajoutenevent {
    text-align: center;
    padding-top: 5px;
    border-radius: 20px;
    margin: 20px;
    height: 40px;
    background-color: #e92626;
    color: white;
    box-shadow: 0px 0px 16px -3px rgba(233, 38, 38, 0.75);
    div {
      padding: 0 !important;
    }
  }
  .containerdivtitrecreationevent {
    justify-content: space-around;
    width: 100%;
    margin-top: 20%;
    display: inline-flex;
  }
  .v-picker__title,
  .v-time-picker-clock__hand {
    background-color: #e92626;
    border-color: #e92626;
  }
  .v-time-picker-clock__item--active {
    background-color: #e92626;
  }
  .champchoixheure {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
  .theme--light.v-btn.v-btn--has-bg {
    background-color: rgba(0, 0, 0, 0);
  }
  .v-btn--is-elevated {
    box-shadow: unset;
  }
  .btnajoutenevent {
    div > a > .v-btn__content {
      color: white;
    }
  }
  .expaceur {
    width: 20px;
  }
  #btnvalidercreationevent {
    span {
      color: white;
    }
  }
  .formcreerevent {
    //margin-top: 40% !important;
    .premiereligne {
      width: 100%;
      display: inline-flex;
      align-items: center;
      button {
        margin-left: 20px;
        height: 100%;
        padding-right: 0;
        p {
          font-size: 40px;
        }
      }
      .rowcreerevenet {
        width: 100%;
        margin-right: 20px;
      }
    }
  }
  .menuEmoji {
    border-radius: 15px;
    height: 40%;
    background-color: white;
    max-width: 90% !important;
    .listEmojis {
      display: flex;
      flex-flow: wrap;
      text-align: center;
      justify-content: center;
      .emoji {
        padding: 10px;
        text-align: center;
        font-size: 30px;
        width: 50px;
      }
    }
    .theme--dark.v-tabs > .v-tabs-bar,
    .theme--dark.v-tabs-items {
      background-color: white;
    }
    .v-tab {
      font-size: 20px;
      color: black !important;
      padding: 0 !important;
      width: 25% !important;
      max-width: 25% !important;
      min-width: 25% !important;
    }
  }
  .pastoutremplis {
    text-align: center;
    font-size: 12px;
    color: #e92626;
  }
}
</style>
