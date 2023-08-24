import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        'custom-background': '#f5f7f9',
        'custom-green': '#1e9067',
      },
    },
    options: { customProperties: true },
  },
});
