<template>
  <v-main class="main">
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
@-webkit-keyframes glow {
    from {opacity: 1;}
    50% {opacity: 0.4;}
    to {opacity: 1;}
}
@-webkit-keyframes roll {
    from {left: 2000px;}
    to {left: -2000px;}
}
.main {
  width: 100%;
  height: 100%;
  background: #0F0;
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
  background: white;
  position: absolute;
  margin: -5px -5px;
  transform: rotate(30deg);
  white-space: nowrap;
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
  left: 100%;
  top: 50%;
  width: 100%;
  text-align: center;
  color: white;
  /* animation: 5s glow ease-in-out infinite; */
  animation: 5s roll linear;
  animation-iteration-count: 1;
  font-size: 80px;
}
</style>
<script>
export default {
  name: "Intro",
  components: {},
  data() {
    return {
      id: null,
      audio: "audio/200-maneras.mp3",
      possibilities: [["Z","P"],["o","u",""],["t","t"],["e","o"],[" ","", " "]]
    };
  },
  props:{
    messageId:{
      type: String,
      default: null
    },
    amount:{
      type: Number,
      default: 10
    }
  },
  computed: {
    message: function(){
      const self = this,
        possibilities = Object.assign(self.possibilities, []);
      let zoteputo = "",
        id = self.id;
      for(let i=0; i<9; i++){
        let possibilitiesI = i % possibilities.length,
          possibleLetters = possibilities[possibilitiesI],
          possLength = possibleLetters.length,
          letter = (possLength) ? possibleLetters.splice(id%possibleLetters.length,1)[0] : "";
        console.log(i, possibilitiesI, possibleLetters, letter, zoteputo, possibilities);
        zoteputo = zoteputo.concat(letter);
      }
      return zoteputo;
    },
    dotStyle: function () {
      const self = this;
      return self.dotPerspectiva.map((dot) => {
        if (!self._visible(dot)) {
          return "display: none";
        }
        const relativeAge = Math.min(1, dot.age / 30);
        let color = "white";
        // switch (dot.color){ 
        //   case 1:
        //     color = "#b33c01";
        //     break;
        //   case 2:
        //     color = "#a17904";
        //     break;
        //   case 3:
        //     color = "#9595ff";
        //     break;
        // }

        const translation = (dot.povDeg / self.pov) * self.size;
        return `transform: rotate(${dot.titaDeg}deg) translateX(${translation}px);
            box-shadow: 0 0 0 ${dot.size}px ${color}; background: ${color};
            opacity: ${relativeAge};`;
      });
    },
    dotPerspectiva: function () {
      const self = this;
      return self.dotPolares.map((dot) => {
        const pov = Math.abs(Math.atan2(dot.r, dot.z - self.position)),
          povDeg = (pov / Math.PI) * 180,
          distance = Math.sqrt(Math.pow(dot.r,2) + Math.pow(dot.z - self.position, 2));
        return Object.assign({ pov: pov, povDeg: povDeg, distance: distance}, dot);
      });
    },
    dotPolares: function () {
      const self = this;
      return self.dots.map((dot) => {
        const r = Math.sqrt(dot.x * dot.x + dot.y * dot.y),
          tita = Math.atan2(dot.y, dot.x),
          dotPolares = Object.assign(
            {
              r: r,
              tita: tita,
              titaDeg: (tita / Math.PI) * 180,
            },
            dot
          );
        return dotPolares;
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
    newDot(x, y, z, size, color) {
      return {
        x: x,
        y: y,
        z: z,
        size: size,
        color: color,
        age: 0
      };
    },
    move(movement) {
      const self = this;
      self.position += movement;
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
    const self = this,
      rand = Math.floor(Math.random() * (60 + 1));
    console.log(self.messageId, rand);
    self.id = self.messageId != "" && self.messageId ? self.messageId : rand;
    // for (let i = 0; i < self.amount; i++) {
    //   self.dots.push(self.randomDot(self.size, self.size, 0, self.size));
    // }
  },
  mounted() {
    const self = this;
    console.log(self.id, self.message);
  }
}
</script>
