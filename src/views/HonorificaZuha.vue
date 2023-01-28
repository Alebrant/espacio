<template>
  <v-main class="main">
    <div class="container" :class="classes">
      <img v-for="(prayge, i) in prayges" :key="'p'+i"
          class="prayge" :class="classes[i]" :style="style[i]" :src="'prayges/'+prayge.src" />
      <img class="prayge prayge-zuha" :class="classZuha" :src="'prayges/'+praygeZuha" />
    </div>
    <div class="container2">
      <Honorifica v-if="rotuloVisible" player="zuha" :time="10"/>
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
  transform: scale(1.4);
}
.container {
  text-align: left;
  padding: 30px 100px;
}
.container2 {
  margin-top: 700px;
  margin-left: -150px;
  transform: scale(0.4);
}
.prayge.visible{
  bottom: 14%;
}
.prayge{
  transition: bottom 0.5s ease-in-out;
  position:fixed;
  bottom: -100%;
  display: inline-block;
  height: 100px;
  line-height: 100px;
}
.prayge-3{
  margin-left: -30px;
}
.prayge-4{
  height: 120px;
  margin-left: 10px;
}
.prayge-5{
  margin-left: 10px;
}
.prayge-6{
  margin-left: 5px;
  height: 125px;
}
.prayge-zuha{
  left: 800px;
  height: 540px;
  transition: bottom 2s ease-in-out;
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
import Honorifica from '@/views/Honorifica.vue'

export default {
  name: "HonorificaZuha",
  components: {Honorifica},
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
      prayges: [
        {visible: false, src:'EmpaPrayge.png'},
        {visible: false, src:'SebaxPrayge.png'},
        {visible: false, src:'jackprayge.png'},
        {visible: false, src:'JoshhPrayge.png'},
        {visible: false, src:'JPrayge.png'},
        {visible: false, src:'HolyPrayge.png'},
        {visible: false, src:'slash_dorime1.png'},
        {visible: false, src:'VlaDOSprayge.png'},
        {visible: false, src:'Zirob_Dorime.png'}
      ],
      praygeZuha: 'zuhaPrayge.png',
      zuhaVisible: false,
      rotuloVisible: false
    };
  },
  computed: {
    currentPlayer: function(){
      const self = this;
      return self.players[self.player];
    },
    classes: function(){
      const self = this;
      return self.prayges.map((prayge,i) => `prayge-${i} ${prayge.visible ? 'visible' : ''}`);
    },
    classZuha: function(){
      const self = this;
      return self.zuhaVisible ? "visible" : "";
    },
    style: function(){
      const self = this;
      return self.prayges.map((prayge,i) => i<5 ? `left: ${i*100+300}px;` : `left: ${i*100 + 675}px;`);
    }
  },
  methods: {
    showPrayges: function(){
      const self = this;
      self.prayges.forEach((prayge,i) => {
        setTimeout(function(){
          prayge.visible = true;
        }, i*1000);
      });
      setTimeout(function(){
        self.zuhaVisible = true;
      },self.prayges.length*1000);
      setTimeout(function(){
        self.rotuloVisible = true;
      },(self.prayges.length + 6)*1000);
      setTimeout(function(){
        self.rotuloVisible = false;
        self.zuhaVisible = false;
        self.prayges.forEach((prayge) => {
          prayge.visible = false;
        });
      },(self.prayges.length + 6 + 10)*1000);
    }
  },
  mounted() {
    const self = this;
    self.showPrayges();
  },
};
</script>
