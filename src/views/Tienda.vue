<template>
  <v-main>
    <v-container>
      <v-card>
        <h1>Tienda</h1>
        <v-toolbar>
          <v-tabs v-model="tab">
            <v-tab v-for="sistema in usuario.sistemas" :key="sistema.canal">{{sistema.canal}}</v-tab>
          </v-tabs>
        </v-toolbar>
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="sistema in usuario.sistemas"
            :key="sistema.canal"
          >
            <v-card-text>
              <v-row>
                <v-col cols="8">
                  <v-slider
                    v-model="sistema.orbita"
                    label="Órbita"
                    :min="400"
                    :max="1200"
                    :height="60"
                  ></v-slider>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="sistema.orbita"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8">
                  <v-slider
                    v-model="sistema.size"
                    label="Tamaño"
                    :min="10"
                    :max="100"
                    :height="60"
                  ></v-slider>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="sistema.size"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-main>
</template>
<script>

export default {
  name: 'Tienda',
  components: {
  },
  data() {
    return {
      tab: null,
      alto:30,
      usuario: {
        sistemas: [
          {
            canal: 'Alebrant',
            config: {}
          }
        ]
      }
    }
  },
  created(){
  }
}
</script>
