import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router/index.js";
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import App from './App.vue'

import Prism from "prismjs";

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

import "normalize.css"; //reset.css

createApp(App).use(VueMarkdownEditor).use(router).use(createPinia()).mount("#app");
