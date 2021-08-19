// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter) 
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来  
var Bar = { template: '<div>bar</div>' }


// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
var routes = [
    { path: '/todolist', component: todolist },
    { path: '/setTest', component: setTest },
    { path: '/simpleCrm', component: simpleCrm },
    { path: '/infoShow/:name', component: infoShow },
    { path: '/infoEdit', component: infoEdit },
    { path: '/tabPage', component: tabPage },
    // { path: '/barrage', component: barrage}
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
var router = new VueRouter({
    routes: routes // routes(缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
var app = new Vue({
    router,
    template: `
        <div>        
        <ul class='nav'>
            <!-- 使用 router-link 组件来导航. -->
            <li><router-link to="/simpleCrm">列表管理</router-link> </li>
            <li><router-link to="/setTest">setTest</router-link> </li>
            <li><router-link to="/todolist">代办列表</router-link> </li>
            <li><router-link to="/listButton">listButton</router-link></li>
            <li><router-link to="/tabPage">tabPage</router-link></li>
        </ul>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>     
    </div>
    `
}).$mount('#app')

    // 现在，应用已经启动了！