<template>
  <v-main class="main">
    <div class="container" :class="classes">
      <img class="player-logo" :src="currentPlayer.logo" />
      <h2 class="title">En honor a</h2>
      <h1 class="player-name">{{currentPlayer.name}}</h1>
    </div>
  </v-main>
</template>
<style scoped>
@font-face {
  font-family: trajan-pro;
  src: url('http://localhost:8080/#/fonts/trajan-pro/TrajanPro-Regular.ttf');
}
.main {
  background: #aaaaff;
}
.container {
  position: fixed;
  bottom: -100%;
  transition: bottom 0.5s ease-in-out;
  text-align: left;
  padding: 30px 100px;
}
.container.visible {
  bottom: 0%;
}
.player-logo{
  display: inline-block;
  position: absolute;
  left: 40px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  line-height: 200px;
  border: 5px solid purple;
  /* zP3P3  ---- 49:34 - 49:55 - 50:16 - (50:34 - 51:00) - 51:08 - 51:13 */
  /* Alebrant -- 50:44 - 51:14 - 51:52 - 52:13 - 52:50 - (53:20 - 54:15) - 55:07 */
  background: white;
}
.title{
  position:relative;
  font-family: trajan-pro !important;
  left: 200px;
  top: 40px;
  font-size: 39px !important;
  text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000,
             1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
}
.player-name{
  font-family: trajan-pro;
  display: inline-block;
  width: calc(100% - 204px);
  color: #fff;
  font-size: 60px;
  line-height: 200px;
  padding-left: 200px;
  text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000,
             1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
}
</style>
<script>

export default {
  name: "Honorifica",
  props: {
    player: {
      type: String
    },
    time: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      visible: false,
      players: {
        jackels: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/899eb768-f6ff-4b0c-aa6a-27ec5be58f80-profile_image-70x70.png',
          name: 'Jackels13',
          time: 50
        },
        feref: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/efcdb391-ae9d-457c-8594-8f9b39cb017a-profile_image-70x70.png',
          name: 'Feref93',
          time: 25
        },
        nero: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/e843e4b6-6dbe-4a32-a2fc-d08304c3fec1-profile_image-70x70.png',
          name: 'Neromance',
          time: 15
        },
        alekhine: {
          logo: 'https://yt3.googleusercontent.com/qkgkMh812c-LD3tgHgSJ5fxZOLHwdhDLbs2MVTVRclHvW-x2CSuNa_VOFy9vIgpzyccZUvam=s176-c-k-c0x00ffffff-no-rj',
          name: 'AlekhineAG',
          time: 15
        },
        zp3p3: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/75975b1f-d1c7-48dc-a959-1bdc6dd8acbe-profile_image-70x70.png',
          name: 'zP3P3',
          time: 15
        },
        f8: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/8a771ca0-47f2-4742-92cd-013c1afaef52-profile_image-70x70.png',
          name: 'Francisco8',
          time: 15
        },
        zuha: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/6c633067-600b-46d0-92da-ebda1b5d279b-profile_image-70x70.png',
          name: 'zuhaLoAm',
          time: 15
        },
      },
    };
  },
  computed: {
    currentPlayer: function(){
      const self = this;
      return self.players[self.player];
    },
    classes: function(){
      const self = this;
      return self.visible ? "visible" : "";
    }
  },
  mounted() {
    const self = this;
    setTimeout(function(){self.visible = true}, 100);
    setTimeout(function(){self.visible = false}, self.currentPlayer.time*1000 + 100);
  },
};
</script>
