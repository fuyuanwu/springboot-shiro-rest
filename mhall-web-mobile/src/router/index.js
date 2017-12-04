import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login.vue'
import ChannelPanel from '../views/channelPanel.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ChannelPanel
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/channelPanel',
      name: 'channelPanel',
      component: ChannelPanel
    }
  ]
})
