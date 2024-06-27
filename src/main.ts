import { registerPlugins } from '@/plugins';
import App from './App.vue';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { i18n } from './i18n';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

registerPlugins(app);

app.use(pinia)
    .use(i18n)
    .mount('#app');
