<template>
  <div class="splitter">
    <div class="header splitter-row">
      <span class="name">Split</span>
      <span class="current">Now</span>
      <span class="diff">Diff</span>
      <span class="pb">PB</span>
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
        <span class="diff">{{split.currentComplete | plusSign}}</span>
        <span class="pb">{{split.pbComplete}}</span>
      </div>
    </div>
    <div class="totals splitter-row">
      <span class="name">TOTAL</span>
      <span class="current">{{currentTotal}}</span>
      <span class="diff">{{diffTotal | plusSign}}</span>
      <span class="pb">{{pbTotal}}</span>
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
  width: 300px;
  text-align: left;
}
.splitter .splitter-row > span.current,
.splitter .splitter-row > span.diff,
.splitter .splitter-row > span.pb {
  width: 50px;
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
    };
  },
  props:{
    currentSplit: {
      type: Number,
      default: 0
    },
    splits:{
      type: Object,
      default() {
        return []
      }
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
    // setTimeout(()=>{
    //   let audio = new Audio(require('@/assets/'+self.audio));
    //   audio.play();
    // },1000);
  },
};
</script>
