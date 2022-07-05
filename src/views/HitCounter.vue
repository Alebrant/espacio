<template>
  <v-main class="main">
    <splitter :splits.sync="currentRun" @update="updateRun($event)"/>
    <div v-if="controls" class="controls">
      <select v-model="selectedCategory">
        <option v-for="(cat, i) in categories" :key="'cat-'+i" :value="i">{{cat.name}}</option>
      </select>
      <input type="number" v-model="selectedRun" :min="0" :max="Math.max(runs.length - 1,0)" @keydown="$event.stopPropagation()"/>
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
      data: {},
      selectedCategory: 0,
      selectedRun: 0,
      controls: false
    };
  },
  computed: {
    currentRun: function() {
      const self = this;
      return (self.runs.length > self.selectedRun) ? self.runs[self.selectedRun] : [];
    },
    categories: function() {
      const self = this;
      return (self.data.categories) ? self.data.categories : [];
    },
    currentCategory: function() {
      const self = this;
      let firstCategory = self.categories.length ? self.categories[0] : {};
      return (self.categories.length && self.categories.length > self.selectedCategory)? self.categories[self.selectedCategory] : firstCategory;
    },
    runs: function() {
      const self = this;
      return self.currentCategory.runs ? self.currentCategory.runs : [];
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
      localStorage.setItem("HitCounterData", JSON.stringify(self.data));
    },
    _loadStorage: function() {
      const self = this;
      self.data = JSON.parse(localStorage.getItem("HitCounterData"));
      console.log(self.data);
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
        case 84:  // T
          debugger;
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
