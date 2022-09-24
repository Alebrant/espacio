<template>
  <div class="splitter">
    <div class="header splitter-row">
      <span class="name">Split <span v-if="splitCountVisible">({{currentSplit + 1}}/{{splits.length}})</span></span>
      <span class="current">Now</span>
      <span v-if="diffVisible" class="diff">Diff</span>
      <span v-if="pbVisible" class="pb">PB</span>
    </div>
    <div class="splits">
      <div
        v-for="(split, i) in splitsProcessed"
        :key="'split-' + i"
        class="split splitter-row"
        :class="splitClasses[i]"
        @click="selectSplit(i)"
      >
        <span class="name">{{split.name}}</span>
        <span class="current">{{split.currentComplete}}</span>
        <span v-if="diffVisible" class="diff">{{split.diff | plusSign}}</span>
        <span v-if="pbVisible" class="pb">{{split.pbComplete}}</span>
      </div>
    </div>
    <div class="totals splitter-row">
      <span class="name">TOTAL</span>
      <span class="current">{{currentTotal}}</span>
      <span v-if="diffVisible" class="diff">{{diffTotal | plusSign}}</span>
      <span v-if="pbVisible" class="pb">{{pbTotal}}</span>
    </div>
  </div>
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
.splitter {
  padding-top: 50px;
  display: inline-block;
}
.splitter .splitter-row {
  padding: 0 1em;
  transition: linear 0.1s height;
  height: 24px;
}
.splitter .splitter-row.current { font-weight: bold; background: #8885; font-size: 20px; height: 30px;}
.splitter .splitter-row.clean { color: green;}
.splitter .splitter-row.hit { color: red;}
.splitter .splitter-row > span {
  display: inline-block;
}
.splitter .splitter-row > span.name {
  width: 200px;
  text-align: left;
}
.splitter .splitter-row > span.current,
.splitter .splitter-row > span.diff,
.splitter .splitter-row > span.pb {
  width: 80px;
  text-align: center;
}
.header, .totals {
  border: double rgb(141, 0, 162);
}
.header { border-width: 0 0 3px; }
.totals { border-width: 3px 0 0; }
.split:not(:last-child) { border-bottom: 1px dashed rgb(141, 0, 162); }
</style>
<script>
export default {
  name: "Intro",
  components: {},
  data() {
    return {
      splitCountVisible: true,
      hitSumVisible: true,
      currentModeIndex: 0,
      currentSplit: 0,
      modes: ["Complete", "NoDiff", "NoPB"]
    };
  },
  props:{
    splits:{
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    splitsProcessed: function () {
      const self = this;
      if(!self.splits) return [];
      return self.splits.map((split, i) => {
        let processedSplit = Object.assign({}, split),
          previousSplits = self.splits.filter((split, j) => j < i),
          previousSum = previousSplits.reduce((i, split) => i + split.current, 0),
          previousPBSum = previousSplits.reduce((i, split) => i + split.pb, 0);
        previousSplits.currentSum = previousSum + split.current;
        previousSplits.PBSum = previousPBSum + split.pb;
        processedSplit.currentComplete = i>self.currentSplit 
          ? "-" 
          : (processedSplit.current != undefined 
            ? processedSplit.current 
            : "0") + (self.sumVisible 
              ? ` (${previousSplits.currentSum})` 
              : '');
        processedSplit.diff = i>self.currentSplit ? "-" : processedSplit.current - processedSplit.pb;
        processedSplit.pbComplete = processedSplit.pb  + (self.sumVisible 
              ? ` (${previousSplits.PBSum})` 
              : '');
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
      return self.splitsProcessed.reduce((i, split) => i + split.pb, 0);
    },
    diffVisible: function() {
      const self = this;
      return self.currentModeIndex < 1;
    },
    sumVisible: function() {
      const self = this;
      return self.hitSumVisible;
    },
    pbVisible: function() {
      const self = this;
      return self.currentModeIndex < 2;
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
    _swapMode(direction) {
      const self = this;
      let possibleModes = self.modes.length,
        newModeIndex = self.currentModeIndex + direction;
      while(newModeIndex < 0){
        newModeIndex += possibleModes;
      }
      self.currentModeIndex = (newModeIndex) % possibleModes;
    },
    _randomInt(min, max) {
      return Math.random() * (max - min) + min;
    },
    _updatedRun(){
      const self = this;
      self.$emit("update", self.splits);
    },
    _bindControls(e) {
      const self = this;
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
        case "n":
        case "N":
          self.hitSumVisible = !self.hitSumVisible;
          break;
        case "m":
          self._swapMode(1);
          break;
        case "M":
          self._swapMode(-1);
          break;
        default:
          console.log(e.key, e.keyCode);
      }
    },
  },
  created() {
  },
  filters:{
    plusSign: function (value) {
      return (value > 0) ? `+${value}` : value; 
    }
  },
  mounted() {
    const self = this;
    window.removeEventListener('keydown', self._bindControls);
    window.addEventListener('keydown', self._bindControls);
  },
};
</script>
