<template>
  <div class="contenedor planeta">
    <div class="orbita" :style="orbitStyle"></div>
    <div class="planeta tipo1" :class="{highligthed: highligthed}" :style="planetStyle">
      <div v-if="hasRing" class="ring" :style="ringStyle"></div>
      <div v-if="hasMoon" class="center" :style="planetCenterPositionStyle">
        <Planeta :size="10" :orbit="80" :parentMass="size"/>
      </div>
      <span class="name" :class="{visible: shownName}" :style="nameStyle">{{name}}</span>
    </div>
  </div>
</template>

<script>

import Utils from "@/services/Utils"

export default {
  name: 'Planeta',
  props: {
    size: {
      type: Number,
      default: 10
    },
    orbit: {
      type: Number,
      default: 600
    },
    name: {
      type: String
    },
    nameZoom: {
      type: Number,
      default: 1
    },
    showName: {
      type: Boolean,
      default: Boolean.FALSE
    },
    hasMoon: {
      type: Boolean,
      default: false
    },
    hasRing: {
      type: Boolean,
      default: false
    },
    parentMass: {
      type: Number,
      default: 300
    }
  },
  data(){
    return {
      time: null,
      highligthed: false,
      innerRing: 10,
      outerRing: 30
    }
  },
  computed:{
    rotation(){
      const self = this,
        completion = (self.time % self.t) / self.t;
      // return 180;
      return completion * 360;
    },
    t(){
      const self = this,
        k = 63165,
        t = 2*Math.PI*Math.sqrt(Math.pow(self.orbit, 3)/(k*self.parentMass));
      return t;
    },
    orbitStyle(){
      const self = this;
      return `width: ${self.orbit * 2}px; height: ${self.orbit * 2}px; margin: -${self.orbit}px 0 0 -${self.orbit}px;`;
    },
    planetStyle(){
      const self = this;
      return self.sizeStyle + self.planetPositionStyle;
    },
    sizeStyle() {
      const self = this;
      return `width: ${self.size}px; height: ${self.size}px;`;
    },
    planetPositionStyle() {
      const self = this;
      return `transform: rotateZ(${self.rotation}deg) translateX(${self.orbit}px) rotateZ(${-self.rotation}deg) translate(-${self.size/2}px, -${self.size/2}px);`;
    },
    planetCenterPositionStyle() {
      const self = this;
      return `transform: translate(${self.size/2}px, ${self.size/2}px);`;
    },
    nameStyle(){
      const self = this;
      return `left: ${self.size + 10}px; line-height: ${self.size}px; font-size: ${15 * self.nameZoom}px;`;
    },
    ringStyle(){
      const self = this;
      return `box-shadow: 0 0 ${(self.outerRing - self.innerRing) / 2}px ${(self.outerRing - self.innerRing) / 2}px rgba(255,255,255,0.4);` +
        `width: ${self.size + self.innerRing}px; height: ${self.size + self.innerRing}px;` +
        `transform: translate(${-self.innerRing / 2}px, ${-self.innerRing / 2}px);`;
    },
    shownName(){
      const self = this;
      return self.showName && self.nameZoom < 15;
    }
  },
  methods:{
    updateTime(){
      const self = this,
        now = new Date();
      self.time = (now.getTime() - self.startTime)/1000;
    },
    blink(){
      const self = this;
      self.highligthed = true;
      setTimeout(()=>{self.highligthed = false},300);
    }
  },
  created(){
    const self = this;
    self.startTime = new Date() - Utils.randomInt(0,9000000);
    self.updateTime();
    self.rotationInterval = setInterval(self.updateTime,30);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contenedor {
  position: absolute;
  margin-top: -50%;
  margin-left: -50%;
}
.planeta {
  position: absolute;
  border-radius: 50%;
  background-position: center;
  background-image: url(data:image/png;base64,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);
  transform-origin: 0 0;
  transition: 0.5s linear box-shadow, 0.5s linear background-color;
}
.planeta.highligthed {
  box-shadow: 0 0 5px white;
}
.planeta.tipo1{
  background-color: rgb(67, 40, 0);
}
.planeta.tipo1.highligthed {
  background-color: rgb(255, 255, 255);
}

.planeta .center{
  position: absolute;
}

.orbita, .ring {
  position: absolute;
  border-radius: 50%;
}
.orbita {
  box-shadow: 0 0 0 1px rgba(254, 178, 178, 0.2);
}
.name {
  color: white;
  position: relative;
  font-size: 30px;
  opacity: 1;
  transition: 0.25s linear opacity;
}
.name:not(.visible){
  opacity: 0;
}
</style>
