import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5a04c194 = () => interopDefault(import('..\\pages\\chatActivity.vue' /* webpackChunkName: "pages/chatActivity" */))
const _2ed48ade = () => interopDefault(import('..\\pages\\creationevent.vue' /* webpackChunkName: "pages/creationevent" */))
const _60710cda = () => interopDefault(import('..\\pages\\editevent.vue' /* webpackChunkName: "pages/editevent" */))
const _10cbf11e = () => interopDefault(import('..\\pages\\event-detail.vue' /* webpackChunkName: "pages/event-detail" */))
const _6f3d5a34 = () => interopDefault(import('..\\pages\\events.vue' /* webpackChunkName: "pages/events" */))
const _2a62072c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _69e5fa5f = () => interopDefault(import('..\\pages\\map.vue' /* webpackChunkName: "pages/map" */))
const _54388de1 = () => interopDefault(import('..\\pages\\mapbackup.vue' /* webpackChunkName: "pages/mapbackup" */))
const _2c2f2052 = () => interopDefault(import('..\\pages\\myevents.vue' /* webpackChunkName: "pages/myevents" */))
const _f64b431a = () => interopDefault(import('..\\pages\\recherchevent.vue' /* webpackChunkName: "pages/recherchevent" */))
const _381c9ba0 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _69957fb0 = () => interopDefault(import('..\\pages\\settings.vue' /* webpackChunkName: "pages/settings" */))
const _60ba6415 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/chatActivity",
    component: _5a04c194,
    name: "chatActivity"
  }, {
    path: "/creationevent",
    component: _2ed48ade,
    name: "creationevent"
  }, {
    path: "/editevent",
    component: _60710cda,
    name: "editevent"
  }, {
    path: "/event-detail",
    component: _10cbf11e,
    name: "event-detail"
  }, {
    path: "/events",
    component: _6f3d5a34,
    name: "events"
  }, {
    path: "/login",
    component: _2a62072c,
    name: "login"
  }, {
    path: "/map",
    component: _69e5fa5f,
    name: "map"
  }, {
    path: "/mapbackup",
    component: _54388de1,
    name: "mapbackup"
  }, {
    path: "/myevents",
    component: _2c2f2052,
    name: "myevents"
  }, {
    path: "/recherchevent",
    component: _f64b431a,
    name: "recherchevent"
  }, {
    path: "/register",
    component: _381c9ba0,
    name: "register"
  }, {
    path: "/settings",
    component: _69957fb0,
    name: "settings"
  }, {
    path: "/",
    component: _60ba6415,
    name: "index"
  }, {
    path: "/recherchevent/:nomevent/:lieuevent/:dateevent",
    component: _f64b431a,
    name: "recherchevent"
  }, {
    path: "/editevent/:id",
    component: _60710cda,
    name: "editevent"
  }, {
    path: "/chatActivity/:id",
    component: _5a04c194,
    name: "chatActivity"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
