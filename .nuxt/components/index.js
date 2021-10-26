import { wrapFunctional } from './utils'

export { default as Degoulinerouge } from '../..\\components\\degoulinerouge.vue'
export { default as Footer } from '../..\\components\\footer.vue'
export { default as Header } from '../..\\components\\header.vue'
export { default as Headerlogin } from '../..\\components\\headerlogin.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Planet } from '../..\\components\\planet.vue'
export { default as Planetpersonacceuil } from '../..\\components\\planetpersonacceuil.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'

export const LazyDegoulinerouge = import('../..\\components\\degoulinerouge.vue' /* webpackChunkName: "components/degoulinerouge" */).then(c => wrapFunctional(c.default || c))
export const LazyFooter = import('../..\\components\\footer.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c))
export const LazyHeader = import('../..\\components\\header.vue' /* webpackChunkName: "components/header" */).then(c => wrapFunctional(c.default || c))
export const LazyHeaderlogin = import('../..\\components\\headerlogin.vue' /* webpackChunkName: "components/headerlogin" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyPlanet = import('../..\\components\\planet.vue' /* webpackChunkName: "components/planet" */).then(c => wrapFunctional(c.default || c))
export const LazyPlanetpersonacceuil = import('../..\\components\\planetpersonacceuil.vue' /* webpackChunkName: "components/planetpersonacceuil" */).then(c => wrapFunctional(c.default || c))
export const LazyVuetifyLogo = import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
