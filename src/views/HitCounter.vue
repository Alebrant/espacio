<template>
  <v-main class="main">
    <splitter :splits.sync="currentRun" @update="updateRun($event)"/>
    <div v-if="controls" class="controls">
      <input type="number" v-model="selectedRun" :min="0" :max="runs.length - 1" @keydown="$event.stopPropagation()"/>
    </div>
  </v-main>
</template>
<style scoped>
@-webkit-keyframes glow {
    from {opacity: 1;}
    50% {opacity: 0.4;}
    to {opacity: 1;}
}
.main {
  background: #aaaaff;
  color: rgb(141, 0, 162);
}
.controls {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
<script>
import Splitter from "../components/Splitter.vue";

export default {
  name: "Intro",
  components: {Splitter},
  data() {
    return {
      selectedRun: 0,
      runs: [],
      controls: false
    };
  },
  computed: {
    currentRun: function() {
      const self = this;
      return (self.runs.length > self.selectedRun) ? self.runs[self.selectedRun] : [];
    }
  },
  methods: {
    updateRun: function(run) {
      const self = this;
      self.runs[self.selectedRun] = run;
    },
    _savePB: function() {
      const self = this;
      let nuevaRun = self.currentRun.map(split => {
          let nuevoSplit = Object.assign({}, split);
          nuevoSplit.pb = nuevoSplit.current ? nuevoSplit.current : 0;
          nuevoSplit.current = 0;
          return nuevoSplit;
        });
      self.runs.splice(self.selectedRun, 0, nuevaRun);
    },
    _syncStorage: function() {
      const self = this;
      localStorage.setItem("runs", JSON.stringify(self.runs));
    },
    _loadStorage: function() {
      const self = this;
      self.runs = JSON.parse(localStorage.getItem("runs"));
    },
    _bindControls(e) {
      const self = this;
      switch(e.keyCode){
        case 72:  // H
          self.controls = !self.controls;
          break;
        case 83:  // S
          if(e.shiftKey && e.altKey) {self._syncStorage();}
          break;
        case 80:  // P
          if(e.shiftKey && e.altKey) {self._savePB();}
          break;
        default:
          console.log(e);
      }
    },
  },
  created() {
    const self = this;
    self._loadStorage();
  },
  filters:{
  },
  mounted() {
    const self = this;
    document.title="HitCounter";
    window.removeEventListener('keydown', self._bindControls);
    window.addEventListener('keydown', self._bindControls);
  },
};
</script>
