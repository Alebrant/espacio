<template>
  <v-main class="main">
    <div v-for="(confeti, i) in confetis" :key="'confeti' + i"
      class="confeti" :style="styleConfeti[i]"></div>
    <div class="controles">
      <input v-model="t" type="number" /><br />
    </div>
    <div v-if="message" :style="messageStyle"
      class="message">{{message}}</div>
  </v-main>
</template>
<style scoped>
@font-face {
  font-family: "Atiba";
  src: url("https://espacio-alebrant.vercel.app/fonts/atiba/Atiba.ttf");
}
@font-face {
  font-family: "Control Freak";
  src: url("https://espacio-alebrant.vercel.app/fonts/control-freak/CONTF___.ttf");
}
@font-face {
  font-family: "Mysteron";
  src: url("https://espacio-alebrant.vercel.app/fonts/mysterons/mysteron.ttf");
}
@font-face {
  font-family: "Vanadine Regular";
  src: url("https://espacio-alebrant.vercel.app/fonts/vanadine/Vanadine Regular.ttf");
}
@-webkit-keyframes roller {
    from {left: 100%;}
    to {left: -100%;}
}

html {
  overflow-y: hidden !important;
}
.main {
  width: 100%;
  height: 100%;
  background: green;
  overflow: hidden;
}
.controles {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 200px;
  border: 1px solid white;
}
.controles input {
  color: white;
}
.message {
  position: fixed;
  bottom: 0;
  font-family: "Control Freak";
  font-size: 30px;
  animation: 30s roller linear infinite;
  width: 2000px;
}
</style>
<script>
export default {
  name: "Confeti",
  components: {},
  data() {
    return {
      fontfamily: 1,
      t: 0,
      angTest: 0,
      speedModifier: 0.05,
      maxAge: 10,
      width: window.innerWidth,
      height: window.innerHeight,
      amount: window.innerWidth * window.innerHeight / 30000,
      confetis: [],
    };
  },
  props:{
    message:{
      type: String
    }
  },
  computed: {
    styleConfeti: function() {
      const self = this;
      return self.confetis.map((confeti, i) => {
        return `width: ${confeti.size}px; height: ${confeti.size}px;` +
          self.confetiPosition[i] + self.confetiColor[i];
      });
    },
    confetiColor: function() {
      const self = this;
      return self.confetis.map(confeti => {
        let color = "white";
        switch(confeti.color){
          case 1: color = "red"; break;
          case 2: color = "green"; break;
          case 3: color = "blue"; break;
          case 4: color = "orange"; break;
          case 5: color = "pink"; break;
          case 6: color = "teal"; break;
          case 7: color = "aquamarine"; break;
        }
        return `background-color: ${color};`;
      });
    },
    confetiPosition: function() {
      const self = this;
      return self.confetis.map((confeti) => {
        let t = self.t + confeti.t0,
          xAbs = (t * Math.abs(confeti.a) + self.width/2) % (self.width),
          x = (confeti.a > 0) ? xAbs : self.width - xAbs;
        return `transform:`+
          ` translate(${x}px, ${(t * confeti.b) % (self.height)}px)` +
          ` rotateX(${(confeti.rotX * t) % 360}deg) rotateY(${(confeti.rotY * t) % 360}deg) rotateZ(${(confeti.rotZ * t) /360}deg);`;
      });
    },
    messageStyle: function() {
      const self = this;
      let family,
        style = `font-size: ${self.fontsize}px; margin-top: ${-self.fontsize/2}px;`;
      switch(self.fontfamily){
        case "1":
          family = "Atiba";
          break;
        case "2":
          family = "Control Freak";
          break;
        case "3":
          family = "Mysteron";
          break;
        case "4":
          family = "Vanadine Regular";
          break;
      }
      console.log(family);
      if (family){
        style += `font-family: "${family}";`;
      }
      return style;
    }
  },
  methods: {
    newConfeti(a, b, t0, speed, size, rotX, rotY, rotZ, color) {
      return {
        a: a,
        b: b,
        t0: t0,
        speed: speed,
        size: size,
        rotX: rotX,
        rotY: rotY,
        rotZ: rotZ,
        color: color
      };
    },
    randomConfeti() {
      const self = this,
        a = self._random(-1, 1),
        b = self._random(1, 5), 
        t0 = self._random(0, 10000000),
        speed = self._randomInt(10, 20),
        size = self._random(3, 10),
        rotX = self._random(100, 200),
        rotY = self._random(100, 200),
        rotZ = self._random(100, 200),
        color = self._randomInt(1, 7);
      return self.newConfeti(a, b, t0, speed, size, rotX, rotY, rotZ, color);
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
      setTimeout(function(){self._newTick()}, 40);
    },
    _startTicks() {
      const self = this;
      self._newTick();
    },
  },
  created() {
    const self = this;
    for (let i = 0; i < self.amount; i++) {
      self.confetis.push(self.randomConfeti());
    }
  },
  mounted() {
    const self = this;
    self._startTicks();
  },
};
</script>
