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

    <v-card class="titrecard" to="/">
      <v-card-title>T o o G e t h e r</v-card-title>
      <v-card-text
        >Faites des rencontres en faisant ce que vous aimez</v-card-text
      >
    </v-card>
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
            @input="testexistmail"
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
    <div v-if="!chargeimg" class="avatarreate">
      <v-img class="elevation-6 imgavatar" alt="" :src="srcavatar"></v-img>
    </div>
    <div class="btnreg avatar">
      <button @click="changeavatar" class="btn btn-primary ">
        Changer l'avatar
      </button>
    </div>
    <div class="btnreg">
      <button @click="submit" class="btn btn-primary">S'inscrire</button>
    </div>
    <div class="btnreg creercompte">
      <button @click="gotologin" class="btn btn-primary ">
        J'ai déjà un compte
      </button>
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
      drawer: false,
      group: null,
      act: ["slt", "lol"],
      form: {
        surname: "",
        email: "",
        password: "",
        avatar: ""
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
      chargeimg: false
    };
  },
  components: {
    degouline: degouline
  },
  methods: {
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
    async submit() {
      await this.$axios
        .post(`${API_URL}/auth/register`, {
          surname: this.form.surname,
          email: this.form.email,
          password: this.form.password,
          avatar: this.form.avatar
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
.vueregister {
  body {
    overflow: hidden;
  }
  #degoulineInscription > svg {
    margin-top: -10vh;
    width: 100%;
    height: auto;
  }
  #degoulineInscription {
    width: 101%;
    position: absolute;
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
  .btnreg {
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
  .btnreg.avatar {
    background-color: #65c9ff;
    box-shadow: 0px 0px 10px -3px rgb(101 201 255 / 50%);
  }
  .btnreg.creercompte {
    background-color: white;
    color: #e92626;
  }
  .formulairereg {
    margin-bottom: 50px;
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
  .imgavatar {
    width: 100%;
  }
  .titleinsription {
    color: #e92626;
    font-weight: 700;
    font-family: "Noto Sans", sans-serif;
  }
}
</style>
