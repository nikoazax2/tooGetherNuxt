<template>
  <div id="app" class="vuemap" data-app>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <!-- ------------------------------------------HEADER-------------------------------------------- -->
    <div class="lacarte" v-if="!chargement">
      <vl-map
        :load-tiles-while-animating="true"
        :load-tiles-while-interacting="true"
        data-projection="EPSG:4326"
        style="height: 100vh;width:100vw;"
      >
        <vl-view
          :zoom="5.4"
          :center="[2.353526, 48.856493]"
          :rotation="0"
        ></vl-view>

        <vl-layer-tile id="osm">
          <vl-source-osm></vl-source-osm>
        </vl-layer-tile>

        <vl-overlay
          v-for="event in listeEvents"
          :key="event.id"
          :position="[event.coordlieux[0], event.coordlieux[1]]"
        >
          <template slot-scope="scope">
            <img
              @click="clickeventmap(event)"
              class="marker"
              src="@/assets/markermap.png"
            />
          </template>
        </vl-overlay>
      </vl-map>
    </div>
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
    <div class="containerdivtitrecreationevent">
      <v-btn
        to="/"
        id="btncreereventredinterieur"
        color="accent"
        elevation="2"
        rounded
        small
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="37.69"
          height="38.729"
          viewBox="0 0 37.69 38.729"
        >
          <g
            id="Groupe_53"
            data-name="Groupe 53"
            transform="translate(-342.164 -323.941)"
          >
            <rect
              id="Rectangle_2"
              data-name="Rectangle 2"
              width="37.03"
              height="38.088"
              rx="18.515"
              transform="matrix(-1, -0.017, 0.017, -1, 379.189, 362.67)"
              fill="#e92626"
            />
            <path
              id="Tracé_11"
              data-name="Tracé 11"
              d="M8.464,7.4v0A1.054,1.054,0,0,0,8.14,6.64h0L1.793.292l0,0A1.058,1.058,0,1,0,.369,1.86L5.912,7.4.3,13.02h0a1.058,1.058,0,0,0,1.5,1.5h0L8.141,8.168h0a1.054,1.054,0,0,0,.324-.761Z"
              transform="matrix(-1, -0.017, 0.017, -1, 365.37, 350.789)"
              fill="#fff"
              stroke="#fff"
              stroke-width="1"
            />
          </g>
        </svg>
      </v-btn>
    </div>

    <div class="conteneurevent" v-if="activity">
      <div @click="gotodetail(activity)" id="caseact" class="casenomdate">
        <p class="titredelevent">{{ activity.name.toUpperCase() }}</p>
        <p class="titredelevent dateheure">
          {{ formatDate(activity.date) }}
        </p>
      </div>
      <div @click="gotodetail(activity)" id="caseact" class="caselieux">
        <div>
          <vl-map
            :load-tiles-while-animating="true"
            :load-tiles-while-interacting="true"
            data-projection="EPSG:4326"
            style="height: 100px"
            >{{ activity.coord }}
            <vl-view
              :zoom="13"
              :center="activity.coordlieux"
              :rotation="0"
            ></vl-view>

            <vl-layer-tile id="osm">
              <vl-source-osm></vl-source-osm>
            </vl-layer-tile>
            <vl-overlay :position="activity.coordlieux">
              <template slot-scope="scope">
                <img class="marker" src="@/assets/markermap.png" />
              </template>
            </vl-overlay>
          </vl-map>
        </div>
        <div class="titreLieux">{{ activity.lieux }}</div>
      </div>
      <div @click="gotodetail(activity)" id="caseact" class="caseparticipants">
        <p class="titredelevent">PARTICIPANTS</p>
        <div class="conteneurAvatar">
          <div
            class="sousconteneuravatar"
            v-for="user in activity.users"
            :key="user.id"
          >
            <v-img class="avatar elevation-6" alt="" :src="user.avatar"></v-img>
          </div>
        </div>
      </div>
    </div>

    <div class="chargement" v-if="chargement">
      <v-progress-circular
        indeterminate
        width="7"
        size="70"
        color="#e92626"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import degouline from "@/components/degoulinerouge";
import Places from "vue-places";
// import firebase from "firebase";
// const db = firebase.firestore();
const API_URL = "http://api.toogther.com";
export default {
  name: "App",
  async created() {
    this.getActivity();
  },
  data: function() {
    return {
      errors: [],
      chargement: false,
      listeEvents: [],
      eventChoix: null,
      activity: null
    };
  },
  components: {
    degouline: degouline,
    places: Places
  },

  methods: {
    async clickeventmap(event) {
      let res = await this.$axios.get("/activities/" + event.id + "/detail");
      this.activity = {};
      this.activity = res.data;
      this.activity.heure = this.activity.date.split(",")[1];
      this.activity.datejours = this.activity.date.split(",")[0];

      if (this.activity.users.length > 0) {
        this.activity.users.forEach((participant, index, object) => {
          if (this.$auth.user) {
            if (participant.id == this.$auth.user.id) {
              this.inscrit = true;
            }
          }
        });
      }

      console.log(this.activity);

      var coord = JSON.parse(this.activity.coordlieux);
      this.activity.coordlieux = [coord.lng, coord.lat];
    },
    async getActivity() {
      this.chargement = true;

      let res = await this.$axios.get("/activities/map");
      this.listeEvents = res.data;
      this.listeEvents.forEach(event => {
        var coord = JSON.parse(event.coordlieux);
        event.coordlieux = [coord.lng, coord.lat];
      });
      this.chargement = false;
      console.log(this.listeEvents);
    },
    formatDate(ladate) {
      var date = new Date(ladate);
      var month = date.getMonth() + 1;
      return date.getDate() + "/" + month + "/" + date.getFullYear();
    },
    gotodetail(item) {
      this.$router.push({ path: "/event-detail/", query: { id: item.id } });
    }
  },
  watch: {}
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
.vuemap {
  overflow: hidden;
  .marker {
    width: 30px;
    transform: translate(-50%, -90%);
  }
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
    width: 100%;
    margin-top: 20%;
    display: inline-flex;
    float: left;
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
  }
  .pastoutremplis {
    text-align: center;
    font-size: 12px;
    color: #e92626;
  }
  .lacarte {
    position: absolute;
  }
  .ol-attribution {
    display: none;
  }
  .chargement {
    text-align: center;
  }
  .conteneurEvents {
    margin-top: 25%;
    overflow-y: scroll;
  }
  .conteneurevent {
    width: 90vw;
    bottom: 0;
    background-color: white;
    position: absolute;
    height: 140px;
    display: flex;
    border-radius: 15px;
    padding: 1%;
    margin: 5%;
    box-shadow: 0px 0px 16px -3px rgba(0, 0, 0, 0.25);
    .caselieux {
      border-radius: 15px !important;
    }
    .ol-zoom,
    .ol-attribution {
      display: none !important;
    }
  }
  .casenomdate {
    padding-top: 12% !important;
  }
  .titredelevent {
    font-size: 12px;
    font-weight: 700;
  }
  .datedelevent {
    color: #e92626;
    font-size: 9px;
  }
  #caseact {
    padding: 1%;
    width: 33%;
    height: 100%;
    text-align: center;
  }
  .titreLieux {
    width: 100%;
    text-align: center;
    margin-top: -2px;
    margin-bottom: 2px;
    font-weight: 700;
    font-size: 11px;
    height: 4vh;
  }
  .avatar {
    width: 30px;
  }
  .conteneurAvatar {
    width: 100%;
    margin-left: 10px;
    margin-top: 5px;
    height: 80%;
    display: flex;
    flex-wrap: wrap;
  }
  .sousconteneuravatar {
    height: 30px;
  }
}
</style>
