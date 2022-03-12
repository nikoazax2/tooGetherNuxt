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

    <v-card class="titrecard" to="/"> </v-card>

    <div class="chargement" v-if="chargement">
      <v-progress-circular
        indeterminate
        width="7"
        size="70"
        color="#e92626"
      ></v-progress-circular>
    </div>
    <div class="titreMyEvent" v-if="friends && friends.length > 1">
      {{ friends.length }} AMIS
    </div>
    <div class="titreMyEvent" v-if="friends && friends.length <= 1">
      {{ friends.length }} AMI
    </div>
    <div class="containerdiv">
      <div v-if="!chargement">
        <div class="lesamis" v-if="!aucunAmi">
          <div
            @click="goToProfile(friend.id)"
            class="ligneami"
            v-for="friend in friends"
            :key="friend.id"
          >
            <v-img
              class="avatar elevation-6"
              alt=""
              :src="friend.avatar"
              v-if="friend.avatar"
            ></v-img>
            <div class="photo-nom">
              <div
                v-if="friend.profileImageBlob"
                class="containercontainerPhoto"
              >
                <div class="containerPhoto">
                  <img
                    class="profile-image"
                    :src="'data:image/png;base64,' + friend.profileImageBlob"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="nom">
              {{
                friend.surname.charAt(0).toUpperCase() + friend.surname.slice(1)
              }}
            </div>
          </div>
        </div>
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
export default {
  name: "App",
  created: function() {
    if (!this.$auth.user) {
      this.$router.push({ path: "/login" });
    }
    this.Read();
  },
  data: function() {
    return {
      chargement: true,
      friends: null,
      indexImage: 0,
      aucunAmi: true
    };
  },
  components: {
    degouline: degouline,
    MglMap,
    MglMarker,
    lefooter: lefooter
  },
  methods: {
    goToProfile(id) {
      this.$router.push({ path: "/profile/?id=" + id });
    },
    async Read() {
      this.chargement = true;
      if (this.$auth.user) {
        let friendsData = await this.$axios.get(
          "users/getFriends/" + this.$auth.user.id
        );

        this.friends = friendsData.data;
        console.log(this.friends);
        if (
          this.friends.length >= 1 &&
          this.friends[0] !=
            {
              id: null,
              surname: null,
              avatar: null,
              profileImage: null
            }
        ) {
          this.aucunAmi = false;
          this.friends.forEach(friend => {
            if (friend.profileImage != null) {
              this.getProfileImage(friend);
            }
          });

          this.friends = this.friends.sort((a, b) =>
            a.surname > b.surname ? 1 : b.surname > a.surname ? -1 : 0
          );
          if (this.friends.filter(user => user.profileImage).length == 0) {
            this.chargement = false;
          }
        } else {
          this.aucunAmi = true;
          this.chargement = false;
        }
      }
    },
    async getProfileImage(user) {
      await this.$axios
        .get("users/profileImage/" + user.profileImage, {
          responseType: "arraybuffer"
        })
        .then(response => {
          user.profileImageBlob = Buffer.from(response.data, "binary")
            .toString("base64")
            .replaceAll(" ", "");

          this.indexImage = this.indexImage + 1;
        });
    }
  },
  watch: {
    "$data.indexImage": {
      handler: function(indexImage) {
        if (
          indexImage == this.friends.filter(user => user.profileImage).length
        ) {
          this.chargement = false;
        }
      },
      deep: true
    },
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
    margin-top: -27%;
    width: 100%;
    position: absolute;
  }
  .containerdiv {
    margin: auto;
    width: 100%;

    overflow-y: scroll;
    height: 82vh;
    .lesamis {
      margin-bottom: 200px;
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
  }
  .title {
    z-index: 1;
  }
  .conteneurplanet {
    width: 100%;
  }
  .titreMyEvent {
    font-size: 18px;
    text-align: center;
    font-weight: 600 !important;
    color: #e92626 !important;
    margin-top: 20%;
  }
  .planetquitourneinscription {
    margin-top: -10% !important;
    height: 20%;
    left: 35%;
    width: 33vw;
    height: 33vw;
  }
  .containercontainerPhoto {
    display: flex;
    justify-content: center;
    margin-top: 3px;
    margin-right: 10px;
    padding-left: 5px;
    padding-top: 7px;
    .profile-image {
      position: relative;
      object-fit: cover;
      width: 60px;
      height: 60px;
      border-radius: 100%;
    }
    .v-image {
    }
    .containerPhoto {
      width: 53px;
      height: 60px;
    }
  }
  .barrederecherchecontainer {
    margin-bottom: 2vh;
    margin-top: 4vh;
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
    margin-top: 15%;
    overflow-y: scroll;
    height: 72vh;
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
