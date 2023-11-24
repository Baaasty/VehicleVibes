import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faXTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

library.add(faBars, faInstagram, faXTwitter, faFacebook);

const app = createApp(App);

app.use(router);
app.use(store);

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
