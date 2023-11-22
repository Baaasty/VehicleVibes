import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

library.add(faBars);

const app = createApp(App);

app.use(router);
app.use(store);

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
