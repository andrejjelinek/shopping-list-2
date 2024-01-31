import { createApp } from "vue"
import "../_themes/style.css"
import App from "./App.vue"
import router from "./router.js"

import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: "#41b883",
    secondary: "#48A9A6",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
  components,
  directives,
})

createApp(App).use(vuetify).use(router).mount("#app")
