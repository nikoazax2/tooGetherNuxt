import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Degoulinerouge: () => import('../..\\components\\degoulinerouge.vue' /* webpackChunkName: "components/degoulinerouge" */).then(c => wrapFunctional(c.default || c)),
  Footer: () => import('../..\\components\\footer.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c)),
  Header: () => import('../..\\components\\header.vue' /* webpackChunkName: "components/header" */).then(c => wrapFunctional(c.default || c)),
  Headerlogin: () => import('../..\\components\\headerlogin.vue' /* webpackChunkName: "components/headerlogin" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  Planet: () => import('../..\\components\\planet.vue' /* webpackChunkName: "components/planet" */).then(c => wrapFunctional(c.default || c)),
  Planetpersonacceuil: () => import('../..\\components\\planetpersonacceuil.vue' /* webpackChunkName: "components/planetpersonacceuil" */).then(c => wrapFunctional(c.default || c)),
  VuetifyLogo: () => import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
