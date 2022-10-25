<template>
  <v-main class="main">
    <div class="counter"><span>{{logros}}</span></div>
  </v-main>
</template>
<style scoped>
.counter span {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  font-size: 16px;
  position: absolute;
  right: 45px;
  top: 26px;
  color: white;
}
.counter {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 6px;
  background-repeat: no-repeat !important;
  background-size: contain !important;
  background: url('https://assets.dryicons.com/uploads/icon/svg/6351/ab4b1d1a-fc05-48ea-8799-3158a4e86959.svg');
}
</style>
<script>

export default {
  name: "Intro",
  data() {
    return {
      logros: 0,
      audio: "audio/korok-fanfare.mp3"
    };
  },
  computed: {
  },
  methods: {
    _syncStorage: function() {
      const self = this;
      localStorage.setItem("logrosOni", JSON.stringify(self.logros));
    },
    _loadStorage: function() {
      const self = this;
      self.logros = JSON.parse(localStorage.getItem("logrosOni")) || 0;
    },
    _bindControls(e) {
      const self = this;
      switch(e.keyCode){
        case 40:  // abajo
          self.logros--;
          break;
        case 38:  // arriba
          self.logros++;
          self._playFanfare();
          break;
        default:
          console.log(e);
      }
      self._syncStorage();
    },
    _playFanfare() {
      const self = this;
      setTimeout(()=>{
        let audio = new Audio(require('@/assets/'+self.audio));
        audio.play();
      },10);
    }
  },
  created() {
    const self = this;
    self._loadStorage();
  },
  filters:{
  },
  mounted() {
    const self = this;
    document.title="ONICounter";
    window.removeEventListener('keydown', self._bindControls);
    window.addEventListener('keydown', self._bindControls);
  },
};
</script>
