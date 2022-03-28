<template>
  <v-app class="vueregister">
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <!-- ------------------------------------------HEADER-------------------------------------------- -->

    <degouline v-if="true" id="degoulineInscription"></degouline>
    <div class="conteneurplanet">
      <img
        class="planetquitourneinscription"
        style="position: absolute"
        src="@/assets/planetquitournerouge.gif"
      />
    </div>

    <div class="body-register" v-if="!chargement">
      <div class="containerdiv containerdivinscr">
        <p class="titleinsription">PROFIL</p>
      </div>
      <form class="formulairereg" action="#" @submit.prevent="submit">
        <div class="form-group row rowregister">
          <div class=" col-md-6">
            <input
              id="name"
              type="text"
              class=" form-control"
              placeholder="Surnom"
              name="name"
              value
              required
              autofocus
              v-model="form.surname"
            />
          </div>
        </div>
        <div class="form-group row rowregister">
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
      </form>
      <div class="choix-photo-ou-avatar">
        <div class="btnreg avatar">
          <v-file-input
            @change="Preview_image"
            :rules="[
              value =>
                !value ||
                value.size < 2000000 ||
                'La photo doit être de moins de 2MB !'
            ]"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            v-model="tempProfilePhoto"
            label="Importer une photo"
            @click="chooseAvatarOrProfile = 'photo'"
          ></v-file-input>
        </div>
        <div class="ou">OU</div>
        <div class="btnreg avatar" @click="changeavatar">
          <button
            class="btn btn-primary "
            @click="
              (chooseAvatarOrProfile = 'avatar'),
                (tempProfilePhoto = null),
                (form.profilePhoto = null),
                (url = null)
            "
          >
            Choisir un avatar
          </button>
        </div>
      </div>
      <div
        v-if="chooseAvatarOrProfile == 'photo'"
        class="containercontainerPhoto"
      >
        <div class="containerPhoto">
          <v-img class="imgPhoto" :src="url"></v-img>
        </div>
      </div>
      <div
        v-if="!chargeimg && chooseAvatarOrProfile == 'avatar'"
        class="avatarreate"
      >
        <v-img class="elevation-6 imgavatar" alt="" :src="srcavatar"></v-img>
      </div>
      <div v-if="chargeimg" class="chargimg"></div>

      <div class="form-group row rowbio">
        <div class="col-md-6">
          <textarea
            placeholder="Bio"
            id="bio"
            type="bio"
            class="form-control"
            name="bio"
            required
            v-model="form.bio"
            maxlength="100"
          />
        </div>
      </div>

      <v-combobox
        dense
        label="Hobbies"
        class="combo-hobbies"
        multiple
        outlined
        v-model="hobbiesChoix"
        item-text="name"
        item-value="id"
        small-chips
        :items="hobbies.data"
      ></v-combobox>
      <div v-if="pasToutRemplis" class="pas-tout-remplis">
        Tu n’as pas rempli toutes les informations
      </div>
      <div v-if="emailInvalide" class="pas-tout-remplis">
        Email invalide
      </div>
      <div class="btnreg" @click="submitPhoto">
        <button class="btn btn-primary">Sauvegarder</button>
      </div>
      <div
        @click="$router.push(`/profile?id=${$auth.user.id}`)"
        class="annuler"
      >
        Annuler
      </div>
    </div>
  </v-app>
</template>

<script>
import degouline from "@/components/degoulinerouge";
const API_URL = "http://api.toogther.com/api";
import hobbies from "../assets/hobbies.json";

export default {
  name: "App",
  created: function() {
    this.hobbies = hobbies;

    this.getUser();
  },
  data: function() {
    return {
      hobbies: null,
      chooseAvatarOrProfile: "avatar",
      drawer: false,
      tempProfilePhoto: [],
      group: null,
      url: "",
      act: ["slt", "lol"],
      form: {
        surname: "",
        email: "",
        password: "",
        avatar: "",
        bio: "",
        profilePhoto: []
      },
      hobbiesChoix: [],
      chargement: false,
      srcavatar:
        "https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Heather&clotheType=GraphicShirt&eyeType=Cry&eyebrowType=UnibrowNatural&facialHairColor=Brown&facialHairType=MoustacheMagnum&hairColor=Blonde&mouthType=Twinkle&skinColor=Pale&topType=NoHair",

      error: null,
      choixavatar: { Hair: "NoHair" },
      possibiiteavatar: {
        avatarStyle: ["Circle"],
        accessoriesType: [
          "Blank",
          "Kurt",
          "Prescription01",
          "Prescription02",
          "Round",
          "Sunglasses",
          "Wayfarers"
        ],
        clotheColor: [
          "Black",
          "Blue01",
          "Blue02",
          "Blue03",
          "Gray01",
          "Gray02",
          "Heather",
          "PastelBlue",
          "PastelGreen",
          "PastelOrange",
          "PastelRed",
          "PastelYellow",
          "Pink",
          "Red",
          "White"
        ],
        clotheType: [
          "BlazerShirt",
          "BlazerSweater",
          "CollarSweater",
          "GraphicShirt",
          "Hoodie",
          "Overall",
          "ShirtCrewNeck",
          "ShirtScoopNeck",
          "ShirtVNeck"
        ],
        eyeType: [
          "Close",
          "Cry",
          "Default",
          "Dizzy",
          "EyeRoll",
          "Happy",
          "Hearts",
          "Side",
          "Squint",
          "Surprised",
          "Wink",
          "WinkWacky"
        ],
        eyebrowType: [
          "Angry",
          "AngryNatural",
          "Default",
          "DefaultNatural",
          "FlatNatural",
          "RaisedExcited",
          "RaisedExcitedNatural",
          "SadConcerned",
          "SadConcernedNatural",
          "UnibrowNatural",
          "UpDown",
          "UpDownNatural"
        ],
        facialHairColor: [
          "Auburn",
          "Black",
          "Blonde",
          "BlondeGolden",
          "Brown",
          "BrownDark",
          "Platinum",
          "Red"
        ],
        facialHairType: [
          "Blank",
          "Blank",
          "Blank",
          "Blank",
          "Blank",
          "Blank",
          "Blank",
          "BeardMedium",
          "BeardLight",
          "BeardMagestic",
          "MoustacheFancy",
          "MoustacheMagnum"
        ],
        hairColor: [
          "Black",
          "Blue01",
          "Blue02",
          "Blue03",
          "Gray01",
          "Gray02",
          "Heather",
          "PastelBlue",
          "PastelGreen",
          "PastelOrange",
          "PastelRed",
          "PastelYellow",
          "Pink",
          "Red",
          "White"
        ],
        mouthType: [
          "Concerned",
          "Default",
          "Disbelief",
          "Eating",
          "Grimace",
          "Sad",
          "ScreamOpen",
          "Serious",
          "Smile",
          "Tongue",
          "Twinkle"
        ],
        skinColor: [
          "Tanned",
          "Yellow",
          "Pale",
          "Light",
          "Brown",
          "DarkBrown",
          "Black"
        ],
        topType: [
          "NoHair",
          "Eyepatch",
          "Hat",
          "Hijab",
          "Turban",
          "WinterHat1",
          "WinterHat2",
          "WinterHat3",
          "WinterHat4",
          "LongHairBigHair",
          "LongHairBob",
          "LongHairBun",
          "LongHairCurly",
          "LongHairCurvy",
          "LongHairDreads",
          "LongHairFrida",
          "LongHairFro",
          "LongHairFroBand",
          "LongHairNotTooLong",
          "LongHairShavedSides",
          "LongHairMiaWallace",
          "LongHairStraight",
          "LongHairStraight2",
          "LongHairStraightStrand",

          "ShortHairDreads01",
          "ShortHairDreads02",
          "ShortHairFrizzle",
          "ShortHairShaggyMullet",
          "ShortHairShortCurly",
          "ShortHairShortFlat",
          "ShortHairShortRound",
          "ShortHairShortWaved",
          "ShortHairSides",
          "ShortHairTheCaesar",
          "ShortHairTheCaesarSidePart"
        ]
      },
      chargeimg: false,
      imageProfilRenvoyee: "",
      pasToutRemplis: false,
      messageNbPass: false,
      emailInvalide: false
    };
  },
  components: {
    degouline: degouline
  },
  methods: {
    Preview_image() {
      if (
        this.tempProfilePhoto &&
        this.tempProfilePhoto.type &&
        "image/png image/jpeg image/bmp".includes(this.tempProfilePhoto.type)
      ) {
        this.form.profilePhoto = this.tempProfilePhoto;
        console.log("profilephoto");
        console.log(this.form.profilePhoto);
        this.url = URL.createObjectURL(this.form.profilePhoto);
      } else {
        this.tempProfilePhoto = [];
      }
      this.chargement = false;
    },
    gotologin() {
      this.$router.push("/login");
    },
    async getUser() {
      this.chargement = true;
      let userData = await this.$axios.get(
        "users/profile/" + this.$route.query.id + "/" + this.$auth.user.id
      );

      this.form = {
        surname: userData.data.profilUser.surname,
        email: userData.data.profilUser.email,
        password: userData.data.profilUser.password,
        avatar: userData.data.profilUser.avatar
          ? userData.data.profilUser.avatar
          : "",
        bio: userData.data.profilUser.bio,
        profilePhoto: []
      };
      let tab = JSON.parse("[" + userData.data.profilUser.interests + "]");
      if (tab.length > 0) {
        tab.forEach(hobbie => {
          console.log(hobbie);
          this.hobbiesChoix.push(
            hobbies.data.filter(obj => {
              return obj.id == hobbie.toString();
            })[0]
          );
        });
      }
      if (this.form.avatar) {
        this.srcavatar = this.form.avatar;
        this.chargement = false;
      } else {
        this.chooseAvatarOrProfile = "photo";
        this.srcavatar = null;
        this.getProfileImage(userData.data.profilUser.profileImage);
      }
    },
    async getProfileImage(profileImage) {
      await this.$axios
        .get("users/profileImage/" + profileImage, {
          responseType: "arraybuffer"
        })
        .then(response => {
          this.tempProfilePhoto = response.data;
          this.Preview_image();
        });
    },
    ValidateEmail() {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.form.email.match(mailformat)) {
        this.emailInvalide = false;
        return true;
      } else {
        this.emailInvalide = true;
        return false;
      }
    },
    changeavatar() {
      var accessoriesType = this.possibiiteavatar.accessoriesType[
        Math.floor(Math.random() * this.possibiiteavatar.accessoriesType.length)
      ];
      var avatarStyle = "Circle";
      var clotheColor = this.possibiiteavatar.clotheColor[
        Math.floor(Math.random() * this.possibiiteavatar.clotheColor.length)
      ];
      var clotheType = this.possibiiteavatar.clotheType[
        Math.floor(Math.random() * this.possibiiteavatar.clotheType.length)
      ];
      var eyeType = this.possibiiteavatar.eyeType[
        Math.floor(Math.random() * this.possibiiteavatar.eyeType.length)
      ];
      var eyebrowType = this.possibiiteavatar.eyebrowType[
        Math.floor(Math.random() * this.possibiiteavatar.eyebrowType.length)
      ];
      var facialHairColor = this.possibiiteavatar.facialHairColor[
        Math.floor(Math.random() * this.possibiiteavatar.facialHairColor.length)
      ];
      var facialHairType = this.possibiiteavatar.facialHairType[
        Math.floor(Math.random() * this.possibiiteavatar.facialHairType.length)
      ];
      var hairColor = this.possibiiteavatar.hairColor[
        Math.floor(Math.random() * this.possibiiteavatar.hairColor.length)
      ];
      var mouthType = this.possibiiteavatar.mouthType[
        Math.floor(Math.random() * this.possibiiteavatar.mouthType.length)
      ];
      var skinColor = this.possibiiteavatar.skinColor[
        Math.floor(Math.random() * this.possibiiteavatar.skinColor.length)
      ];
      var topType = this.possibiiteavatar.topType[
        Math.floor(Math.random() * this.possibiiteavatar.topType.length)
      ];
      this.srcavatar = `https://avataaars.io/?accessoriesType=${accessoriesType}&avatarStyle=${avatarStyle}&clotheColor=${clotheColor}&clotheType=${clotheType}&eyeType=${eyeType}&eyebrowType=${eyebrowType}&facialHairColor=${facialHairColor}&facialHairType=${facialHairType}&hairColor=${hairColor}&mouthType=${mouthType}&skinColor=${skinColor}&topType=${topType}`;

      this.form.avatar = this.srcavatar;
    },
    async testexistmail() {
      let res = await this.$axios.get("/activities");
    },
    async submitPhoto() {
      if (this.chooseAvatarOrProfile == "photo") {
        let formData = new FormData();
        formData.append("file", this.form.profilePhoto);
        console.log(formData);
        await this.$axios
          .post(`${process.env.URL}/users/profileImage`, formData)
          .then(response => {
            this.imageProfilRenvoyee = response.data.filename;
            if (response.status === 201) {
              this.submit();
            }
          });
      } else {
        this.submit();
      }
    },
    testPasToutRempli() {
      let form = this.form;
      if (form.surname == "" || form.email == "" || form.bio.length == "") {
        this.pasToutRemplis = true;
      } else {
        this.pasToutRemplis = false;
      }
    },
    async submit() {
      this.testPasToutRempli();
      let interests = this.hobbiesChoix.map(a => a.id);
      this.chooseAvatarOrProfile != "avatar"
        ? (this.form.avatar = null)
        : (this.imageProfilRenvoyee = null);
      if (this.ValidateEmail() && !this.pasToutRemplis) {
        await this.$axios
          .patch(`${process.env.URL}/users/` + this.$auth.user.id, {
            interests: interests.length > 0 ? JSON.stringify(interests) : "",
            surname: this.form.surname,
            email: this.form.email,
            avatar: this.form.avatar,
            profileImage: this.imageProfilRenvoyee,
            bio: this.form.bio
          })
          .then(response => {});
      }
    },
    async login() {
      let response = await this.$auth
        .loginWith("local", {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
        .then(response => {
          if (response.status === 201) {
            this.$router.push("/");
          }
        });
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
#app {
  position: relative;
  height: 100vh;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  opacity: 0 !important;
}
.vueregister {
  body {
    overflow: hidden;
  }
  #degoulineInscription > svg {
    margin-top: -55vw;
    width: 100%;
    height: auto;
  }
  #degoulineInscription {
    width: 100%;
    position: absolute;
  }
  .title {
    z-index: 1;
  }
  .conteneurplanet {
    width: 100%;
  }
  .planetquitourneinscription {
    margin-top: -20% !important;
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
  .combo-hobbies {
    margin: 20px;
    .v-text-field__details {
      display: none;
    }
    .v-input__slot {
      border-radius: 70px;
      border-color: white !important;
      box-shadow: 0px 0px 16px -3px rgb(0 0 0 / 25%);
    }
    fieldset {
      border-color: white;
    }
  }
  .outlined {
    background-color: transparent !important;
    border: 2px solid #65c9ff !important;
  }
  .avatar {
    .v-input {
      margin-top: -20px !important;
      .v-input__prepend-outer {
        display: none;
      }
      .v-label {
        padding-left: 5%;
        text-align: center;
        width: 100%;
        color: white;
      }
      .v-input__slot {
        border-color: white !important;
      }
      .v-text-field__slot {
        border: none;
      }
    }
  }

  .rowregister {
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
  .rowbio {
    padding-left: 15px;
    padding-top: 0px;
    border-radius: 20px;
    margin: 20px;
    height: 120px;
    box-shadow: 0px 0px 16px -3px rgb(0 0 0 / 25%);
    div > textarea {
      width: 97%;
      height: 100%;
    }
  }
  .pas-tout-remplis {
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #e92626;
  }
  .message-mdp {
    width: 100%;
    font-size: 12px;
    color: grey;
    text-align: center;
    margin-top: -10px;
  }
  .containercontainerPhoto {
    display: flex;
    justify-content: center;

    .v-image__image {
      width: 275px;
      height: 275px;
      border-radius: 100%;
    }
    .v-image {
      height: 100%;
    }
    .containerPhoto {
      width: 275px;
      height: 275px;
    }
  }
  .choix-photo-ou-avatar {
    display: flex;
    justify-content: center;
    margin: 20px;
    .ou {
      display: flex;
      align-items: center;
      color: #65c9ff;
      font-weight: 700;
      font-family: "Noto Sans", sans-serif;
    }
  }
  .annuler {
    width: 100%;
    font-size: 14px;
    color: grey;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .btnreg {
    text-align: center;
    padding-top: 10px;
    border-radius: 20px;
    margin: 5px;
    height: 40px;
    background-color: #e92626;
    color: white;
    box-shadow: 0px 0px 10px -3px rgb(233 38 38 / 50%);
    font-weight: 700;
  }
  .btnreg.avatar {
    width: 45%;
    background-color: #65c9ff;
    box-shadow: 0px 0px 10px -3px rgb(101 201 255 / 50%);
    label,
    button {
      font-size: 14px;
    }
  }
  .btnreg.creercompte {
    background-color: white;
    color: #e92626;
  }
  .formulairereg {
    margin-bottom: 20px;
    margin-top: 0%;
  }
  .containerdivinscr {
    text-align: center;
    margin-top: 30%;
  }
  .avatarreate {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
  .chargimg {
    height: 275px;
  }
  .imgavatar {
    box-shadow: none !important;
    width: 100%;
  }
  .titleinsription {
    color: #e92626;
    font-weight: 700;
    font-family: "Noto Sans", sans-serif;
  }
  .body-register {
    overflow-y: scroll;
    height: 100vh;
  }
}
</style>
