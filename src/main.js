/* Do not change this file. */

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App);

// Use VueRouter
app.use(router);

// Mount the app
app.mount("#app");
