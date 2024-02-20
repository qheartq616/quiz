import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/userInfo",
    name: "UserInfo",
    component: () =>
      import("../views/UserInfo.vue")
  },
  {
    path: "/list",
    name: "List",
    component: () =>
      import("../views/List.vue")
  },
  {
    path: "/score",
    name: "Score",
    component: () =>
      import("../views/Score.vue")
  }
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
})

export default router
