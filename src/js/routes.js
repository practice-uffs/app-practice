// Paginas do aplicativo

import MainPage from '../pages/main.f7.html';
import HomePage from '../pages/home.f7.html';
import EnvPage from '../pages/env.f7.html';
import ScanPage from '../pages/scan.f7.html';
import ChatsPage from '../pages/chats.f7.html';
import NewsPage from '../pages/news.f7.html';

import LoginPage from '../pages/login.f7.html';
import StatsPage from '../pages/stats.f7.html';
import AboutPage from '../pages/about.f7.html';
import NotFoundPage from '../pages/404.f7.html';

var routes = [
    {
        path: '/',
        component: MainPage,
        tabs: [
            {
                path: '/',
                id: 'home',
                component: HomePage,
            },
            {
                path: '/env/',
                id: 'env',
                component: EnvPage,
            },
            {
                path: '/scan/',
                id: 'scan',
                component: ScanPage,
            },
            {
                path: '/chats/',
                id: 'chats',
                component: ChatsPage,
            },
            {
                path: '/news/',
                id: 'news',
                component: NewsPage,
            },
        ],
    },

    {
        path: '/login/',
        component: LoginPage,
    },

    {
        path: '/stats/',
        component: StatsPage
    },

    {
        path: '/about/',
        component: AboutPage
    },

    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default routes;
