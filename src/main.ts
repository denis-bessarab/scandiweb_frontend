import './style/style.scss'

import { createApp } from 'vue'
import {router} from "./plugins/router/router.ts";
import {vuetify} from "./plugins/vuetify/vuetify.ts";

import App from './App.vue'


createApp(App).use(router).use(vuetify).mount('#app')
