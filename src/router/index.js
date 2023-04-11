import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'


const routes = [
    {
      path: '/center',
      component: () => import('@/views/Center.vue'),
      // 懒加载 ：到指定路径才会加载对应的组件 ，解决单页面项目主页加载过慢问题
    },

    {
      path: '/set',
      component: () => import('@/views/Set.vue'),
      meta: {
        isRequired: true
      }
    },

    {
      path: '/order',
      component: () => import('@/views/Order.vue'),
      meta: {
        isRequired: true
      }
    },

    {
      name:'login',
      path: '/login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/films',
      component: () => import('@/views/Films.vue'),
      /* 嵌套路由 */
      children: [
        {
          path: '/films/nowplaying',
          component: () => import('@/views/films/NowPlaying.vue'),
        },
        {
          path: '/films/comingsoon',
          component: () => import('@/views/films/ComingSoon.vue'),
        },
        {
          path: '/films',
          redirect:'/films/nowplaying'
        },
      ]
    },

    {
      path: '/city',
      component: () => import('@/views/City.vue'),
    },

    {
      name: 'myDetail', // 命名路由
      path: '/detail/:id', // 动态二级路由
      component: () => import('@/views/Detail.vue'),
    },

    {
      path: '/cinemas',
      component: () => import('@/views/Cinemas.vue'),
    },

    {
      path: '/cinemas/search',
      component: () => import('@/views/Search.vue'),
    },


    {
      path: '/user',
      component: () => import('@/views/User.vue'),
      meta: {
        isRequired: true
      },
      children:[
        {
          path:'/user/list',
          component: () =>import('@/views/user/UserList.vue'),
        },
        {
          path:'/user/cinema',
          component: () =>import('@/views/user/UserCinema.vue'),
        },
        {
          path:'/user/packet',
          component: () =>import('@/views/user/UserPacket.vue'),
        },
        {
          path: '/user/card',
          component: () => import('@/views/user/UserCard.vue'),
        },
        {
          path: '/user/balance',
          component: () => import('@/views/user/UserBalance.vue'),
        },
      ]
    },

    {
      path: '/help',
      component: () => import('@/views/Help.vue'),
      meta: {
        isRequired: true
      },
    },
    
    /* 重定向 */
    {
      path: '/',
      redirect:'/films/nowplaying'
    },
    {
      path: '/:pathMatch(.*)', 
      redirect:'/films/nowplaying',
    }
]

const router = createRouter({
  /* history: createWebHistory(), */  //history 模式
  history:createWebHashHistory(),//hash 模式
  routes
})

export default router
