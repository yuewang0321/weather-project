import Vue from "vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import VueCompositionAPI, { createApp } from "@vue/composition-api";
import "./assets/css/tailwind.css";
import "./assets/tailwind.css";
import Chartkick from "vue-chartkick";
import "chart.js";

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);
Vue.use(Chartkick);

const loadPlugins = (app) => {
  app.use(Antd);
};

const app = createApp({
  // router: VueRouter,
  render: (h) => h(App),
});

loadPlugins(app);
app.mount("#app");
