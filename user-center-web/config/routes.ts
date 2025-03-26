export default [
  { path: '/user', layout: false, routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ]
  },
  { name: '欢迎',path: '/welcome', icon: 'smile', component: './Welcome' },
  {
    name: '管理页',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {name: '用户管理', path: '/admin/user-manage', icon: 'smile', component: './Admin/UserManage'},
      {component: './404'},
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
