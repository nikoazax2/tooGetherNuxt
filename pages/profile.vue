<template>
  <div class="vueIndex" @click="menunotif = false">
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <!-- ------------------------------------------HEADER-------------------------------------------- -->

    <degouline v-if="true" id="degouline"></degouline>
    <div
      @click="$router.push(`/editProfile?id=${$auth.user.id}`)"
      class="icon-edit-profile"
      v-if="$auth.user.id == $route.query.id"
    >
      <v-icon>mdi-pencil</v-icon>
    </div>
    <img
      class="planetquitourne"
      style="position: absolute"
      src="@/assets/planetquitournerouge.gif"
    />
    <div v-if="!chargement" class="contenu-vue vue-profil">
      <div class="avatarreate-container">
        <div class="avatarreate">
          <v-img
            class="elevation-6 imgavataracceuil"
            alt=""
            :src="user.avatar"
          ></v-img>
        </div>
      </div>
      <div v-if="profileImageBlob" class="containercontainerPhoto">
        <div class="containerPhoto">
          <img
            class="profile-image"
            :src="'data:image/png;base64,' + profileImageBlob"
            alt=""
          />
        </div>
      </div>

      <div class="info-container">
        <div class="infos">{{ user.surname }}</div>
      </div>
      <div class="btn-countainer">
        <div class="btn-ami" v-if="!user.friend" @click="ajoutFriend()">
          <v-icon color="white" small> mdi-plus </v-icon>
          ajouter
        </div>

        <div class="btn-ami" v-if="user.friend" @click="removeFriend()">
          <v-icon color="white" small> mdi-check </v-icon>
          ami
        </div>
        <!--  <div class="btn-mess">
          <v-icon color="white" small> mdi-message-outline </v-icon> message
        </div> -->
      </div>
      <div class="bio">{{ user.bio }}</div>
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
import fileEmoji from "../assets/emoji.json";

export default {
  name: "App",
  computed: {},
  mounted: function() {
    this.getUser();
  },
  data: function() {
    return {
      chargement: true,
      user: null,
      profileImageBlob: null
    };
  },
  components: {
    degouline: degouline,
    lefooter: lefooter
  },
  methods: {
    async removeFriend() {
      await this.$axios
        .post(`${process.env.URL}/users/suppFriend`, {
          idUser: this.$auth.user.id,
          idFriend: this.user.id
        })
        .then(response => {
          if (response.status == 201) {
            console.log("removed");
            this.getUser();
          }
        });
    },
    async ajoutFriend() {
      await this.$axios
        .post(`${process.env.URL}/users/addFriend`, {
          idUser: this.$auth.user.id,
          idFriend: this.user.id
        })
        .then(response => {
          if (response.status == 201) {
            console.log("inséré");
            this.getUser();
          }
        });
    },
    async getUser() {
      this.chargement = true;
      let userData = await this.$axios.get(
        "users/profile/" + this.$route.query.id + "/" + this.$auth.user.id
      );
      this.user = userData.data.profilUser;
      this.user.friend = userData.data.friend;
      this.getProfileImage();
      this.chargement = false;
    },
    async getProfileImage() {
      if (this.user.profileImage) {
        await this.$axios
          .get("users/profileImage/" + this.user.profileImage, {
            responseType: "arraybuffer"
          })
          .then(response => {
            this.profileImageBlob = Buffer.from(
              response.data,
              "binary"
            ).toString("base64");
          });
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
  overflow: hidden;
}
.vueIndex {
  .icon-edit-profile {
    float: right;
    i {
      color: white;
      padding: 40px;
      position: absolute;
      z-index: 100;
      right: 0;
    }
  }
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
  .contenu-vue {
    padding-top: 2vh;
    .avatarreate-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      .avatarreate {
        width: 40vw;
      }
    }
    .info-container {
      position: absolute;
      z-index: 1;
      width: 100vw;
      text-align: center;
      color: white;
      font-weight: 700;
      margin-top: 10px;
    }
    .btn-countainer {
      position: absolute;
      z-index: 1;
      width: 100vw;
      text-align: center;
      .btn-ami {
        margin-right: 5px;
      }
      .btn-ami,
      .btn-mess {
        text-align: center;
        display: inline-flex;
        margin-top: 40px;
        color: white;
        font-size: 12px;
        font-weight: 700;
        border: 2px white solid;
        border-radius: 15px;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        i {
          color: white;
          margin-right: 5px;
          font-size: 18px !important;
        }
      }
      .btn-ami:hover,
      .btn-mess:hover {
        background-color: rgba(255, 255, 255, 0.2);
        cursor: pointer;
      }
    }
    .bio {
      position: absolute;
      z-index: 1;
      width: 100vw;
      text-align: center;
      font-size: 14px;
      padding: 20px;
      color: white;
      font-weight: 700;
      margin-top: 80px;
    }
  }
  .planetquitourne {
    margin-top: 5%;
    margin-left: -20%;
    height: 20%;
  }
  .vue-profil {
    .containercontainerPhoto {
      display: flex;
      justify-content: center;

      .profile-image {
        position: relative;
        object-fit: cover;
        width: 150px;
        height: 150px;
        border-radius: 100%;
        border: white 5px solid;
      }
      .v-image {
      }
      .containerPhoto {
        width: 150px;
        height: 150px;
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
    margin-top: 183vw;
  }
  .chargement {
    text-align: center;
    margin-left: 41vw;
    margin-top: 61vh;
    position: absolute;
    height: 100%;
  }
}
</style>
