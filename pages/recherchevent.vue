<template>
  <div class="vuerechercheevent">
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <!-- ------------------------------------------HEADER-------------------------------------------- -->

    <degouline v-if="true" id="degoulinerecherche"></degouline>
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

    <div class="barrederecherchecontainer">
      <div class="barrederecherche">
        <div>
          <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
          <input
            id="inputrechercheevent"
            class="l'évènnement"
            type="text"
            :placeholder="placehorlderRecherche.nom"
            v-model="form.name"
          />
        </div>
        <div>
          <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
          <input
            class="endroit"
            id="inputrechercheevent"
            type="text"
            :placeholder="placehorlderRecherche.lieux"
            v-model="form.lieux"
          />
        </div>
        <div>
          <img class="pastille" src="@/assets/pastille.svg" alt="pastille" />
          <input
            class="date"
            id="inputrechercheevent"
            type="text"
            :placeholder="placehorlderRecherche.date"
            v-model="form.date"
          />
        </div>
        <v-btn
          @click="gotorecherche"
          id="btncreereventredinterieurrecherche"
          color="accent"
          elevation="2"
          rounded
          small
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7.582"
            height="12.519"
            viewBox="0 0 7.582 12.519"
          >
            <path
              id="Tracé_11"
              data-name="Tracé 11"
              d="M26.582,16.758v0a.82.82,0,0,0-.252-.592h0l-4.937-4.937,0,0a.822.822,0,1,0-1.105,1.218L24.6,16.758,20.23,21.125h0a.823.823,0,0,0,1.163,1.163h0l4.937-4.937h0a.82.82,0,0,0,.252-.592Z"
              transform="translate(-19.5 -10.5)"
              fill="#fff"
              stroke="#fff"
              stroke-width="1"
            />
          </svg>
        </v-btn>
      </div>
    </div>

    <div class="conteneurEvents" v-if="listeEvents.length > 0 && !chargement">
      <div v-for="item in listeEvents" :key="item.id" class="conteneurevent">
        <div @click="gotodetail(item)" id="caseact" class="casenomdate">
          <code
            class="emojidelevent jump"
            v-html="'<p >&\#x1F' + item.emoji + ';</p>'"
          >
          </code>

          <p class="titredelevent">{{ item.name.toUpperCase() }}</p>
          <p class="titredelevent dateheure">
            {{ formatDate(item.date) }}
          </p>
          <!-- <p class="datedelevent">
            le {{ item.datereformattee.toUpperCase() }} à
            {{ item.data.hour.toUpperCase() }}
          </p> -->
        </div>
        <div @click="gotodetail(item)" id="caseact" class="caselieux">
          <div class="lacarte">
            <MglMap
              :zoom="13"
              :center="item.coordlieux"
              :accessToken="accessToken"
              :mapStyle.sync="mapStyle"
            >
              <MglMarker
                :coordinates="[item.coordlieux[0], item.coordlieux[1]]"
              >
                <div
                  @click="clickeventmap(event)"
                  slot="marker"
                  class=" marker"
                >
                  <code
                    class="emojiMap"
                    v-html="'<p>&\#x1F' + item.emoji + ';</p>'"
                  ></code>
                </div>
              </MglMarker>
            </MglMap>
          </div>
          <!-- <div class="titreLieux">{{ item.lieux }}</div> -->
        </div>
        <div @click="gotodetail(item)" id="caseact" class="caseparticipants">
          <p class="titredelevent">PARTICIPANTS</p>
          <div class="conteneurAvatar">
            <div
              class="sousconteneuravatar"
              v-for="user in item.users"
              :key="user.id"
            >
              <v-img
                class="avatar elevation-6"
                alt=""
                :src="user.avatar"
              ></v-img>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="lesbtncreereveent"
      v-if="listeEvents.length == 0 && !chargement"
    >
      <div class="aucunevent ">
        Aucun évènement ne correspond à ta recherche :(
      </div>
      <div class="aucunevent  ">
        Pas de panique, tu peux
      </div>
      <v-btn
        color="accent"
        id="btncreerevent"
        elevation="4"
        raised
        rounded
        text
        @click="gotoCreationEvenet"
      >
        CREER UN EVENEMENT
      </v-btn>
      <div class="aucunevent">
        ou en chercher un autre !
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
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default {
  name: "App",
  created: function() {},
  data: function() {
    return {
      accessToken:
        "pk.eyJ1Ijoibmlrb2F6YXgyIiwiYSI6ImNrdjZodng1ODA0cHIycHF1NDkzejRrbDgifQ.jBzUp1BXIVGbZWrQXrtbKQ", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style

      chargement: false,

      rotation: 0,
      geolocPosition: undefined,

      drawer: false,
      group: null,
      act: ["slt", "lol"],
      form: {
        name: "",
        lieux: "",
        date: ""
      },
      lesParticipants: [],
      listeEvents: [],
      error: null,
      placehorlderRechercheListe: {
        nom: [
          "Jouer au foot",
          "Faire un basket",
          "Aller au cinéma",
          "Boire une bière"
        ],
        lieux: [
          "à Grenoble",
          "à Lyon",
          "à Paris",
          "à Montpellier",
          "à Metz",
          "à Marseille",
          "à Toulouse",
          "à Montpellier",
          "à Nantes",
          "à Nice"
        ]
      },
      placehorlderRecherche: {
        nom: "Aller au cinéma",
        lieux: "à Grenoble",
        date: ""
      }
    };
  },
  components: {
    degouline: degouline,
    MglMap,
    MglMarker
  },
  methods: {
    gotoCreationEvenet() {
      if (this.$auth.user) {
        this.$router.push({
          path: "/creationevent"
        });
      } else {
        this.$router.push({
          path: "/login"
        });
      }
    },
    formatDate(ladateheure) {
      var heure = ladateheure.split(",")[1];
      var ladate = ladateheure.split(",")[0];
      var date = new Date(ladate);
      var month = date.getMonth() + 1;
      return (
        "le " +
        date.getDate() +
        "/" +
        month +
        "/" +
        date.getFullYear() +
        " à " +
        heure
      );
    },
    gotorecherche() {
      var laQuery = {};
      if (this.form.name) {
        laQuery.formname = this.form.name;
      }
      if (this.form.lieux) {
        laQuery.formlieux = this.form.lieux;
      }
      if (this.form.date) {
        laQuery.formdate = this.form.date;
      }
      this.$router.push({
        path: "/recherchevent/",
        query: laQuery
      });
      setTimeout(() => {
        this.Read();
        var ladate = new Date();
        var datemonth = ladate.getMonth() + 1;

        this.placehorlderRecherche.date =
          ladate.getDate() + "/" + datemonth + "/" + ladate.getFullYear();
      }, 100);
    },
    gotodetail(item) {
      this.$router.push({ path: "/event-detail/", query: { id: item.id } });
    },
    placeholderChangement(liste, placeholder, day, month) {
      setTimeout(() => {
        var random = Math.floor(Math.random() * liste.nom.length);
        placeholder.nom = liste.nom[random];

        var randomlieux = Math.floor(Math.random() * liste.lieux.length);
        placeholder.lieux = liste.lieux[randomlieux];

        placeholder.date = day + "/" + month;

        if (day < 30) day++;
        else {
          month = month + 1;
          day = 1;
        }

        if (month > 12) {
          month = 0;
        }

        this.placeholderChangement(liste, placeholder, day, month);
      }, 3000);
    },

    async Read() {
      this.chargement = true;
      var queryParamName = "";
      if (this.$route.query.formname) {
        queryParamName = queryParamName + "/" + this.$route.query.formname;
      } else {
        queryParamName = queryParamName + "/null";
      }
      if (this.$route.query.formlieux) {
        queryParamName = queryParamName + "/" + this.$route.query.formlieux;
      } else {
        queryParamName = queryParamName + "/null";
      }
      if (this.$route.query.formdate) {
        queryParamName =
          queryParamName +
          "/" +
          this.$route.query.formdate.replaceAll("/", ":");
      } else {
        queryParamName = queryParamName + "/null";
      }
      let res = await this.$axios.get(
        "/activities" + queryParamName + "/recherche"
      );
      this.listeEvents = res.data;
      this.listeEvents.forEach(element => {
        var coord = JSON.parse(element.coordlieux);
        element.coordlieux = [coord.lng, coord.lat];
      });
      console.log(this.listeEvents);
      this.chargement = false;
    }
  },
  watch: {
    group() {
      this.drawer = false;
    }
  },
  mounted() {
    this.Read();
    var ladate = new Date();
    var datemonth = ladate.getMonth() + 1;

    this.placehorlderRecherche.date =
      ladate.getDate() + "/" + datemonth + "/" + ladate.getFullYear();
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap");
* {
  font-family: "Noto Sans", sans-serif;
}
.vuerechercheevent {
  #app {
    position: relative;
    height: 100vh;
  }
  .marker {
    width: 30px;
    transform: translate(-50%, -90%);
  }
  body {
    overflow: hidden;
  }
  #degoulinerecherche > svg {
    margin-top: -10vh;
    width: 100%;
    height: auto;
  }
  #degoulinerecherche {
    margin-top: -10%;
    width: 101%;
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
  .barrederecherchecontainer {
    margin-bottom: 2vh;
    margin-top: 7vh;
    position: absolute;
    width: 100%;
  }
  .barrederecherche {
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    margin: auto;
    background-color: white;
    width: 90%;
    height: 30px;
    box-shadow: 0px 0px 16px -3px rgba(0, 0, 0, 0.25);
    div {
      margin-top: 1%;
    }
  }
  #btncreereventredinterieurrecherche {
    margin-top: -2px;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 5px;
    box-shadow: unset !important;
    color: red;
    background-color: red;
    border: solid 2px;
    width: 20px;
    height: 20px;
    min-width: 25px !important;
    min-height: 25px !important;
    margin-top: 3px;
    margin-bottom: 3px;
  }
  #inputrechercheevent {
    font-size: 2.5vw;
    width: 18vw;
    transform: translateY(-7px);
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
  }
  .btnajoutenevent {
    text-align: center;
    padding-left: 15px;
    padding-top: 9px;
    border-radius: 20px;
    margin: 20px;
    height: 40px;
    background-color: #e92626;
    color: white;
    box-shadow: 0px 0px 16px -3px rgba(233, 38, 38, 0.75);
  }
  .conteneurevent {
    height: 140px;
    display: flex;
    border-radius: 15px;
    padding: 1%;
    margin: 5%;
    box-shadow: 0px 0px 16px -3px rgba(0, 0, 0, 0.25);
    .caselieux {
      border-radius: 15px !important;
      .emojiMap {
        font-size: 20px;
      }
    }
    .ol-zoom,
    .ol-attribution {
      display: none !important;
    }
  }
  .titredelevent {
    font-weight: 700;
  }
  .containerdivtitrerechercheevent {
    display: flex;
    justify-content: center;
    margin-top: 15%;
    text-align: center;
  }
  #btnrechercheevent {
    border-radius: 50%;
    margin-left: -5%;
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
  .red {
    color: #e92626;
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
  #caseact {
    padding: 1%;
    width: 33%;
    height: 100%;
    text-align: center;
    .emojidelevent {
      font-size: 30px;
    }
  }
  .casenomdate {
    padding-top: 6% !important;
  }
  .titredelevent {
    font-size: 12px;
  }
  .datedelevent {
    color: #e92626;
    font-size: 9px;
  }
  .conteneurEvents {
    margin-top: 25%;
    overflow-y: scroll;
  }
  .lacarte {
    width: 100px;
    height: 120px;
    position: absolute;
    margin-top: 1%;
    .mapboxgl-canvas {
      height: 120px !important;
      width: 100px !important;
    }
    .mapboxgl-map {
      height: 120px !important;
      border-radius: 15px;
    }
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
  .titreLieux {
    width: 100%;
    text-align: center;
    margin-top: -2px;
    margin-bottom: 2px;
    font-weight: 700;
    font-size: 11px;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
  .dateheure {
    margin-top: 10px;
    font-size: 10px;
  }
  .lesbtncreereveent {
    .aucunevent {
      white-space: nowrap;
      font-size: 3vw;
    }
    margin-top: 40%;
    text-align: center;
    #btncreerevent {
      margin: 10px;

      font-size: 15px;
      font-weight: 600 !important;
      border: solid 2px #e92626;
      color: #e92626;
      .v-btn__content {
        padding: 10px !important;
      }
    }
  }
  .chargement {
    text-align: center;
    height: 100vh;
    padding-top: 40vh;
  }
}
</style>
