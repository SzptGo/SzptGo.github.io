import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router"

const Layout = () => import("@/layout/index.vue")

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/product",
    component: Layout,
    redirect: "/product/list",
    children: [
      {
        path: "list",
        component: () => import("@/views/product/index.vue"),
        name: "prodcut",
        meta: {
          title: "商品管理",
          elIcon: "Goods"
        }
      }
    ]
  },
  {
    path: "/product-category",
    component: Layout,
    redirect: "/product-category/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/product-category/index.vue"),
        name: "prodcut-category",
        meta: {
          title: "商品分类管理",
          elIcon: "Menu"
        }
      }
    ]
  },
  {
    path: "/user",
    component: Layout,
    redirect: "/user",
    children: [
      {
        path: "index",
        component: () => import("@/views/user/index.vue"),
        name: "user",
        meta: {
          title: "用户管理",
          elIcon: "User"
        }
      }
    ]
  },
  {
    path: "/car",
    component: Layout,
    redirect: "/car",
    name: "car",
    meta: {
      title: "汽车管理",
      svgIcon: "car"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/car/list.vue"),
        name: "list",
        meta: {
          title: "二手车列表",
          keepAlive: true,
          elIcon: "List"
        }
      },

      {
        path: "brand",
        component: () => import("@/views/car/brand.vue"),
        name: "brand",
        meta: {
          title: "品牌管理",
          keepAlive: true,
          svgIcon: "brand"
        }
      },
      {
        path: "series",
        component: () => import("@/views/car/series.vue"),
        name: "series",
        meta: {
          title: "车系管理",
          keepAlive: true,
          svgIcon: "4-汽车系列"
        }
      },
      {
        path: "power-type",
        component: () => import("@/views/car/power-type.vue"),
        name: "power-type",
        meta: {
          title: "能源类型管理",
          keepAlive: true,
          svgIcon: "power"
        }
      },

      {
        path: "car-type",
        component: () => import("@/views/car/car-type.vue"),
        name: "car-type",
        meta: {
          title: "车型管理",
          keepAlive: true,
          svgIcon: "4-汽车型号"
        }
      },
      {
        path: "country",
        component: () => import("@/views/car/country.vue"),
        name: "country",
        meta: {
          title: "国别管理",
          keepAlive: true,
          svgIcon: "globe-asia"
        }
      }
    ]
  },
  {
    path: "/order",
    component: Layout,
    redirect: "/order",
    name: "order",
    meta: {
      title: "订单管理",
      elIcon: "List"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/order/list.vue"),
        name: "ElementPlus",
        meta: {
          title: "订单列表",
          keepAlive: true,
          elIcon: "List"
        }
      },
      {
        path: "rate-list",
        component: () => import("@/views/order/rate-list.vue"),
        name: "rate-list",
        meta: {
          title: "评价列表",
          keepAlive: true,
          svgIcon: "comment"
        }
      }
    ]
  },
  {
    path: "/link",
    component: Layout,
    children: [
      {
        path: "http://110.41.150.2/#/home",
        component: () => {},
        name: "Link",
        meta: {
          title: "前往商城首页",
          svgIcon: "link"
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "权限管理",
      svgIcon: "lock",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page.vue"),
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["admin"] // 或者在子导航中设置角色
        }
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive.vue"),
        name: "DirectivePermission",
        meta: {
          title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
