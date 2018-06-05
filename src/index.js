import Vue from 'vue';
import App from './App.vue';

import './assets/styles/test.css';
import './assets/styles/test.styl';
import './assets/images/bg.jpeg';

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  render: (h) => (App),
}).$mount(root);