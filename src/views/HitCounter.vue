<template>
  <v-main class="main">
    <splitter :splits="splits"/>
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
</style>
<script>
import Splitter from "../components/Splitter.vue";

export default {
  name: "Intro",
  components: {Splitter},
  data() {
    return {
      splits: [
        { name: "Vengeful Spirit",                  current:null, pb: 0   },
        { name: "Moth Cloak",                       current:null, pb: 2   },
        { name: "Shaman Stone",                     current:null, pb: 0   },
        { name: "Knotch + Fragile Strength",        current:null, pb: 0   },
        { name: "Mark of Pride",                    current:null, pb: 3   },
        { name: "Tram Pass",                        current:null, pb: 1   },
        { name: "Pale Ore",                         current:null, pb: 0   },
        { name: "Nail++",                           current:null, pb: 2   },
        { name: "Crystal Heart",                    current:null, pb: 4   },
        { name: "Cyclone Slash",                    current:null, pb: 0   },
        { name: "Soul Shade",                       current:null, pb: 0   },
        { name: "Desolate Dive",                    current:null, pb: 0   },
        { name: "Dark Descent",                     current:null, pb: 2   },
        { name: "Dream Nail",                       current:null, pb: 0   },
        { name: "Knotches++",                       current:null, pb: 4   },
        { name: "Monarch Wings",                    current:null, pb: 1   },
        { name: "Isma's Tear",                      current:null, pb: 1   },
        { name: "Monomon",                          current:null, pb: 5   },
        { name: "Howling Wraiths",                  current:null, pb: 1   },
        { name: "Great Slash",                      current:null, pb: 1   },
        { name: "King's Brand",                     current:null, pb: 3   },
        { name: "Dash Slash",                       current:null, pb: 7   },
        { name: "Abyss Shriek + Shade Cloak",       current:null, pb: 0   },
        { name: "Lurien",                           current:null, pb: 0   },
        { name: "Herra",                            current:null, pb: 0   },
        { name: "Hollow Knight",                    current:null, pb: 11  }
      ],
    };
  },
  props:{
    id:{
      type: String
    }
  },
  computed: {
    splitsProcessed: function () {
      const self = this;
      return self.splits.map((split, i) => {
        let processedSplit = Object.assign({}, split);
        processedSplit.currentComplete = i>self.currentSplit ? "-" : processedSplit.current != undefined ? processedSplit.current : "0";
        processedSplit.pbComplete = processedSplit.pb;
        return processedSplit;
      });
    },
    splitClasses: function () {
      const self = this;
      return self.splits.map((split, i) => {
        let classes = [];
        if (i==self.currentSplit) {   classes.push("current");}
        if (i<=self.currentSplit) {
          if(split.current > 0) {     classes.push("hit");}
          else {                      classes.push("clean");}
        }
        return classes.join(" ");
      });
    },
    splitsActivos: function () {
      const self = this;
      return self.splits.filter((split, i) => {
        return i <= self.currentSplit;
      });
    },
    currentTotal: function() {
      const self = this;
      return self.splitsActivos.reduce((i, split) => i + split.current, 0);
    },
    diffTotal: function() {
      const self = this;
      return self.currentTotal - self.pbTotal;
    },
    pbTotal: function() {
      const self = this;
      return self.splitsActivos.reduce((i, split) => i + split.pb, 0);
    },
  },
  methods: {
    newSplit(name) {
      return {
        name: name
      };
    },
    selectSplit(i){
      const self = this;
      self.currentSplit = i;
    },
    _changeSplit(movement) {
      const self = this;
      self.currentSplit = Math.max(Math.min(self.currentSplit + movement, self.splits.length - 1), 0);
    },
    _changeHits(hits) {
      const self = this;
      if(!self.splits[self.currentSplit].current) {
        self.splits[self.currentSplit].current = 0;
      }
      self.splits[self.currentSplit].current = Math.max(self.splits[self.currentSplit].current + hits, 0);
    },
    _changeHitsPB(hits) {
      const self = this;
      if(!self.splits[self.currentSplit].pb) {
        self.splits[self.currentSplit].pb = 0;
      }
      self.splits[self.currentSplit].pb = Math.max(self.splits[self.currentSplit].pb + hits, 0);
    },
    randomDot(maxX, maxY, minZ, maxZ) {
      const self = this,
        x = self._randomInt(-maxX, maxX),
        y = self._randomInt(-maxY, maxY),
        z = self._randomInt(minZ, maxZ),
        size = self._randomInt(0, 1),
        color = Math.floor(self._randomInt(7, 7));
      return self.newDot(x, y, z, size, color);
    },
    _randomInt(min, max) {
      return Math.random() * (max - min) + min;
    },
    _visible(dot) {
      const self = this;
      return dot.z > self.position && dot.povDeg <= self.pov;
    },
    _newTick(backwards) {
      const self = this;
      backwards = !!backwards;
      const directionMultiplier = backwards ? -1 : 1;
      self.move(self.speed * directionMultiplier);
      self._clearNotVisible();
      self.dots.forEach(dot => {dot.age++});
      setTimeout(function(){self._newTick()}, 30);
    },
    _startTicks() {
      const self = this;
      self._newTick();
    },
    _clearNotVisible() {
      const self = this,
        backgroundPosition = self.position + self.size,
        dotsToRemove = [];
      self.dotPerspectiva.forEach((dot, i) => {
        if (!self._visible(dot)){
          dotsToRemove.unshift(i);
        }
      });
      dotsToRemove.forEach((i) => {
        self.dots.splice(i, 1);
        self.dots.push(self.randomDot(self.size/2, self.size/2, backgroundPosition, backgroundPosition));
      });
    }
  },
  created() {
    // const self = this;
    // for (let i = 0; i < self.amount; i++) {
    //   self.dots.push(self.randomDot(self.size, self.size, 0, self.size));
    // }
  },
  filters:{
    plusSign: function (value) {
      return (value > 0) ? `+${value}` : value;
    }
  },
  mounted() {
    const self = this;
    window.addEventListener('keydown', function(e) {
      switch(e.key){
        case "ArrowUp":
          self._changeSplit(-1);
          break;
        case "ArrowDown":
          self._changeSplit(1);
          break;
        case "ArrowLeft":
          (!e.shiftKey) ? self._changeHits(-1) : self._changeHitsPB(-1);
          break;
        case "ArrowRight":
          (!e.shiftKey) ? self._changeHits(1) : self._changeHitsPB(1);
          break;
      }
    });
    document.title="HitCounter";
    // setTimeout(()=>{
    //   let audio = new Audio(require('@/assets/'+self.audio));
    //   audio.play();
    // },1000);
  },
};
</script>
