<template>
  <div class="vueregister">
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

    <div class="body-register">
      <div class="containerdiv containerdivinscr">
        <p class="titleinsription">INSCRIPTION</p>
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

        <div class="form-group row rowregister">
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

      <div class="btnreg" @click="submitPhoto">
        <button class="btn btn-primary">S'inscrire</button>
      </div>
      <div class="btnreg creercompte" @click="gotologin">
        <button class="btn btn-primary ">
          J'ai déjà un compte
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import degouline from "@/components/degoulinerouge";
const API_URL = "http://dev-tgt.local:3001/api";
export default {
  name: "App",
  created: function() {
    this.changeavatar();
  },
  data: function() {
    return {
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
        profilePhoto: []
      },
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
      imageProfilRenvoyee: ""
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
    },
    gotologin() {
      this.$router.push("/login");
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
    async submit() {
      this.chooseAvatarOrProfile != "avatar"
        ? (this.form.avatar = null)
        : (this.imageProfilRenvoyee = null);
      await this.$axios
        .post(`${process.env.URL}/auth/register`, {
          surname: this.form.surname,
          email: this.form.email,
          password: this.form.password,
          avatar: this.form.avatar,
          profileImage: this.imageProfilRenvoyee
        })
        .then(response => {
          if (response.status === 201) {
            this.login();
          }
        });
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
