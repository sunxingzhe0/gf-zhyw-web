import Vue from "vue";
import Element from "element-ui";

import "./filters";
import "./directives";
import "./utils/dayjs";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/app.scss";
import { FlexInput } from "./components/Base";
//引echarts
var echarts = require("echarts");
Vue.prototype.$echarts = echarts;

Vue.use(Element);
Vue.config.productionTip = false;
Vue.component("FlexInput", FlexInput);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
