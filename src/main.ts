// https://unocss.dev/ 原子 css 库
import '@unocss/reset/tailwind-compat.css' // unocss reset
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import './styles/main.css';
import App from './app.vue';

const app =  createApp(App);
app.mount('#app');
