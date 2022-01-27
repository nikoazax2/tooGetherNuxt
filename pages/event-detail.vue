<template>
  <div id="app" data-app>
    <div class="vueeventdetail">
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

      <div class="conteneurcard">
        <v-card
          v-if="!chargement"
          class="mx-auto carddetail"
          color="#e92626"
          dark
          max-width="400"
        >
          <v-card-title>
            <code
              class="emojidelevent jump"
              v-html="'<p >&\#x1F' + activity.emoji + ';</p>'"
            >
            </code>
            <div>
              <span class="text-h6 font-weight-light">{{ activity.name }}</span>
              <div class="dateheurepagedetail">
                le {{ formatDate(activity.datejours) }} à {{ activity.heure }}
              </div>
            </div>
          </v-card-title>

          <v-card-text class="textecarddetail">
            "{{ activity.description }}"
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  v-if="activity.creator.avatar"
                  class="elevation-6"
                  alt=""
                  :src="activity.creator.avatar"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{
                  activity.creator.surname
                }}</v-list-item-title>
              </v-list-item-content>

              <v-row class="sharelike" align="center" justify="end">
                <!--  <v-icon class="mr-1">
                  mdi-heart
                </v-icon>
                <span class="subheading mr-2">256</span>
                <v-icon class="mr-1">
                  mdi-share-variant
                </v-icon>
                <span class="subheading">45</span> -->
              </v-row>
            </v-list-item>
          </v-card-actions>
          <MglMap
            :zoom="10"
            :center="activity.coordlieux"
            :accessToken="accessToken"
            :mapStyle.sync="mapStyle"
          >
            <MglMarker
              :coordinates="[activity.coordlieux[0], activity.coordlieux[1]]"
            >
              <div @click="clickeventmap(event)" slot="marker" class=" marker">
                <code
                  class="emojiMap"
                  v-html="'<p>&\#x1F' + activity.emoji + ';</p>'"
                ></code>
              </div>
            </MglMarker>
          </MglMap>
          <div class="adresse">{{ activity.lieux }}</div>
          <v-card-actions>
            <div class="participantsliste" v-if="activity.users.length > 0">
              <div v-for="users in activity.users" :key="users.id">
                <div v-if="users.id != activity.creatorId">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      alt=""
                      :src="users.avatar"
                    ></v-img>
                  </v-list-item-avatar>
                  {{ users.surname }}
                </div>
              </div>
            </div>
            <div v-else class="aucunparticipantdetail">Aucun participant</div>
          </v-card-actions>
          <v-card-actions class="conteneurbtninscrit">
            <v-btn
              v-if="$auth.user && !inscrit"
              outlined
              @click="inscription"
              class="btnsinscrire"
            >
              Participer
            </v-btn>
            <v-btn
              v-if="!$auth.user"
              outlined
              to="/register"
              class="btnsinscrire"
            >
              S'incrire pour participer
            </v-btn>
            <v-btn v-if="!$auth.user" outlined to="/login" class="btnsinscrire">
              Se connecter pour participer
            </v-btn>
            <v-btn
              v-else-if="$auth.user && inscrit"
              outlined
              @click="inscription"
              class="btnsinscrire"
            >
              <v-icon> mdi-check </v-icon>
              Inscrit
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <lefooter></lefooter>
  </div>
</template>

<script>
import degouline from "@/components/degoulinerouge";
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import lefooter from "@/components/footer";

const API_URL = "http://dev-tgt.local:3001/api";
export default {
  name: "App",
  async created() {
    this.Read();
  },
  data: function() {
    return {
      accessToken:
        "pk.eyJ1Ijoibmlrb2F6YXgyIiwiYSI6ImNrdjZodng1ODA0cHIycHF1NDkzejRrbDgifQ.jBzUp1BXIVGbZWrQXrtbKQ", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style

      rotation: 0,
      geolocPosition: undefined,
      activity: null,
      chargement: true,
      inscrit: false
    };
  },
  components: {
    degouline: degouline,
    MglMap,
    MglMarker,
    lefooter: lefooter
  },
  methods: {
    formatDate(ladate) {
      var date = new Date(ladate);
      var month = date.getMonth() + 1;
      return date.getDate() + "/" + month + "/" + date.getFullYear();
    },
    async Read() {
      let res = await this.$axios.get(
        "/activities/" + this.$route.query.id + "/detail"
      );

      this.activity = res.data;
      this.activity.heure = this.activity.date.split(",")[1];
      this.activity.datejours = this.activity.date.split(",")[0];

      if (this.activity.users.length > 0) {
        this.activity.users.forEach((participant, index, object) => {
          if (this.activity.creatorId == participant.id) {
            console.log("test");
            this.activity.creator = participant;
          }
          if (this.$auth.user) {
            if (participant.id == this.$auth.user.id) {
              this.inscrit = true;
            }
          }
        });
      }
      var coord = JSON.parse(this.activity.coordlieux);
      this.activity.coordlieux = [coord.lng, coord.lat];

      this.chargement = false;

      //ID 744162930517-nidkl2e8uagtfk1ompdmhupo3eul09ah.apps.googleusercontent.com
      //Secret KUJaxPRs5HOq2n_mCRX1EQZY
    },
    async inscription() {
      var userId = this.$auth.user.id;
      await this.$axios
        .put(
          API_URL + "/activities/" + this.$route.query.id + "/user/" + userId
        )
        .then(response => {
          document.location.reload();
        });
    },
    gotorechercheevent() {
      this.$router.push("/recherchevent/");
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
html {
  overflow-x: hidden;
}
.vueeventdetail {
  height: 100vh;

  .marker {
    width: 30px;
    transform: translate(-50%, -90%);
  }
  #app {
    position: relative;
    height: 100vh;
  }
  body {
    overflow: hidden;
  }
  #degoulineInscription > svg {
    margin-top: -62vw;
    width: 100%;
    height: auto;
  }
  @media only screen and (min-width: 450px) {
    #degoulineInscription > svg {
      margin-top: -25vw;
    }
  }
  @media only screen and (min-width: 500px) {
    #degoulineInscription > svg {
      margin-top: -30vw;
    }
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
    margin-top: -23% !important;
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
    .titleinsription {
      text-align: center;
      font-family: "Noto Sans", sans-serif !important;
    }
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
  }
  .btnsinscrire {
    text-align: center;
    margin: 10px;
    padding-top: 5px;
    border-radius: 20px;
    height: 40px;
    background-color: white !important;
    color: #e92626 !important;
    box-shadow: 0px 0px 16px -3px rgba(195, 74, 74, 0.75);
    div {
      padding: 0 !important;
    }
  }
  .containerdivtitrecreationevent {
    margin: 20px;
    position: absolute;
    width: 100%;
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
  .titredetail {
    color: white;
  }
  .carddetail {
    border-radius: 15px !important;
    width: 90vw;
    align-items: center;
    margin-top: 30%;
    margin-bottom: 200px !important;
    .participantsliste {
      margin-left: 15px !important;
    }
    .emojidelevent {
      font-size: 30px;
      margin-right: 10px;
    }
    .sharelike {
      justify-content: end;
      i {
        padding-left: 20px;
        padding-right: 10px;
      }
    }
  }
  .conteneurcard {
    overflow-y: scroll;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    height: 100vh;
    .adresse {
      font-size: 12px;
      text-align: center;
    }
  }
  .conteneurbtninscrit {
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
  .dividerdetail {
    margin-left: 10%;
    margin-right: 10%;
    background-color: rgba(255, 255, 255, 0.473);
    border-width: 1px;
  }
  .aucunparticipantdetail {
    margin: 20px;

    text-align: center;
  }
  .dateheurepagedetail {
    opacity: 0.7;
    font-size: 14px;
    margin-top: -10px;
  }
  .textecarddetail {
    color: rgba(255, 255, 255, 0.9) !important;
  }
  .ol-attribution,
  .ol-zoom {
    display: none;
  }
  .jump {
    display: inline-block;
    animation-duration: 1.5s;
    animation-name: jump;
    animation-iteration-count: infinite;
  }

  @keyframes jump {
    0%,
    100% {
      transform: scale(1.1, 1) translateY(0);
    }

    5% {
      transform: scale(1, 1) translateY(-0.4em);
    }

    15% {
      transform: scale(1.1, 0.9) translateY(-0.5em);
    }

    25% {
      transform: scale(1, 1) translateY(-0.4em);
    }

    30% {
      transform: scale(1, 1) translateY(0);
    }
  }
  .mgl-map-wrapper {
    height: 120px;
    width: 100%;
  }
  .mapboxgl-canvas {
    height: 120px !important;
    width: 100%;
  }
  .mapboxgl-map {
    //border-radius: 15px;
  }
  .emojiMap {
    font-size: 20px;
  }
}
</style>
