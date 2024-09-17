import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

createApp(App).use(router).mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
// console.log('MODE:', import.meta.env.MODE);
// console.log('BASE_URL:', import.meta.env.BASE_URL);
// console.log('PROD:', import.meta.env.PROD);
// console.log('DEV:', import.meta.env.DEV);
// console.log('domain:', import.meta.env.VITE_APP_API_URL);
