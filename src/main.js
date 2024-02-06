import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import './assets/style.css';
import App from './App.vue';
import store from './store';
//import router from './router/index';

const app = createApp(App);
app.use(Toast);
app.use(store);
//app.use(router);
app.mount('#app');
