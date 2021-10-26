<template>
  <div id="app" class="vuelogin">
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <!-- ------------------------------------------HEADER-------------------------------------------- -->
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Alertes</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Mes evenements</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Mes amis</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Paramètres</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <degouline v-if="true" id="degoulinelogin"></degouline>
    <headere></headere>
    <img
      class="planetquitourne"
      style="position: absolute"
      src="@/assets/planetquitournerouge.gif"
    />
    <v-card class="titrecard" @click="gotoslash">
      <v-card-title>T o o G e t h e r</v-card-title>
      <v-card-text
        >Faites des rencontres en faisant ce que vous aimez</v-card-text
      >
    </v-card>
    <form class="formulaireconnexion" action="#" @submit.prevent="submit">
      <div class="form-group row rowlogin">
        <div class=" col-md-6">
          <input
            id="email"
            type="email"
            class=" form-control"
            placeholder="E-mail"
            name="email"
            value
            required
            autofocus
            v-model="form.email"
          />
        </div>
      </div>

      <div class="form-group row rowlogin">
        <div class="col-md-6">
          <input
            placeholder="Mot de passe"
            id="password"
            type="password"
            class="form-control"
            name="password"
            required
            v-model="form.password"
          />
        </div>
      </div>
    </form>
    <p class="mdpforget " v-if="errorAuth">Erreur d'authentification</p>
    <p class="mdpforget grey" v-if="errorAuth" @click="envoieMailRecup">
      Mot de passe oublié
    </p>
    <div class="btnlogin" @click="submit">
      <button class="btn btn-primary">Se connecter</button>
    </div>
    <div class="btnlogin creercompte" @click="toregister">
      <button class="btn btn-primary ">
        Créer un compte
      </button>
    </div>
  </div>
</template>

<script>
import degouline from "@/components/degoulinerouge";
import headere from "@/components/headerlogin";
const API_URL = "http://dev-tgt.local:3000/api";
export default {
  name: "App",
  created: function() {},

  data: function() {
    return {
      form: {
        email: "",
        password: ""
      },
      errorAuth: false,
      drawer: false,
      group: null,
      act: ["slt", "lol"]
    };
  },
  components: {
    degouline: degouline,
    headere: headere
  },
  methods: {
    envoieMailRecup() {},
    gotoslash() {
      this.$router.push("/");
    },
    async submit() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.form
        });
        this.$router.push("/");
      } catch (err) {
        if (err.toString().includes("401")) {
          this.errorAuth = true;
        }
      }
    },
    toregister() {
      this.$router.push("/register");
    }
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
.vuelogin {
  body {
    overflow: hidden;
  }
  #degoulinelogin > svg {
    width: 100%;
    height: auto;
  }
  #degoulinelogin {
    z-index: -1;
    margin-top: -10% !important;
    width: 101%;
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
  .planettournecontainer {
    height: 100%;
  }
  .blocchiffretexteetapes {
    display: block;
  }
  .rowlogin {
    padding-left: 15px;
    padding-top: 0px;
    border-radius: 20px;
    margin: 20px;
    height: 40px;
    box-shadow: 0px 0px 16px -3px rgb(0 0 0 / 25%);
    div > input {
      width: 97%;
    }
  }
  .btnlogin {
    text-align: center;
    padding-top: 10px;
    border-radius: 20px;
    margin: 20px;
    height: 40px;
    background-color: #e92626;
    color: white;
    box-shadow: 0px 0px 10px -3px rgb(233 38 38 / 50%);
    font-weight: 700;
  }
  .btnlogin.creercompte {
    background-color: white;
    color: #e92626;
  }
  .formulaireconnexion {
    margin-bottom: 50px;
    margin-top: 35%;
  }
  .mdpforget {
    text-align: center;
    font-size: 12px;
    color: #e92626;
  }
  .grey {
    color: grey;
  }
}
</style>
