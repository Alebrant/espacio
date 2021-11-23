<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<style>
html, body, #app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0 !important;
    top: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.v-main{
  background: rgb(98, 136, 218);
  color: white;
}
</style>
