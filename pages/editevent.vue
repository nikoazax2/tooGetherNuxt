<template>
  <div id="app" class="vueeditevent" data-app>
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

    <v-card class="titrecard">
      <v-card-title>T o o G e t h e r</v-card-title>
      <v-card-text
        >Faites des rencontres en faisant ce que vous aimez</v-card-text
      >
    </v-card>
    <div class="containerdivtitrecreationevent">
      <v-btn
        to="/myevents"
        id="btncreereventredinterieur"
        color="accent"
        elevation="2"
        rounded
        small
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="37.69"
          height="38.729"
          viewBox="0 0 37.69 38.729"
        >
          <g
            id="Groupe_53"
            data-name="Groupe 53"
            transform="translate(-342.164 -323.941)"
          >
            <rect
              id="Rectangle_2"
              data-name="Rectangle 2"
              width="37.03"
              height="38.088"
              rx="18.515"
              transform="matrix(-1, -0.017, 0.017, -1, 379.189, 362.67)"
              fill="#e92626"
            />
            <path
              id="Tracé_11"
              data-name="Tracé 11"
              d="M8.464,7.4v0A1.054,1.054,0,0,0,8.14,6.64h0L1.793.292l0,0A1.058,1.058,0,1,0,.369,1.86L5.912,7.4.3,13.02h0a1.058,1.058,0,0,0,1.5,1.5h0L8.141,8.168h0a1.054,1.054,0,0,0,.324-.761Z"
              transform="matrix(-1, -0.017, 0.017, -1, 365.37, 350.789)"
              fill="#fff"
              stroke="#fff"
              stroke-width="1"
            />
          </g>
        </svg>
      </v-btn>
      <p class="titleinsription">MODIFIER L'ACTIVITÉ</p>
      <div class="expaceur"></div>
    </div>

    <form class="formcreereventedit" action="#" @submit.prevent="submit">
      <div class="premiereligne">
        <v-menu offset-y class="menuGetEmoji" content-class="menuEmoji">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
              <code v-html="'<p>&\#x1F' + emojiSelected + ';</p>'"> </code>
            </v-btn>
          </template>
          <div @click.stop>
            <v-tabs centered icons-and-text>
              <v-tabs-slider></v-tabs-slider>
              <v-tab class="activity">
                <p>&#x1F3C0;</p>
              </v-tab>
              <v-tab class="travelPlaces">
                <p>&#x1F6EB;</p>
              </v-tab>
              <v-tab class="fooddrink">
                <p>&#x1F349;</p>
              </v-tab>
              <v-tab class="animalsnature">
                <p>&#x1F420;</p>
              </v-tab>
              <v-tab-item class="activity">
                <div class="listEmojis">
                  <div
                    class="emoji"
                    v-for="emoji in listeEmojis.activity"
                    :key="emoji.code"
                    @click="selectEmoji(emoji)"
                  >
                    <code v-html="'<p>&\#x1F' + emoji.code + ';</p>'"> </code>
                  </div>
                </div>
              </v-tab-item>
              <v-tab-item class="travelPlaces">
                <div class="listEmojis">
                  <div
                    class="emoji"
                    v-for="emoji in listeEmojis.travelPlaces"
                    :key="emoji.code"
                    @click="selectEmoji(emoji)"
                  >
                    <code v-html="'<p>&\#x1F' + emoji.code + ';</p>'"> </code>
                  </div>
                </div>
              </v-tab-item>
              <v-tab-item class="fooddrink">
                <div class="listEmojis">
                  <div
                    class="emoji"
                    v-for="emoji in listeEmojis.fooddrink"
                    :key="emoji.code"
                    @click="selectEmoji(emoji)"
                  >
                    <code v-html="'<p>&\#x1F' + emoji.code + ';</p>'"> </code>
                  </div>
                </div>
              </v-tab-item>
              <v-tab-item class="animalsnature">
                <div class="listEmojis">
                  <div
                    class="emoji"
                    v-for="emoji in listeEmojis.animalsnature"
                    :key="emoji.code"
                    @click="selectEmoji(emoji)"
                  >
                    <code v-html="'<p>&\#x1F' + emoji.code + ';</p>'"> </code>
                  </div>
                </div>
              </v-tab-item>
            </v-tabs>
            <div class="listEmojis">
              <!--  <div class="emoji" v-for="emoji in listeEmojis" :key="emoji.code"><code v-html="'<p>&#x1F'+emoji.code+';</p>'"> </code></div> -->
            </div>
          </div>
        </v-menu>
        <div class="form-group rowcreerevenet">
          <div class="col-md-6">
            <input
              placeholder="Nom de l'activité"
              id="name inputcreerevent"
              type="name"
              class="form-control"
              name="name"
              value
              required
              autofocus
              v-model="form.name"
            />
          </div>
        </div>
      </div>
      <div class="form-group rowcreerevenet rowcreerevenetlieux">
        <places
          class="inputlieux"
          :value="form.lieux"
          placeholder="Lieux"
          @change="
            val => {
              chargeMap(val);
            }
          "
          :options="{ countries: ['FR'] }"
        >
        </places>
      </div>

      <div class="form-group rowcreerevenet">
        <div class="col-md-6">
          <input
            placeholder="Date"
            id="date"
            type="date"
            class="form-control"
            name="date"
            required
            v-model="form.date"
          />
        </div>
      </div>

      <div class="form-group rowcreerevenet">
        <v-row>
          <v-col cols="11" sm="5">
            <v-dialog
              ref="dialog"
              v-model="modal2"
              :return-value.sync="form.hour"
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="champchoixheure"
                  v-model="form.hour"
                  label="Heure"
                  @click="form.hour = ''"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  required
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="modal2"
                required
                format="24hr"
                v-model="form.hour"
                full-width
                @click:minute="test"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal2 = false">
                  Annuler
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  v-if="clickMinute"
                  @click="(clickMinute = false), $refs.dialog.save(form.hour)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>
      </div>

      <div class="form-group rowcreerevenet">
        <div class="col-md-6">
          <input
            placeholder="Description"
            id="tags"
            type="tags"
            class="form-control"
            name="tags"
            required
            v-model="form.description"
          />
        </div>
      </div>
      <p class="pastoutremplis" v-if="pasToutRemplis">
        Renseigne toutes les infos !
      </p>
      <div @click="editEvent()" class="form-group row mb-0 btnajoutenevent">
        <div class="col-md-8 offset-md-4">
          <v-btn id="btnvalidercreationevent">
            MODIFIER
          </v-btn>
        </div>
      </div>
      <div @click="dialogSupp = true" class="form-group row mb-0">
        <div class="col-md-8 offset-md-4 btnsuppevent">
          Supprimer l'évènement
        </div>
      </div>
    </form>

    <v-dialog v-model="dialogSupp" max-width="290">
      <v-card>
        <v-card-title class="text-h5 titre-supp">
          Supprimer l'évènement ?
        </v-card-title>

        <v-card-text class="text-supp">
          L'évènement ne sera plus jamais accessible pour vous et les
          participants. Vous pourrez tout de même le recréer.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialogSupp = false">
            Annuler
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="(dialogSupp = false), deleteEvent()"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import degouline from "@/components/degoulinerouge";
import Places from "vue-places";
import fileEmoji from "../assets/emoji.json";
// import firebase from "firebase";
// const db = firebase.firestore();
const API_URL = "http://api.toogther.com/api";
export default {
  name: "App",
  async created() {
    this.Read();
    this.listeEmojis.fooddrink = fileEmoji.fooddrink.filter(
      emoji => !emoji.code.includes("U+")
    );
    this.listeEmojis.activity = fileEmoji.activity.filter(
      emoji => !emoji.code.includes("U+")
    );
    this.listeEmojis.travelPlaces = fileEmoji.travelPlaces.filter(
      emoji => !emoji.code.includes("U+")
    );
    this.listeEmojis.animalsnature = fileEmoji.animalsnature.filter(
      emoji => !emoji.code.includes("U+")
    );
    var code = fileEmoji.activity[0].code;
    this.emojiSelected = code;
  },
  data: function() {
    return {
      pasToutRemplis: false,
      time: null,
      menu2: false,
      modal2: false,
      timeStep: "10:10",
      drawer: false,
      group: null,
      act: ["slt", "lol"],
      dialogSupp: false,
      form: {
        name: "",
        lieux: "",
        description: "",
        date: "",
        hour: ""
      },
      errors: [],
      idact: null,
      listeEmojis: [],
      emojiSelected: ""
    };
  },
  components: {
    degouline: degouline,
    places: Places
  },

  methods: {
    selectEmoji(item) {
      console.log(item.code);
      this.emojiSelected = item.code;
    },
    chargeMap(val) {
      this.form.lieux = val.name + ", " + val.city;
      this.form.coord = val.latlng;
    },
    async editEvent() {
      console.log(this.form);
      if (
        this.form.name != "" &&
        this.form.description != "" &&
        this.form.lieux != "" &&
        this.form.coord &&
        this.form.date != "" &&
        this.form.hour != ""
      ) {
        try {
          await this.$axios
            .patch(`${process.env.URL}/activities/${this.$route.params.id}`, {
              creatorId: this.$auth.user.id,
              name: this.form.name,
              description: this.form.tags,
              lieux: this.form.lieux,
              date: this.form.date + "," + this.form.hour,
              coordlieux: JSON.stringify(this.form.coord),
              emoji: this.emojiSelected
            })
            .then(response => {
              this.idact = response.data.id;
              this.$router.push("/myevents");
            });
        } catch (e) {
          this.errors.push(e);
        } finally {
        }
      } else {
        this.pasToutRemplis = true;
      }
    },

    async deleteEvent() {
      try {
        await this.$axios
          .delete(`${process.env.URL}/activities/${this.$route.params.id}`)
          .then(response => {
            this.$router.push("/myevents");
          });
      } catch (e) {
        this.errors.push(e);
      }
    },
    async Read() {
      let res = await this.$axios.get(
        "/activities/" + this.$route.params.id + "/detail"
      );

      this.activity = res.data;
      this.form.name = this.activity.name;
      this.form.lieux = this.activity.lieux;
      this.form.date = this.activity.date.split(",")[0];
      this.form.hour = this.activity.date.split(",")[1];
      this.form.description = this.activity.description;
      this.emojiSelected = this.activity.emoji;

      var coord = JSON.parse(this.activity.coordlieux);
      this.form.coord = { lat: coord.lat, lng: coord.lng };
      this.chargement = false;
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
.vueeditevent {
  .titre-supp {
    font-size: 18px !important;
    white-space: nowrap;
  }
  .text-supp {
    text-align: justify;
  }
  body {
    overflow: hidden;
  }
  #degoulineInscription > svg {
    margin-top: -25vw;
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
  .containerdiv {
    margin: auto;
    width: 100%;
    margin-top: 20%;
  }
  .titleinsription {
    margin-top: 5px;
    font-size: 17px;
    //font-weight: 700;
    text-align: center;
    font-size: 18px;
    font-weight: 600 !important;
    color: #e92626;
  }
  .rowcreerevenetlieux {
    padding-top: 0 !important;
  }
  .rowcreerevenet {
    padding-left: 15px;
    padding-top: 9px;
    border-radius: 20px;
    margin: 20px;
    height: 40px;
    box-shadow: 0px 0px 16px -3px rgba(0, 0, 0, 0.25);
    div > input {
      width: 95%;
    }
    .col-md-6 {
      padding-top: 0;
    }
  }
  .btnajoutenevent {
    text-align: center;
    border-radius: 20px;
    margin: 20px;
    height: 40px;
    background-color: #e92626;
    color: white;
    box-shadow: 0px 0px 16px -3px rgba(233, 38, 38, 0.75);
    div {
      padding: 0 !important;
    }
  }
  .btnsuppevent {
    color: grey;
    width: 100%;
    height: 5%;
    position: absolute;
    bottom: 0 !important;
    text-align: center;
    padding: 0;
    margin: 0;
  }
  .btnajouteneventsupp {
    background-color: white;
    #btnvalidercreationevent {
      span {
        color: rgb(61, 61, 61);
      }
    }
  }
  .containerdivtitrecreationevent {
    justify-content: space-around;
    width: 100%;
    margin-top: 20%;
    display: inline-flex;
  }
  .v-picker__title,
  .v-time-picker-clock__hand {
    background-color: #e92626;
    border-color: #e92626;
  }
  .v-time-picker-clock__item--active {
    background-color: #e92626;
  }
  .champchoixheure {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
  .theme--light.v-btn.v-btn--has-bg {
    background-color: rgba(0, 0, 0, 0);
  }
  .v-btn--is-elevated {
    box-shadow: unset;
  }
  .btnajoutenevent {
    div > a > .v-btn__content {
      color: white;
    }
  }
  .expaceur {
    width: 20px;
  }
  #btnvalidercreationevent {
    margin-left: -20px !important;
    span {
      color: white;
    }
  }
  .formcreereventedit {
    margin-top: 0% !important;
    .premiereligne {
      width: 100%;
      display: inline-flex;
      align-items: center;
      button {
        margin-left: 20px;
        height: 100%;
        padding-right: 0;
        p {
          font-size: 40px;
        }
      }
      .rowcreerevenet {
        width: 100%;
        margin-right: 20px;
      }
    }
  }
  .pastoutremplis {
    text-align: center;
    font-size: 12px;
    color: #e92626;
  }
  .menuEmoji {
    border-radius: 15px;
    height: 40%;
    background-color: white;
    max-width: 90% !important;
    .listEmojis {
      display: flex;
      flex-flow: wrap;
      text-align: center;
      justify-content: center;
      .emoji {
        padding: 10px;
        text-align: center;
        font-size: 30px;
        width: 50px;
      }
    }
    .theme--dark.v-tabs > .v-tabs-bar,
    .theme--dark.v-tabs-items {
      background-color: white;
    }
    .v-tab {
      font-size: 20px;
      color: black !important;
      padding: 0 !important;
      width: 25% !important;
      max-width: 25% !important;
      min-width: 25% !important;
    }
  }
}
</style>
