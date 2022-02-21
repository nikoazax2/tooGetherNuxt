<template>
  <div class="chat">
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
      <v-card v-if="!chargement" class="titrecard" to="/">
        <code
          class="emojiNotif jump"
          v-html="'<p>&\#x1F' + activity.activity_emoji + ';</p>'"
        >
        </code
        ><br />
        {{ activity.activity_name }}
      </v-card>
    </div>
    <div class="containerbody" v-if="!chargement && !aucunMess">
      <div class="body">
        <div class="messages">
          <div
            class="containermessage"
            :class="{ envoyeur: $auth.$state.user.id == message.userId }"
            v-for="(message, key) in messages"
            :key="key"
          >
            <div
              class="messavatar"
              v-if="$auth.$state.user.id != message.userId"
            >
              <div class="avatarmess">
                <v-img
                  class="elevation-6 imgavataracceuil"
                  alt=""
                  :src="message.user_avatar"
                ></v-img>
              </div>
              <div class="message">
                {{ message.chat_message }}
              </div>
            </div>
            <div
              class="messavatar"
              v-if="$auth.$state.user.id == message.userId"
            >
              <div class="message">
                {{ message.chat_message }}
              </div>
              <div class="avatarmess">
                <v-img
                  class="elevation-6 imgavataracceuil"
                  alt=""
                  :src="message.user_avatar"
                ></v-img>
              </div>
            </div>
          </div>
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
        pour organiser votre activité !
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
      chargement: true,
      aucunMess: false,
      messages: [],
      activity: null
    };
  },
  components: {
    degouline: degouline,
    lefooter: lefooter
  },
  methods: {
    async envoiMessage() {
      if (this.messageInput != "") {
        await this.$axios
          .post(`${process.env.URL}/chats`, {
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
      }
    },
    async Read() {
      this.chargement = true;

      /*  let res = await this.$axios.get(
        "/activities/" + this.$route.params.id + "/detail"
      );
      this.activity = res.data; */

      let rescreator = await this.$axios.get(
        "/chats/" + this.$route.params.id + "/chat"
      );
      this.messages = rescreator.data.chats;
      this.activity = rescreator.data.activity[0];
      console.log(this.activity);
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
.chat {
  height: 100vh !important;
  .containerbody {
    height: 100vh !important;
    flex-direction: column-reverse;
    display: flex;
    padding-bottom: 74px;
  }
  body {
    height: 100%;
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
    z-index: 1;
    margin-top: -20%;
    width: 100%;
    position: absolute;
  }
  .conteneurplanet {
    margin-top: -10% !important;
    z-index: 1000;
    position: absolute;
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
    width: 100vw;
    position: absolute;
    padding-top: 20%;
    margin-top: 0% !important;
    background-color: transparent !important;
    box-shadow: unset !important;
    text-align: center;
    color: white;
    font-weight: 700;
    .v-card__title {
      font-weight: 700;
      justify-content: center;

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
          margin-top: 3px;
        }
      }
    }
  }
  .body {
    padding-top: 50px;
    height: 75vh;
    width: 100vw;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: column-reverse;
    position: absolute;
    overflow-y: scroll;
    margin-bottom: 30px;
    .chat {
      height: 100%;
    }

    .messages {
      display: inline-block;
      margin-top: 0;
      margin-bottom: 0 !important;
      .containermessage {
        width: 100%;
        height: fit-content;
        display: flex;
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
          margin-top: 0px;
          width: fit-content;
        }
      }
      .envoyeur {
        justify-content: right;
        .message {
          background-color: red;
          color: white;
          float: right !important;
          max-width: 80vw;
          overflow-wrap: break-word;
        }
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
  .messavatar {
    display: inline-flex;
    align-items: end;
    .avatarmess {
      width: 40px;
      transform: translate(0, -7px);
    }
  }
  .emojiNotif {
    font-size: 40px;
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
}
</style>
