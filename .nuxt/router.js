import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _58b04a58 = () => interopDefault(import('..\\pages\\arrendamiento.vue' /* webpackChunkName: "pages/arrendamiento" */))
const _66256161 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _30146647 = () => interopDefault(import('..\\pages\\departamento.vue' /* webpackChunkName: "pages/departamento" */))
const _3888eeee = () => interopDefault(import('..\\pages\\lock.vue' /* webpackChunkName: "pages/lock" */))
const _a7ad5394 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _255e7ea8 = () => interopDefault(import('..\\pages\\pago_admin.vue' /* webpackChunkName: "pages/pago_admin" */))
const _692d2bcb = () => interopDefault(import('..\\pages\\pago_usuario.vue' /* webpackChunkName: "pages/pago_usuario" */))
const _5664a476 = () => interopDefault(import('..\\pages\\soporte_admin.vue' /* webpackChunkName: "pages/soporte_admin" */))
const _652336a4 = () => interopDefault(import('..\\pages\\soporte_usuario.vue' /* webpackChunkName: "pages/soporte_usuario" */))
const _68d5963b = () => interopDefault(import('..\\pages\\usuario.vue' /* webpackChunkName: "pages/usuario" */))
const _3afc99c2 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/arrendamiento",
    component: _58b04a58,
    name: "arrendamiento"
  }, {
    path: "/dashboard",
    component: _66256161,
    name: "dashboard"
  }, {
    path: "/departamento",
    component: _30146647,
    name: "departamento"
  }, {
    path: "/lock",
    component: _3888eeee,
    name: "lock"
  }, {
    path: "/login",
    component: _a7ad5394,
    name: "login"
  }, {
    path: "/pago_admin",
    component: _255e7ea8,
    name: "pago_admin"
  }, {
    path: "/pago_usuario",
    component: _692d2bcb,
    name: "pago_usuario"
  }, {
    path: "/soporte_admin",
    component: _5664a476,
    name: "soporte_admin"
  }, {
    path: "/soporte_usuario",
    component: _652336a4,
    name: "soporte_usuario"
  }, {
    path: "/usuario",
    component: _68d5963b,
    name: "usuario"
  }, {
    path: "/",
    component: _3afc99c2,
    name: "index"
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
