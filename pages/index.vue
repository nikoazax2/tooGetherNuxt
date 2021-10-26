<template>
  <div class="vueIndex" @click="menunotif = false">
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <!-- ------------------------------------------HEADER-------------------------------------------- -->
    <v-navigation-drawer floating v-model="drawer" absolute left temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title @click="tomyevents"
              >Mes evenements</v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="$auth.user">
            <v-list-item-title @click.prevent="signOut"
              >Déconnexion</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <degouline v-if="true" id="degouline"></degouline>

    <div>
      <div class="divheader nonconnecte">
        <div
          v-if="$auth.user"
          @click.stop="drawer = !drawer"
          class="userconnected"
        >
          <div class="avatarreate">
            <v-img
              class="elevation-6 imgavataracceuil"
              alt=""
              :src="$auth.user.avatar"
            ></v-img>
          </div>
          <div class="usernameuseracceuil">
            <p class="affichenomprenomuser">
              {{ $auth.user.surname }}
            </p>
          </div>
        </div>

        <v-btn
          v-if="!$auth.user"
          color="accent"
          elevation="4"
          raised
          rounded
          small
          text
          to="/login"
          class="connexioninscription"
          >CONNEXION</v-btn
        >
        <v-btn
          v-if="!$auth.user"
          color="accent"
          elevation="4"
          raised
          rounded
          small
          text
          class="connexioninscription"
          to="/register"
          >INSCRIPTION</v-btn
        >

        <v-btn
          color="accent"
          id="btncreerevent"
          elevation="4"
          raised
          rounded
          small
          text
          @click="gotoCreationEvenet"
        >
          CREER UN EVENEMENT
          <v-btn
            id="btncreereventredinterieur"
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
        </v-btn>
      </div>
      <div @click.stop v-if="menunotif" class="popupnotifcontainercontainer">
        <div class="popupnotifcontainer">
          <div class="titre">Notifications</div>
          <div class="popupnotif">
            <div
              class="event"
              v-for="(activity, index) in listeEventsUser"
              :key="activity.id"
            >
              <code
                class="emojiNotif jump"
                v-html="'<p>&\#x1F' + activity.emoji + ';</p>'"
              >
              </code>
              <div class="contenuNotif">
                <div class="nom">{{ activity.name }}</div>
                <div class="lieux">{{ activity.lieux }}</div>
                <div class="date">{{ formatDate(activity.date) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        @click="menunotif = !menunotif"
        @click.stop
        v-if="$auth.user"
        class="btnhead btnnotif"
      >
        <div class="nbnotif">
          <div>{{ this.listeEventsUser.length }}</div>
        </div>
        <v-icon large>
          mdi-bell
        </v-icon>
      </div>
      <div @click="gotomap()" class="btnhead btncarte">
        <v-icon large>
          mdi-map
        </v-icon>
      </div>
    </div>
    <img
      class="planetquitourne"
      style="position: absolute"
      src="@/assets/planetquitournerouge.gif"
    />
    <v-card class="titrecard">
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
    <div class="containerEtapes">
      <div class="premièreligne">
        <div class="deuxieme blocchiffretexteetapes">
          <div class="num">2</div>
          <div class="text">
            <strong>RECHERCHE</strong>
            <br />CRÉE UN ÉVÉNEMENT
          </div>
        </div>
        <div class="troisieme blocchiffretexteetapes">
          <div class="num">3</div>
          <div class="text">
            <strong>RENCONTRE</strong>
            <br />AMUSE TOI
          </div>
        </div>
      </div>
      <br />
      <div class="deuxièmeligne blocchiffretexteetapes">
        <div class="premier">
          <div class="num">1</div>

          <div class="text">
            <strong>INSCRIT TOI</strong>
            <br />CONNECTE TOI
          </div>
        </div>
        <div class="quatrieme blocchiffretexteetapes">
          <div class="num">4</div>

          <div class="text">
            <strong>GARDE CONTACT</strong>
            <br />ET REBELOTE !
          </div>
        </div>
      </div>
    </div>
    <div class="planettournecontainer">
      <img
        class="planetquitourneavecperso"
        style="position: absolute"
        src="@/assets/avecperso.gif"
      />
    </div>
    <lefooter></lefooter>
  </div>
</template>

<script>
import degouline from "@/components/degoulinerouge";
import lefooter from "@/components/footer";
import { mapGetters } from "vuex";
import fileEmoji from "../assets/emoji.json";

export default {
  name: "App",
  computed: {},
  mounted: function() {
    var d = new Date();
    var day = String(d.getDate()).padStart(2, "0");
    var month = String(d.getMonth() + 1).padStart(2, "0");
    // this.placehorlderRecherche.date = day + "/" + month;
    this.placeholderChangement(
      this.placehorlderRechercheListe,
      this.placehorlderRecherche,
      day,
      month
    );
    this.getEventUser();
    this.getEmojis();
  },
  data: function() {
    return {
      menunotif: false,
      form: {
        name: "",
        lieux: "",
        date: ""
      },
      recherche: { titre: "", lieux: "", date: "" },
      drawer: false,
      group: null,
      act: ["slt", "lol"],
      placehorlderRechercheListe: {
        nom: [
          "Jouer au foot",
          "Faire un basket",
          "Aller au cinéma",
          "Boire une bière"
        ],
        lieux: ["à Grenoble", "à Lyon", "à Paris", "à Montpellier", "à Metz"]
      },
      placehorlderRecherche: {
        nom: "Aller au cinéma",
        lieux: "à Grenoble",
        date: "03/08/2021"
      },
      listeEventsUser: []
    };
  },
  components: {
    degouline: degouline,
    lefooter: lefooter
  },
  methods: {
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
    getEmojis() {
      console.log(fileEmoji.Activities);
    },
    async getEventUser() {
      this.chargement = true;
      if (this.$auth.user) {
        let eventuser = await this.$axios.get(
          "/activities/" + this.$auth.user.id + "/activityOfUser"
        );

        this.listeEventsUser = eventuser.data;

        this.listeEventsUser.forEach(element => {
          var coord = JSON.parse(element.coordlieux);
          element.coordlieux = [coord.lng, coord.lat];
        });
        console.log(this.listeEventsUser);
        this.setNotifs();
      }
      this.chargement = false;
    },
    setNotifs() {
      var dateNow = new Date();

      this.listeEventsUser.forEach(activity => {
        var Actdate = activity.date.replace(",", " ");
        Actdate = new Date(Actdate);
      });

      var dateEvent;
    },
    gotomap() {
      this.$router.push("/map");
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
    toRechercheWParam() {
      this.recherche.titre != ""
        ? (urlRechercheTitre = "/" + this.recherche.titre)
        : (urlRechercheTitre = "");
      var urlRechercheTitre;
      this.$router.push({
        path: "/recherchevent"
      });
    },
    placeholderChangement(liste, placeholder, day, month) {
      var random = Math.floor(Math.random() * liste.nom.length);
      placeholder.nom = liste.nom[random];

      var randomlieux = Math.floor(Math.random() * liste.lieux.length);
      placeholder.lieux = liste.lieux[randomlieux];

      placeholder.date = day + "/" + month + "/" + "2021";

      if (day < 30) day++;
      else {
        month = month + 1;
        day = 1;
      }

      if (month > 12) {
        month = 0;
      }
    },
    async signOut() {
      try {
        await this.$auth.logout();
      } catch (error) {
      } finally {
        this.$router.push("/");
        document.location.reload();
      }
    },
    tomyevents() {
      this.$router.push("/myevents");
    }
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
html {
  overflow: hidden;
}
.vueIndex {
  #app {
    position: relative;
    height: 100vh;
  }
  body {
    overflow: hidden;
  }
  #degouline > svg {
    width: 100%;
    height: auto;
  }
  #degouline {
    width: 100%;
    position: absolute;
  }
  .title {
    z-index: 1;
  }
  .planetquitourne {
    margin-top: 5%;
    margin-left: -20%;
    height: 20%;
  }

  .titrecard {
    margin-top: 10%;
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
  .comboActivite {
    .v-input__control {
      height: 80% !important;
    }
    .v-input__control > .v-input__slot {
      border-radius: 20px;
      box-shadow: unset !important;
      height: 30px !important;
      min-height: 20px !important;
      width: 50% !important;
      .v-select__slot > .v-input__append-inner {
        visibility: hidden;
      }
      .v-select__slot > label {
        font-size: 8px !important;
        position: unset !important;
        width: 100%;
      }
      .v-select__slot > .v-select__selections > input {
        font-size: 8px;
      }
      .v-select__slot > .v-select__selections > span {
        background-color: white;
        span {
          font-size: 8px;
        }
      }
    }
  }
  .containerEtapes {
    width: 100%;
    margin-top: 30%;
    position: absolute;
    div > div > .text {
      color: #616a79;
      font-size: 10px;
      opacity: 1;
      position: absolute;
      margin-top: -50px;
      margin-left: 35px;
    }
    .premièreligne {
      width: 100%;
      display: inline-flex;
      justify-content: center;
      div > .num {
        color: #ff0000;
        opacity: 0.23;
        padding: 20px;
        font-size: 50px;
        font-weight: bolder;
      }
      .deuxieme,
      .troisieme {
        margin-right: 15%;
      }
    }
    .deuxièmeligne {
      padding: 20px;
      padding-top: 0 !important;
      width: 100%;
      display: inline-flex;
      justify-content: space-around;
      div > .num {
        color: #ff0000;
        opacity: 0.23;
        padding: 20px;
        font-size: 50px;
        font-weight: bolder;
      }
      .premier,
      .quatrieme {
        margin-right: 30%;
        margin-left: 15%;
      }
    }
  }
  .planetpersonacceuil {
    margin-top: 50%;
    margin-left: 10% !important;
    width: 90%;
    margin-left: auto;
  }
  .planetquitourneavecperso {
    width: 100vw;
    left: 50%;
    margin-left: -50vw;
    bottom: 0;
    vertical-align: bottom;
  }
  .planettournecontainer {
    position: relative;
    bottom: 0;
    margin-top: 190vw;
  }
  .blocchiffretexteetapes {
    display: block;
  }
  #inputrechercheevent {
    font-size: 2.5vw;
    width: 18vw;
    transform: translateY(-7px);
  }
  .nomevent {
  }
  .pastille {
  }
  .date {
    width: 13vw !important;
  }
  .endroit {
    width: 18vw !important;
  }
  #btncreereventredinterieur {
    margin-top: 5px !important;
  }
  .titrecarduserheader {
    background-color: #ff0000;
  }
  .affichenomprenomuser {
    margin-top: -12px;
    position: absolute;
    color: white;
  }
  .divheader {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    z-index: 1000;
    padding-left: 5%;
    padding-right: 5%;
    div,
    a,
    button {
      height: 100% !important;
      color: white !important;
    }
    a {
      padding: 3px !important;
      span {
        font-size: 10px;
        margin-left: 0px;
        margin-right: 0px;
      }
    }
    #btncreerevent {
      padding: 1px !important;
      box-shadow: 0px 0px 16px -3px rgb(0 0 0 / 25%);
      background-color: white;
      span {
        font-size: 10px;
        color: #727c8e;
        font-weight: 700;
        #btncreereventredinterieur {
          border-radius: 50%;
          margin-left: 5px;
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
      }
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
  .userconnected {
    display: inline-flex;
    justify-content: space-around !important;
    align-items: center;
    justify-content: center;
    .imgavataracceuil {
      width: 50px;
    }
    .usernameuseracceuil {
      margin-left: 10px;
      width: fit-content;
      display: block;
      width: 100%;
    }
  }
  .btnhead {
    margin-top: 5px;
    position: relative;
    float: right;
    margin-right: 30px;
    i {
      font-size: 30px !important;
      color: white;
    }
    .nbnotif {
      position: absolute;
      width: 23px;
      height: 23px;
      text-align: center;
      background-color: #65c9ff;
      border: solid white 2px;
      color: white;
      border-radius: 100px;
      z-index: 20;
      margin-left: 15px;

      div {
        margin-top: -2px !important;
      }
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
  .popupnotifcontainercontainer {
    z-index: 1000;
    width: 100vw;
    position: absolute;
    margin-top: 40px;
    .popupnotifcontainer {
      padding: 15px;
      border-radius: 15px;
      margin-right: 25px;
      float: right;
      background-color: white;
      width: 300px;
      box-shadow: 0px 0px 10px 7px rgba(0, 0, 0, 0.15);
      .titre {
        font-weight: 600;
        font-size: 18px;
      }
      .emojiNotif {
        font-size: 40px;
      }
      .event {
        display: inline-flex;
        margin-top: 10px;
        margin-bottom: 10px;
        .contenuNotif {
          margin-left: 10px;
          .nom {
            font-weight: 600;
            white-space: nowrap;
          }
          .lieux {
            font-size: 12px;
            white-space: nowrap;
          }
          .date {
            font-weight: bold;
            color: #e92626;
            font-size: 12px;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
