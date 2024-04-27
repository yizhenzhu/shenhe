import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";




Vue.use(VueRouter)
const routes = [

  {
    path: '/', name: 'login', meta: { title: '登录页' }, component: () => import('../views/Login')
  }, // path："/"，表示默认页面，打开项目的第一个页面

  {
    path: '/notPage', name: 'notPage', meta: { title: '无页面' }, component: () => import('../views/404')
  },
  {
    path: '*',
    redirect: '/notPage'
  },
  {
    path: '/home',
    name: 'Home',

    children: [
      // {
      //   path: '/reviewed',
      //   name: 'reviewed',
      //   meta: {
      //     title: '待审核列表'
      //   },
      //   component: () => import("../views/reviewed/reviewed")
      // },
      {
        path: '/welcome',
        name: 'welcome',
        meta: {
          title: '首页'
        },
        component: () => import("../views/welcome/welcome")
      },
      {
        path: '/Preliminaryexamination',
        name: 'Preliminaryexamination',
        meta: {
          title: '初审'
        },
        component: () => import("../views/preliminary/Preliminaryexamination")
      },
      {
        path: '/reviewcase',
        name: 'reviewcase',
        meta: {
          title: '复审'
        },
        component: () => import("../views/reviewcase/reviewcase")
      },
      {
        path: '/finaljudgment',
        name: 'finaljudgment',
        meta: {
          title: '终审'
        },
        component: () => import("../views/finaljudgment/finaljudgment")
      },
      {
        path: '/reslist',
        name: 'reslist',
        meta: {
          title: '审核结果列表'
        },
        component: () => import("../views/reslist/reslist")
      },
      {
        path: '/domain_decide',
        name: 'domain_decide',
        meta: {
          title: '域名判定查询'
        },
        component: () => import("../views/domain/domain")
      },
      {
        path: '/data_push',
        name: 'data_push',
        meta: {
          title: '平台数据推送'
        },
        component: () => import("../views/dataPush/dataPush")
      },
      {
        path: '/alarm',
        name: 'alarm',
        meta: {
          title: '警情接口'
        },
        component: () => import("../views/alarm/alarm")
      },
      // 流程记录-审核日志 ——>后端传的
      {
        path: '/technologicalprocess',
        name: 'technologicalprocess',
        meta: {
          title: '流程记录页面'
        },
        component: () => import("../views/technologicalprocess/technologicalprocess")
      },
      {
        path: '/Numberallocation',
        name: 'Numberallocation',
        meta: {
          title: '人数配置页面'
        },
        component: () => import("../views/Numberallocation/Numberallocation")
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '人数配置页面'
        },
        component: () => import("../views/user/user")
      },
      {
        path: '/Role',
        name: 'Role',
        meta: {
          title: '角色管理页面'
        },
        component: () => import("../views/Role/Role")
      },
      {
        path: '/menu',
        name: 'menu',
        meta: {
          title: '菜单管理页面'
        },
        component: () => import("../views/menu/menu")
      },
      {
        path: '/treatment',
        name: 'treatment',
        meta: {
          title: '流程管理页面'
        },
        component: () => import("../views/treatment/treatment")
      },
    ],
    component: Home
  },

]
const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',//路由选择方式两种：hash一般选择、history---后续了解一下！！！
  routes
})

// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/') return next()
  const storedToken  = window.sessionStorage.getItem('token')
  if (!storedToken) {
    // 禁止访问页面
    next({ path: '/' });
  } else {
    next();
  }
})

// 前置守卫 to: 要去的页面，  from：从哪个页面  next： 跳转操作函数
// 主要是确保用户登录状态，登录过期及重新登录
// router.beforeEach((to, from, next) => {
//   if (to.path === '/') return next()
//   const storedToken  = window.sessionStorage.getItem('token') // sessionStorage 存储的登录token
//   if (!storedToken) {
//     // 禁止访问页面
//     next({ path: '/' });
//   } else {
//     next();
//   }
// })

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;
