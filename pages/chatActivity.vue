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
    <div class="body" v-if="!chargement">
      <div class="chat" v-if="!aucunMess"></div>
      <div class="inputmessage">
        <v-text-field
          class="textfield"
          outlined
          suffix="Envoyer"
          @click:suffix="test()"
        ></v-text-field>
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
    <div class="nomess" v-if="aucunMess">
      Sois le premier à engager le conversation pour organiser votre activitée !
    </div>
    <lefooter></lefooter>
  </div>
</template>

<script>
import degouline from "@/components/degoulinerouge";
import lefooter from "@/components/footer";

export default {
  name: "App",
  created: function() {},
  data: function() {
    return {
      chargement: false,
      aucunMess: false,
      messages: []
    };
  },
  components: {
    degouline: degouline,
    lefooter: lefooter
  },
  methods: {
    async Read() {
      this.chargement = true;
      let rescreator = await this.$axios.get(
        "/chats/" + this.$route.params.id + "/chat"
      );
      this.messages = rescreator.data;
      this.messages.length == 0
        ? (this.aucunMess = true)
        : (this.aucunMess = false);
      this.chargement = false;
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
    width: 101%;
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
  .inputmessage {
    position: fixed;
    height: 35px;
    bottom: 70px;
    margin: 10px;
    left: 0px;
    right: 0px;
    margin-bottom: 0px;
    .textfield {
      .v-text-field__suffix {
        color: #24acf2;
        margin-left: 10px;
      }
    }
  }
  .body {
    height: 70vh;
    .chat {
      height: 100%;
    }
  }
  .chargement {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: 80vh;
  }
}
</style>
