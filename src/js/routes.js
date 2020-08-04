// Paginas do aplicativo

import HomePage from '../pages/home.f7.html';
import ProfilePage from '../pages/profile.f7.html';
import StatsPage from '../pages/stats.f7.html';
import AboutPage from '../pages/about.f7.html';
import NotFoundPage from '../pages/404.f7.html';

var routes = [
    {
        path: '/',
        component: HomePage,
    },

    {
        path: '/profile/',
        component: ProfilePage,
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
