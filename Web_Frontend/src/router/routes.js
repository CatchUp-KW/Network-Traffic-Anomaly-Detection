import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Home from "@/pages/Home.vue";
import ResultTable from "@/pages/ResultTable.vue";
import Abnormal from "@/pages/Abnormal.vue";
import Attack from "@/pages/Attack.vue";
import Login from "@/pages/Login.vue";
import Setting from "@/pages/Setting.vue";
import Information from "@/pages/Information.vue";

import { store } from "@/store/store"

const routes = [
  {
    path: "/",
    name: "login",
    beforeEnter: (to, from, next) => {
      store.dispatch('auth')
      if (store.state.token){
        next("/home");
      }else{
        return next();
      }
    },
    component: Login,
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        beforeEnter: (to, from, next) => {
          store.dispatch('auth')
          if (!store.state.token){
            alert("로그인이 필요합니다.")
            next("/");
          }else{
            return next();
          }
        },
        component: Home
      },
      {
        path: "result",
        name: "result",
        beforeEnter: (to, from, next) => {
          store.dispatch('auth')
          if (!store.state.token){
            alert("로그인이 필요합니다.")
            next("/");
          }else{
            return next();
          }
        },
        component: ResultTable,
        props: true
      },
      {
        path: "abnormal",
        name: "abnormal",
        beforeEnter: (to, from, next) => {
          store.dispatch('auth')
          if (!store.state.token){
            alert("로그인이 필요합니다.")
            next("/");
          }else{
            return next();
          }
        },
        component: Abnormal
      },
      {
        path: "attack",
        name: "attack",
        beforeEnter: (to, from, next) => {
          store.dispatch('auth')
          if (!store.state.token){
            alert("로그인이 필요합니다.")
            next("/");
          }else{
            return next();
          }
        },
        component: Attack
      },
      {
        path: "information",
        name: "information",
        beforeEnter: (to, from, next) => {
          store.dispatch('auth')
          if (!store.state.token){
            alert("로그인이 필요합니다.")
            next("/");
          }else{
            return next();
          }
        },
        component: Information
      },
      {
        path: "setting",
        name: "setting",
        beforeEnter: (to, from, next) => {
          store.dispatch('auth')
          if (!store.state.token){
            alert("로그인이 필요합니다.")
            next("/");
          }else{
            return next();
          }
        },
        component: Setting
      },
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
