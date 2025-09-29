import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import RelayXClient  from 'relayx-api'
const app = createApp(App)
const messageHandler = new RelayXClient();
window.messageHandler = messageHandler
if (import.meta.env.DEV || true) {
  (async () => {
    const VConsole = await import('vconsole');
   new VConsole.default()
  })();
}
app.use(router) 
app.mount('#app')
