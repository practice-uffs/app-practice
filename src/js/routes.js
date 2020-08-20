import MainPage from '../pages/main.f7.html';
import RightPanelPage from '../pages/right-panel.f7.html';

// Tabs
import HomePage from '../pages/home.f7.html';

import EnvPage from '../pages/env.f7.html';
import ScanPage from '../pages/scan.f7.html';
import ChatsPage from '../pages/chats.f7.html';
  import ChatPage from '../pages/chat.f7.html';
import NewsPage from '../pages/news.f7.html';
  import NewPage from '../pages/new.f7.html';

import IdeasPage from '../pages/ideas.f7.html';
import ServicesPage from '../pages/services.f7.html';
  import ServicePage from '../pages/service.f7.html';
import CoinPage from '../pages/coin.f7.html';
import NotificationsPage from '../pages/notifications.f7.html';
import SettingsPage from '../pages/settings.f7.html';
import AboutPage from '../pages/about.f7.html';

import LoginPage from '../pages/login.f7.html';

import StatsPage from '../pages/stats.f7.html';
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
    path: '/chats/:id/',
    component: ChatPage,
  },

  {
    path: '/news/:id/',
    component: NewPage,
  },

  {
    path: '/services/',
    id: 'services',
    component: ServicesPage,
  },

  {
    path: '/services/:id/',
    component: ServicePage,
  },

  {
    path: '/right-panel/',
    panel: {
      component: RightPanelPage,
    }
  },

  {
    path: '/login/',
    component: LoginPage,
  },

  {
    path: '/stats/',
    component: StatsPage,
  },

  {
    path: '/ideas/',
    component: IdeasPage,
  },

  {
    path: '/coin/',
    component: CoinPage,
  },

  {
    path: '/notifications/',
    component: NotificationsPage,
  },

  {
    path: '/settings/',
    component: SettingsPage,
  },

  {
    path: '/about/',
    component: AboutPage,
  },

  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
