import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import oftens from '@/components/_export'

const app = createApp(App);

oftens.forEach(item => app.component(item.name, item));

app.directive('clickOut', {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function(event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
})

app.use(store).use(router).mount('#templatebot');