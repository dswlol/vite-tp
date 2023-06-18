import { createApp } from 'vue';
import router from './router';
import './styles/main.css';
import App from './app.vue';



const app = createApp(App);

app.use(router);

app.mount('#app');
