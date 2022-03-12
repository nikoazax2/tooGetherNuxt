<template>
  <div class="vuemyevent">
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
    <div v-if="!chargement">
      <div class="containerdiv">
        <div v-if="!chargement">
          <div
            v-for="item in listeEventsPaticipant"
            :key="item.id"
            :class="{ activityPassed: item.passed }"
            class="conteneurevent"
          >
            <div @click="gotodetail(item)" id="caseact" class="casenomdate">
              <code
                class="emojidelevent jump"
                v-html="'<p >&\#x1F' + item.emoji + ';</p>'"
              >
              </code>

              <p class="titredelevent">{{ item.name.toUpperCase() }}</p>
              <p class="titredelevent dateheure">
                {{ item.formatDate }}
              </p>
              <div
                v-if="item.creatorId == $auth.user.id"
                @click.stop
                @click="gotoedit(item.act_id)"
              >
                <v-icon>mdi-pencil</v-icon>
              </div>
            </div>
            <div @click="gotodetail(item)" id="caseact" class="caselieux">
              <div class="lacarte">
                <MglMap
                  :zoom="8"
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
            <div
              @click="gotodetail(item)"
              id="caseact"
              class="caseparticipants"
            >
              <p class="titredelevent">PARTICIPANTS</p>
              <div class="conteneurAvatar">
                <div
                  class="sousconteneuravatar"
                  v-for="user in item.users"
                  :key="user.id"
                >
                  <v-img
                    v-if="user.avatar"
                    class="avatar elevation-6"
                    alt=""
                    :src="user.avatar"
                  ></v-img>
                  <div
                    v-if="user.profileImageBlob"
                    class="containercontainerPhoto"
                  >
                    <div class="containerPhoto">
                      <img
                        class="profile-image"
                        :src="'data:image/png;base64,' + user.profileImageBlob"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="containerdiv" v-if="tab == 'amis'">
        <div class="titreMyEvent">{{ friends.length }} AMIS</div>
        <div v-if="!chargement">
          <div class="lesamis">
            <div
              @click="goToProfile(friend.id)"
              class="ligneami"
              v-for="friend in friends"
              :key="friend"
            >
              <v-img
                class="avatar elevation-6"
                alt=""
                :src="friend.avatar"
              ></v-img>
              <div class="nom">
                {{
                  friend.surname.charAt(0).toUpperCase() +
                    friend.surname.slice(1)
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="containerdiv" v-if="!$auth.user">
        <div class="lesbtncreereveent">
          <div class="aucunevent">
            Connecte ou inscrit toi pour voir tes activités
          </div>
          <v-btn
            color="accent"
            id="btncreerevent"
            elevation="4"
            raised
            rounded
            text
            to="/login"
          >
            CONNEXION
          </v-btn>
          <v-btn
            color="accent"
            id="btncreerevent"
            elevation="4"
            raised
            rounded
            text
            to="/register"
          >
            INSCRIPTION
          </v-btn>
        </div>
      </div>
      <div
        class="containerdiv"
        v-if="$auth.user && listeEventsPaticipant.length == 0"
      >
        <div class="lesbtncreereveent">
          <div class="aucunevent">Tu n'a aucune activité :(</div>
          <v-btn
            color="accent"
            id="btncreerevent"
            elevation="4"
            raised
            rounded
            text
            @click="gotoCreationEvenet"
          >
            CREER UNE ACTIVITÉ
          </v-btn>
          <v-btn
            color="accent"
            id="btncreerevent"
            elevation="4"
            raised
            rounded
            text
            @click="gotoRecherche"
          >
            CHERCHER UNE ACTIVITÉ
          </v-btn>
        </div>
      </div>
    </div>

    <lefooter></lefooter>
  </div>
</template>

<script>
import degouline from "@/components/degoulinerouge";
import lefooter from "@/components/footer";
import { MglMap, MglMarker } from "vue-mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
export default {
  name: "App",
  created: function() {
    if (!this.$auth.user) {
      this.$router.push({ path: "/login" });
    }
  },
  data: function() {
    return {
      accessToken:
        "pk.eyJ1Ijoibmlrb2F6YXgyIiwiYSI6ImNrdjZodng1ODA0cHIycHF1NDkzejRrbDgifQ.jBzUp1BXIVGbZWrQXrtbKQ", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style

      rotation: 0,
      geolocPosition: undefined,
      tab: 2,
      imagesChargees: 0,
      nbImagesAcharger: null,
      chargement: true,
      friends: null,
      drawer: false,
      group: null,
      listeEventsPaticipant: null
    };
  },
  components: {
    degouline: degouline,
    lefooter: lefooter,
    MglMap,
    MglMarker
  },
  methods: {
    gotoedit(id) {
      this.$router.push({ path: "/editevent/" + id });
    },
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
    gotoRecherche() {
      this.$router.push({
        path: "/recherchevent"
      });
    },
    gotodetail(item) {
      this.$router.push({ path: "event-detail/", query: { id: item.act_id } });
    },

    async Read() {
      this.chargement = true;
      if (this.$auth.user) {
        let resparticipant = await this.$axios.get(
          "/activities/" + this.$auth.user.id + "/participant"
        );
        this.listeEventsPaticipant = resparticipant.data;
        this.listeEventsPaticipant.forEach(activity => {
          this.nbImagesAcharger = this.nbImagesAcharger + activity.users.length;
          activity.formatDate = this.$func.formatDate(activity.date, activity);
          activity.users.forEach(user => {
            this.getProfileImage(user);
          });
          var coord = JSON.parse(activity.coordlieux);
          activity.coordlieux = [coord.lng, coord.lat];
        });
      }
    },
    async getProfileImage(user) {
      if (user.profileImage != null) {
        await this.$axios
          .get("users/profileImage/" + user.profileImage, {
            responseType: "arraybuffer"
          })
          .then(response => {
            user.profileImageBlob = Buffer.from(response.data, "binary")
              .toString("base64")
              .replaceAll(" ", "");
          });
      }
      this.imagesChargees = this.imagesChargees + 1;
    }
  },
  watch: {
    group() {
      this.drawer = false;
    },
    "$data.imagesChargees": {
      handler: function(imagesChargees) {
        if (this.nbImagesAcharger == imagesChargees) {
          this.chargement = false;
        }
      },
      deep: true
    }
  },

  mounted() {
    this.Read();
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
.vuemyevent {
  body {
    overflow: hidden;
  }
  .footermyevents {
    z-index: 10;
    position: absolute;
    bottom: 0;
    align-content: center;
    margin-bottom: 45px;
    width: 100vw;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    .v-slide-group__content {
      background-color: rgba(255, 255, 255, 0);
    }
    .v-item-group {
      background-color: grey;
      border-radius: 15px;
    }
    i {
      color: white !important;
    }
    .v-tabs-slider-wrapper {
      display: flex;
      justify-content: center;
      .v-tabs-slider {
        width: 50px !important;
        color: white !important;
      }
    }
    a {
      padding: 0 !important;
      border-radius: 15px;
    }
    .v-tabs--icons-and-text > .v-tabs-bar {
      height: 40px;
    }
    .v-tabs {
      align-items: center;
      align-content: center;
      display: flex;
      justify-content: center;
    }
  }
  .marker {
    width: 30px;
    transform: translate(-50%, -90%);
  }
  #degoulinerecherche > svg {
    margin-top: -10vh;
    width: 100%;
    height: auto;
  }
  #degoulinerecherche {
    margin-top: -5%;
    width: 100%;
    position: absolute;
  }
  .conteneurplanet {
    margin-top: -10% !important;
  }
  .titrecard {
    margin-top: -10% !important;
    .v-card__title {
      margin-top: 0%;
    }
    .v-card__text {
    }
  }
  .containercontainerPhoto {
    display: flex;
    justify-content: center;
    margin-top: 3px;

    .profile-image {
      position: relative;
      object-fit: cover;
      width: 30px;
      height: 30px;
      border-radius: 100%;
    }
    .v-image {
    }
    .containerPhoto {
      width: 30px;
      height: 30px;
    }
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
  .titreLieux {
    width: 100%;
    text-align: center;
    margin-top: -2px;
    margin-bottom: 2px;
    font-weight: 700;
    font-size: 11px;
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
    overflow-y: scroll;
    height: 75vh;
    .lesamis {
      width: 100%;
      height: 70px;
      .v-responsive__sizer {
        padding: 0 !important;
      }
      .v-image {
        flex: none;
        width: 70px;
      }
      .nom {
        align-items: center;
        display: flex;
        color: black;
        font-size: 17px;
        font-weight: 700;
        margin-left: 10px;
      }
      .ligneami {
        padding-bottom: 10px;
        padding-left: 10px;
        margin: 10px;
        margin-bottom: 0;
        box-shadow: 0px 0px 16px -3px rgb(0 0 0 / 25%);
        border-radius: 15px;
        width: 95%;
        height: 80px;

        display: inline-flex;
        .v-image__image {
          width: 65px;
          height: 70px;
        }
      }
    }
    .titleinsription {
      text-align: center;
      font-family: "Noto Sans", sans-serif !important;
    }
    .activityPassed {
      opacity: 0.6;
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
  }
  .containerdivtitrerechercheevent {
    display: flex;
    justify-content: center;
    margin-top: 15%;
    text-align: center;
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
  #caseact {
    padding: 1%;
    width: 33%;
    height: 100%;
    text-align: center;
    position: relative;
    .emojidelevent {
      font-size: 30px;
    }
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
  .casenomdate {
    padding-top: 5% !important;
  }
  .titredelevent {
    font-weight: 700;
    font-size: 12px;
    height: 25px;
  }
  .datedelevent {
    color: #e92626;
    font-size: 9px;
  }
  .containerdiv {
    margin: auto;
    width: 100%;
    margin-top: 20%;
    margin-bottom: 20%;
    .titleinsription {
      text-align: center;
      font-family: "Noto Sans", sans-serif !important;
    }
  }
  .emojiMap {
    font-size: 20px;
  }
  .titreMyEvent {
    font-size: 18px;
    text-align: center;
    font-weight: 600 !important;
    color: #e92626 !important;
  }
  .lesbtncreereveent {
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
  .aucunevent {
    margin-bottom: 10px;
  }
  .avatar {
    width: 30px;
  }
  .ol-zoom,
  .ol-attribution {
    display: none !important;
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
    margin-top: 0px;
    font-size: 10px;
    opacity: 0.9;
  }
}
</style>
