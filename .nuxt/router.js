import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _66256161 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _30146647 = () => interopDefault(import('..\\pages\\departamento.vue' /* webpackChunkName: "pages/departamento" */))
const _3888eeee = () => interopDefault(import('..\\pages\\lock.vue' /* webpackChunkName: "pages/lock" */))
const _a7ad5394 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _255e7ea8 = () => interopDefault(import('..\\pages\\pago_admin.vue' /* webpackChunkName: "pages/pago_admin" */))
const _5664a476 = () => interopDefault(import('..\\pages\\soporte_admin.vue' /* webpackChunkName: "pages/soporte_admin" */))
const _68d5963b = () => interopDefault(import('..\\pages\\usuario.vue' /* webpackChunkName: "pages/usuario" */))
const _cde82290 = () => interopDefault(import('..\\pages\\components\\buttons.vue' /* webpackChunkName: "pages/components/buttons" */))
const _0904115a = () => interopDefault(import('..\\pages\\components\\cards.vue' /* webpackChunkName: "pages/components/cards" */))
const _10a7a866 = () => interopDefault(import('..\\pages\\components\\grid-system.vue' /* webpackChunkName: "pages/components/grid-system" */))
const _76826cde = () => interopDefault(import('..\\pages\\components\\icons.vue' /* webpackChunkName: "pages/components/icons" */))
const _42abb542 = () => interopDefault(import('..\\pages\\components\\notifications.vue' /* webpackChunkName: "pages/components/notifications" */))
const _96ee6a70 = () => interopDefault(import('..\\pages\\components\\typography.vue' /* webpackChunkName: "pages/components/typography" */))
const _bd51c4dc = () => interopDefault(import('..\\pages\\forms\\components.vue' /* webpackChunkName: "pages/forms/components" */))
const _6f02ebf3 = () => interopDefault(import('..\\pages\\forms\\elements.vue' /* webpackChunkName: "pages/forms/elements" */))
const _3df27975 = () => interopDefault(import('..\\pages\\forms\\validation.vue' /* webpackChunkName: "pages/forms/validation" */))
const _4dd6fd93 = () => interopDefault(import('..\\pages\\maps\\google.vue' /* webpackChunkName: "pages/maps/google" */))
const _ab1e28c6 = () => interopDefault(import('..\\pages\\maps\\vector.vue' /* webpackChunkName: "pages/maps/vector" */))
const _a74375dc = () => interopDefault(import('..\\pages\\pages\\timeline.vue' /* webpackChunkName: "pages/pages/timeline" */))
const _232867c8 = () => interopDefault(import('..\\pages\\pages\\user.vue' /* webpackChunkName: "pages/pages/user" */))
const _5577e0d6 = () => interopDefault(import('..\\pages\\tables\\paginated.vue' /* webpackChunkName: "pages/tables/paginated" */))
const _156668e4 = () => interopDefault(import('..\\pages\\tables\\regular.vue' /* webpackChunkName: "pages/tables/regular" */))
const _11cd53e0 = () => interopDefault(import('..\\pages\\tables\\sortable.vue' /* webpackChunkName: "pages/tables/sortable" */))
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
    path: "/soporte_admin",
    component: _5664a476,
    name: "soporte_admin"
  }, {
    path: "/usuario",
    component: _68d5963b,
    name: "usuario"
  }, {
    path: "/components/buttons",
    component: _cde82290,
    name: "components-buttons"
  }, {
    path: "/components/cards",
    component: _0904115a,
    name: "components-cards"
  }, {
    path: "/components/grid-system",
    component: _10a7a866,
    name: "components-grid-system"
  }, {
    path: "/components/icons",
    component: _76826cde,
    name: "components-icons"
  }, {
    path: "/components/notifications",
    component: _42abb542,
    name: "components-notifications"
  }, {
    path: "/components/typography",
    component: _96ee6a70,
    name: "components-typography"
  }, {
    path: "/forms/components",
    component: _bd51c4dc,
    name: "forms-components"
  }, {
    path: "/forms/elements",
    component: _6f02ebf3,
    name: "forms-elements"
  }, {
    path: "/forms/validation",
    component: _3df27975,
    name: "forms-validation"
  }, {
    path: "/maps/google",
    component: _4dd6fd93,
    name: "maps-google"
  }, {
    path: "/maps/vector",
    component: _ab1e28c6,
    name: "maps-vector"
  }, {
    path: "/pages/timeline",
    component: _a74375dc,
    name: "pages-timeline"
  }, {
    path: "/pages/user",
    component: _232867c8,
    name: "pages-user"
  }, {
    path: "/tables/paginated",
    component: _5577e0d6,
    name: "tables-paginated"
  }, {
    path: "/tables/regular",
    component: _156668e4,
    name: "tables-regular"
  }, {
    path: "/tables/sortable",
    component: _11cd53e0,
    name: "tables-sortable"
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
