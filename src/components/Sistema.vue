<template>
  <div class="contenedor-general" @click="clicked">
    <div class="contenedor-centrado" :style="style" @mouseover="showNames" @mouseout="showNames(false)">
      <Sol :size="starSize"/>
      <Planeta v-for="(planeta, i) in planetas" :key="'p'+i"
        ref="planetas"
        :size="(8-i)*10" :orbit="planeta.orbit" :parentMass="starSize" :hasMoon="i!=1" :hasRing="i==1"
        :name="planeta.name" :showName="shownNames" :nameZoom="nameZoom"
        />
      <!-- <div class="marca"></div> -->
    </div>
  </div>
</template>

<script>
import Sol from "./Sol.vue"
import Planeta from "./Planeta.vue"

import Utils from "@/services/Utils"

export default {
  name: 'Sistema',
  components: { Sol, Planeta },
  data(){
    return {
      zoom: 0.4,
      shownNames: false,
      starSize: 300
    }
  },
  props: {
    planetas: {
      type: Array,
      default: () => [{orbit: 1500, name:'mNako'},
        {orbit: 1200, name:'Yunarea'},
        {orbit: 400, name:'dizlein'}]
    }
  },
  computed: {
    style(){
      const self = this;
      return `transform: scale(${self.zoom});`;
    },
    nameZoom(){
      const self = this;
      return 1/self.zoom;
    }
  },
  methods: {
    zoomChange(event){
      const self = this;
      self.zoom = Math.max(self.zoom - event.deltaY/1000, 0.01);
      self.zoom = Math.min(self.zoom, 1);
    },
    clicked(){
      const self = this;
      self.blinkPlanetas();
    },
    addPlaneta(){
      const self = this;
      self.planetas.push({
        orbit: Utils.randomInt(500,2000)
      })
    },
    blinkPlanetas(){
      const self = this;
      self.$refs.planetas.forEach(planeta => {
        planeta.blink();
      });
    },
    showNames(show){
      const self = this;
      self.shownNames = !!show;
    }
  },
  created () {
    const self = this;
    window.addEventListener('wheel', self.zoomChange);
  },
  destroyed () {
    const self = this;
    window.removeEventListener('wheel', self.zoomChange);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contenedor-general {
  width: 100%;
  height: 100%;
  background: black;
  position: relative;
}
.contenedor-centrado {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;	
}
.marca {
  z-index: 1000;
  width: 1px;
  height: 1px;
  background: red;
  position: absolute;
}
</style>
