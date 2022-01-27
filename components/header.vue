<template>
  <div>
    <div v-if="!user.loggedIn" class="divheader nonconnecte">
      <v-btn
        color="accent"
        elevation="4"
        raised
        rounded
        small
        text
        to="/Connexion"
        class="connexioninscription"
        >CONNEXION</v-btn
      >
      <v-btn
        color="accent"
        elevation="4"
        raised
        rounded
        small
        text
        class="connexioninscription"
        to="/Inscription"
        >INSCRIPTION</v-btn
      >
      <v-btn
        v-if="!user.loggedIn"
        color="accent"
        id="btncreerevent"
        elevation="4"
        raised
        rounded
        small
        text
      >
        CREER UNE ACTIVITÉ
        <v-btn
          id="btncreereventredinterieur btncreeract"
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
      <v-btn
        v-if="user.loggedIn"
        color="accent"
        id="btncreerevent"
        elevation="4"
        raised
        rounded
        small
        text
      >
        CREER UNE ACTIVITÉ
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
    <div v-if="user.loggedIn" class="divheaderconnecte">
      <div>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="btndrawer item"
        ></v-app-bar-nav-icon>
      </div>
      <div class="userconnected">
        <v-card class="titrecarduserheader">
          <v-card-title>{{ user.data.firstName }}</v-card-title>
        </v-card>
        {{ user.name }}
      </div>

      <div>
        <v-btn
          v-if="!user.loggedIn"
          color="accent"
          id="btncreerevent"
          elevation="4"
          raised
          rounded
          small
          text
        >
          CREER UNE ACTIVITÉ
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
        <v-btn
          v-if="user.loggedIn"
          color="accent"
          id="btncreerevent"
          elevation="4"
          raised
          rounded
          small
          text
        >
          CREER UNE ACTIVITÉ
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
  justify-content: space-evenly;
}
#btncreeract > .v-btn__content {
  padding: 0 !important;
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
