import Vue from 'vue';
import VueRouter from 'vue-router';
// import HelloWorld from '@/components/HelloWorld'; //메인 컴포넌트 호출
import AppMake from '../components/common/AppMake.vue';
import AppBefore from '../components/common/AppBefore.vue';
import AppVote from '../components/common/AppVote.vue';
import AppResult from '../components/common/AppResult.vue';
import AppLogin from '../components/common/AppLogin.vue';
import AppRegister from '../components/common/AppRegister.vue';
import AppLogout from '../components/common/AppLogout.vue';
import AppMain from '../components/common/AppMain.vue';
import AppTest from '../components/common/AppTest.vue';
import AppProps from '../components/common/AppProps.vue';
import AppModal from '../components/AppModal.vue';
import AppCard from '../components/common/AppCard.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'AppLogin',
    component: AppLogin,
  },
  {
    path: '/common/AppProps',
    name: 'AppProps',
    component:AppProps,
  },
  {
    path: '/common/AppMain',
    name: 'AppMain',
    component:AppMain,
  },
  {
    path: '/AppModal',
    name: 'AppModal',
    component:AppModal,
  },
  {
    path: '/common/AppCard',
    name: 'AppCard',
    component:AppCard,
  },
 
  
 
  {
    path: '/common/AppMake',
    name: 'AppMake',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AppMake,
  },
  {
    path: '/common/AppBefore',
    name: 'AppBefore',
    component: AppBefore,
  },
  {
    path: '/common/AppTest',
    name: 'AppTest',
    component: AppTest,
  },
  {
    path: '/common/AppBefore',
    name: 'AppBefore',
    component: AppBefore,
  },
  {
    path: '/common/AppMain',
    name: 'AppMain',
    component: AppMain,
  },
  {
    path: '/common/AppVote',
    name: 'AppVote',
    component: AppVote,
  },
  {
    path: '/common/AppResult',
    name: 'AppResult',
    component: AppResult,
  },
  {
    path: '/common/AppLogin',
    name: 'AppLogin',
    component: AppLogin,
  },
  {
    path: '/common/AppRegister',
    name: 'AppRegister',
    component: AppRegister,
  },
  {
    path: '/common/AppLogout',
    name: 'AppLogout',
    component: AppLogout,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
