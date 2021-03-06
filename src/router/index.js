import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from "@/views/layout/layout";

// 首页和登录页以及不需要权限的公共页面

export const commontRouterMap = [{
        path: "/login",
        name: "login",
        hidden: true, //不在slider显示
        component: () =>
            import("@/views/login/index")
    },
    {
        path: "/",
        component: Layout,
        redirect: "/employ",
        name: "首页",
        hidden: true,
        children: [{
            path: "employ",
            name: "首页",
            component: () =>
                import("@/views/index")
        }]
    }
];

//需要权限的路由
export const asyncRouterMap = [{
        path: "/employ",
        component: Layout,
        name: "招聘管理",
        meta: {
            title: "招聘管理",
            icon: "menu-fold",
            role: ['0', '1', '2'],
            btnPermissions: ['新建', '查询', '重置']
        }
    },
    {
        path: "/userpower1",
        redirect: "/userpower2/1-1",
        component: Layout,
        name: "权限测试",
        meta: {
            title: "权限测试",
            icon: "appstore",
            role: ['0', '1', '2']
        },
        children: [{
                path: "1-1",
                name: "测试权限1-1",
                component: () =>
                    import("@/views/userpower1/1-1-1"),
                meta: {
                    title: "1-1",
                    role: ['0', '2'],
                    icon: "appstore",

                },
                children: [{
                    path: "1-1-1",
                    name: "测试权限1-1-1",
                    component: () =>
                        import("@/views/userpower1/1-1-1"),
                    meta: {
                        title: "防抖节流",
                        role: ['0', '1', '2'],
                        icon: "appstore",

                    },
                }],
            },
            {
                path: "1-2",
                name: "测试权限1-2",
                component: () =>
                    import("@/views/userpower1/1-2"),
                meta: {
                    title: "countTo",
                    role: ['0', '2'],
                    icon: "appstore",

                }
            },
            {
                path: "1-3",
                name: "测试权限1-3",
                component: () =>
                    import("@/views/userpower1/1-3"),
                meta: {
                    title: "ant",
                    role: ['0', '1', '2'],
                    icon: "appstore",

                }
            }

        ]
    },
    {
        path: "/userpower2",
        component: Layout,
        redirect: "/userpower2/2-1",
        name: "动态路由",
        meta: {
            title: "动态路由",
            icon: "robot",
            role: ['0', '2']
        },
        children: [{
                path: "2-1",
                name: "测试权限2-1",
                component: () =>
                    import("@/views/userpower2/2-1"),
                meta: {
                    title: "2-1",
                    role: ['0', '2'],
                    icon: "robot",

                }
            },
            {
                path: "2-2/:userId",
                name: "测试权限2-2",
                component: () =>
                    import("@/views/userpower2/2-2"),
                meta: {
                    title: "2-2",
                    role: ['0', '1', '2'],
                    icon: "robot",

                }
            }
        ]
    },
    {
        path: "/buttonRole",
        component: Layout,
        redirect: "/buttonRole/buttonRole",
        name: "添加地区",
        meta: {
            title: "添加地区",
            icon: "bug",
            role: ['0', '1', '2'],

        },
        children: [{
            path: "buttonRole",
            name: "添加地区",
            component: () =>
                import("@/views/modal/index"),
            meta: {
                title: "添加地区",
                role: ['0', '1', '2'],
            }
        }, ]
    },
    {
        path: "/power",
        component: Layout,
        redirect: "/power/power",
        name: "权限分配",
        meta: {
            title: "权限分配",
            icon: "aliwangwang",
            role: ['0', '2']
        },
        children: [{
            path: "power",
            name: "权限分配",
            router: "/power/power",
            component: () =>
                import("@/views/power/power"),
            meta: {
                title: "权限分配",
                role: ['0', '2']
            }
        }, ]
    },
    {
        path: "/optimize",
        component: Layout,
        redirect: "/optimize/index",
        name: "优化技巧",
        meta: {
            title: "优化技巧",
            icon: "aliwangwang",
            role: ['0', '2']
        },
        children: [{
                path: "index",
                name: "优化技巧",
                router: "/optimize/index",
                component: () =>
                    import("@/views/optimize/index"),
                meta: {
                    title: "优化技巧",
                }
            },
            {
                path: "optimize",
                name: "函数时组件",
                router: "/optimize/funComponents",
                component: () =>
                    import("@/views/optimize/funComponents"),
                meta: {
                    title: "函数时组件",
                    role: ['0', '2']
                }
            },
            {
                path: "optimize/funComponents",
                name: "组件属性穿透",
                router: "/optimize/funComponents",
                component: () =>
                    import("@/views/optimize/ComponentsAttributes/index"),
                meta: {
                    title: "组件属性穿透",
                    role: ['0', '2']
                }
            },
        ]
    },

];

//实例化vue的时候只挂载commontRouterMap
const createRouter = () => new VueRouter({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: commontRouterMap
})

const router = createRouter()

//退出登录后替换现有router的routes
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router;