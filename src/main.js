import { createApp } from "vue";
import {store} from './store/store';
import App from "./App.vue";
import "animate.css";
import "./main.scss";

createApp(App).use(store).mount("#app");
