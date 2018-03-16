import Login from './views/login.vue'
import Home  from  './views/Home.vue'
import Main  from  './views/Main.vue'
import Table from  './views/nav1/add.vue'
import Form  from  './views/nav1/edit.vue'
import NotFound from './views/404.vue'
// import Page1 from  './views/nav2/page1.vue'
// import Page2 from  './views/nav2/page2.vue'
// import Heart from  './views/nav3/heart.vue'


let routes = [
    {
        path:'/login',
        component:Login,
        name:'',
        hidden:true
    },
    {
        path:'/404',
        component:NotFound,
        name:'',
        hidden:true
    },
    {
       path: '/',
       component: Home,
       leaf: true,//只有一个节点
       icon:'fa fa-home',
       children: [
           { path: '/main', component: Main, name: '机构管理' }
       ]
    },
    {
        path: '/',
        component: Home,
        leaf: true,
        name: '设备管理',
        icon: 'fa fa-windows',
        children: [
            { path: '/addEdit', component: Table, name: '添加设备' },
        ]
    },
    {
        path:'*',
        hidden:true,
        redirect:{ path :'/404' }
    }
];

export default routes;
