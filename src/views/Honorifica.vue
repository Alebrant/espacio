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
        vlados: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/d25f39b9-b8c2-4d61-ba61-9b6281a4c4c2-profile_image-150x150.png',
          name: 'VlaDOS_095',
          time: 180
        },
        papajoshhh: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/77610237-2669-4f6f-921a-069bfe5eece5-profile_image-150x150.png',
          name: 'Papajoshhh',
          time: 30
        },
        erlopeh: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/a326d760-df88-425c-a057-c9789b206752-profile_image-150x150.png',
          name: 'Erlopeh',
          time: 30
        },
        zirob: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/1e0b39d0-9fbf-4911-8daf-b9700154dd7c-profile_image-150x150.png',
          name: 'Zirob21',
          time: 30
        },
        renzo: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b612aa8a-451f-49e9-9e8b-e307f1fcd723-profile_image-150x150.png',
          name: 'RenzoXRock',
          time: 30
        },
        gintsoka: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/df29cf4e-c207-40d3-a1b7-bedeafa1e75f-profile_image-70x70.png',
          name: 'gintsoka',
          time: 30
        },
        sebax: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/c7f7087d-ae9b-4995-92be-5c107f23dff2-profile_image-70x70.png',
          name: 'SebaxReloaded',
          time: 120
        },
        guillem: {
          logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3bf77974-f927-46cf-9c4d-3d5c24427ed4-profile_image-70x70.png',
          name: 'Guillem98',
          time: 120
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
