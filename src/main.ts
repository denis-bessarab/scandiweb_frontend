import { createApp } from 'vue'
import './style/style.scss'
import App from './App.vue'
import {router} from "./plugins/router/router.ts";
import {vuetify} from "./plugins/vuetify/vuetify.ts";

createApp(App).use(router).use(vuetify).mount('#app')
