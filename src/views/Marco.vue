<template>
  <v-main class="main">
    <div class="canvas">
      <div
        v-for="(dot, i) in dots"
        :key="'dot-' + i"
      >
        <div
          v-for="(agedDot, j) in dotStyleAged[i]"
          :key="'agedDot-' + i + j"
          :style="agedDot"
          class="dot"
        >
        </div>
      </div>
    </div>
    <div class="controles">
      <input v-model="t" type="number" /><br />
      <input v-model="speedModifier" type="number" /><br />
      <input v-model="angTest" type="number" /><br />
    </div>
  </v-main>
</template>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  background: black;
  overflow: hidden;
}
.canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
}
.dot {
  width: 1px;
  height: 1px;
  border-radius: 50%;
  box-shadow: 0 0 1px 1px white;
  background: white;
  position: absolute;
  margin: -5px -5px;
  white-space: nowrap;
}
.controles {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 200px;
  border: 1px solid white;
}
.controles input {
  color: white;
}
.path {
  border: 1px solid white;
  display: block;
  position: absolute;
}
.vector {
  position: absolute;
  height: 1px;
  background: white;
  margin-top: -0.5px;
  transform-origin: 0 0;
}
</style>
<script>
export default {
  name: "Intro",
  components: {},
  data() {
    return {
      t: 0,
      angTest: 0,
      speedModifier: 0.05,
      amount: 20,
      maxAge: 10,
      width: 600,
      height: 300,
      dots: [],
    };
  },
  computed: {
    dotStyle: function() {
      const self = this;
      return self.dots.map(dot => {
        return `transform: ${self._vibTranslation(dot.angVib, dot.ampVib, self.t*self.speedModifier)} rotate(${self.t}deg) translateX(100px);`;
      });
    },
    dotStyleAged: function() {
      const self = this;
      return self.dots.map(dot => {
        return Array.from(Array(dot.maxAge).keys()).map(i => {
          const newT = (self.t - i/2),
            opac = 1-i/dot.maxAge,
            angPosition = newT*dot.rotationSpeed + dot.angPos,
            r = Math.min(self.width/2/Math.abs(Math.cos(angPosition*Math.PI/180)),
            self.height/2/Math.abs(Math.sin(angPosition*Math.PI/180)));

          return `transform: rotate(${angPosition}deg) ${self._vibTranslation(dot.angVib, dot.ampVib, newT*self.speedModifier)} translateX(${r}px); opacity:${opac};`;
        })
      });
    },
    pathStyle: function() {
      const self = this;
      return `width: ${self.width}px; height: ${self.height}px;
        margin-top: ${-self.height/2}px; margin-left: ${-self.width/2}px;`;
    },
    vectorStyle: function() {
      const self = this,
        r = Math.min(self.width/2/Math.abs(Math.cos(self.angTest*Math.PI/180)),
          self.height/2/Math.abs(Math.sin(self.angTest*Math.PI/180)));
      return `width: ${r}px; transform: rotate(${self.angTest}deg);`;
    }
  },
  methods: {
    newDot(angPos, rotationSpeed, angVib, ampVib, maxAge, size, color) {
      return {
        angPos: angPos,
        rotationSpeed: rotationSpeed,
        angVib: angVib,
        ampVib: ampVib,
        maxAge: maxAge,
        size: size,
        color: color
      };
    },
    randomDot() {
      const self = this,
        angPos = self._random(0, 360),
        rotationSpeed = self._random(0.9, 1.5) * (Math.random() < 0.5) ? 1 : -1, 
        angVib = self._random(0, 360),
        ampVib = self._random(10, 20),
        maxAge = self._randomInt(10, 20),
        size = self._random(0, 1),
        color = Math.floor(self._random(7, 7));
      return self.newDot(angPos, rotationSpeed, angVib, ampVib, maxAge, size, color);
    },
    _vibTranslation(angVib, ampVib, t){
      return `translateX(${Math.sin(t+angVib) * ampVib}px)`;
    },
    _random(min, max) {
      return Math.random() * (max - min) + min;
    },
    _randomInt(min, max) {
      const self = this;
      return Math.floor(self._random(min, max));
    },
    _newTick() {
      const self = this;
      self.t++;
      setTimeout(function(){self._newTick()}, 30);
    },
    _startTicks() {
      const self = this;
      self._newTick();
    },
  },
  created() {
    const self = this;
    for (let i = 0; i < self.amount; i++) {
      self.dots.push(self.randomDot());
    }
  },
  mounted() {
    const self = this;
    self._startTicks();
  },
};
</script>
