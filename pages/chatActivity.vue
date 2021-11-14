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
    <div class="body" v-if="!chargement && !aucunMess">
      <div class="messages">
        <div
          :class="{ envoyeur: $auth.$state.user.id == message.userId }"
          class="message"
          v-for="(message, key) in messages"
          :key="key"
        >
          {{ message.message }}
        </div>
      </div>
      <div class="inputmessage">
        <v-text-field v-model="messageInput" class="textfield" outlined>
          <template v-slot:append>
            <div @click.stop @click="envoiMessage">ENVOYER</div>
          </template></v-text-field
        >
      </div>
    </div>
    <div class="body bodyNomess" v-if="!chargement && aucunMess">
      <div class="nomess" v-if="aucunMess">
        Sois le premier à engager la conversation <br />
        pour organiser votre activitée !
      </div>
      <div class="inputmessage">
        <v-text-field v-model="messageInput" class="textfield" outlined>
          <template v-slot:append>
            <div @click.stop @click="envoiMessage">ENVOYER</div>
          </template></v-text-field
        >
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

    <lefooter></lefooter>
  </div>
</template>

<script>
import degouline from "@/components/degoulinerouge";
import lefooter from "@/components/footer";
const API_URL = "http://dev-tgt.local:3001/api";

export default {
  name: "App",
  created: function() {},
  data: function() {
    return {
      messageInput: "",
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
    async envoiMessage() {
      console.log("test");
      await this.$axios
        .post(`${API_URL}/chats`, {
          userId: this.$auth.$state.user.id,
          message: this.messageInput,
          date: new Date(),
          activityId: this.$route.params.id
        })
        .then(response => {
          if (response.status == 201) {
            this.messageInput = "";
            this.Read();
            console.log("inséré");
          }
        });
    },
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
      .v-input__append-inner {
        margin-top: 40%;
        height: 50px;
        margin: 0 !important;
        div {
          display: flex;
          align-items: center;
          color: #24acf2;
          font-size: 12px;
          height: 100% !important;
          margin: 0;
        }
      }
    }
  }
  .body {
    height: 70vh;
    display: flex;
    flex-direction: column;

    .chat {
      height: 100%;
    }

    .messages {
      display: inline-block;
      margin-top: auto;
      margin-bottom: 0 !important;
      .message {
        background-color: white;
        border: #ff0000 2px solid;
        color: rgb(36, 36, 36);
        float: left !important;
        border-radius: 25px;
        font-size: 12px;
        padding: 10px;
        margin: 10px;
        margin-bottom: 7px;
        margin-top: 7px;
        width: fit-content;
      }
      .message.envoyeur {
        background-color: red;
        color: white;
        float: right !important;
      }
    }
  }
  .body.bodyNomess {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: #ff0000;
    .nomess {
      opacity: 0.8;
      font-size: 14px;
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
