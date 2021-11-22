<template>
  <Sistema :planetas="planetas"/>
</template>

<script>
import Sistema from "@/components/Sistema"
import axios from "axios"

export default {
  name: 'Home',
  components: {
    Sistema
  },
  data() {
    return {
      planetas: []
    }
  },
  created(){
    const self = this;
    axios.get("/sistema/Alebrant/")
    .then(res => { return res.data || []})
    .then(res => { return res.map(planeta => {
      planeta.name = planeta._id;
      return planeta;
    })})
    .then(res => {return self.planetas = res})
  }
}
</script>
