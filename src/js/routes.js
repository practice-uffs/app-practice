import InitialPage from '../pages/initial.f7.html';
import MainPage from '../pages/main.f7.html';
import RightPanelPage from '../pages/right-panel.f7.html';

import HomePage from '../pages/home.f7.html';
import EnvPage from '../pages/env.f7.html';
import ScanPage from '../pages/scan.f7.html';
import ChatsPage from '../pages/chats.f7.html';
  import ChatPage from '../pages/chat.f7.html';
import NewsPage from '../pages/news.f7.html';

import IdeasPage from '../pages/ideas.f7.html';
import ServicesPage from '../pages/services.f7.html';
  import ServicePage from '../pages/service.f7.html';
import CoinPage from '../pages/coin.f7.html';
import NotificationsPage from '../pages/notifications.f7.html';
import SettingsPage from '../pages/settings.f7.html';
import AboutPage from '../pages/about.f7.html';
  import RecordAudioPage from '../pages/record-audio.f7.html';

import LoginPage from '../pages/login.f7.html';

import StatsPage from '../pages/stats.f7.html';
import NotFoundPage from '../pages/404.f7.html';

import { getUserCredentials } from '../js/storage.js'

const authenticated = function (to, from, resolve, reject) {
  if (getUserCredentials()) {
    resolve()
  } else {
    reject()
    this.navigate('/initial/')
  }
}

const unauthenticated = function (to, from, resolve, reject) {
  if (!getUserCredentials()) {
    resolve()
  } else {
    reject()
    this.navigate('/')
  }
}

var routes = [
  // Authenticated routes
  
  {
    path: '/',
    component: MainPage,
    beforeEnter: authenticated,
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
    beforeEnter: authenticated,
  },

  {
    path: '/services/',
    id: 'services',
    component: ServicesPage,
    beforeEnter: authenticated,
  },

  {
    path: '/services/:id/',
    component: ServicePage,
    beforeEnter: authenticated,
  },

  {
    path: '/right-panel/',
    panel: {
      component: RightPanelPage,
    },
    beforeEnter: authenticated,
  },

  {
    path: '/stats/',
    component: StatsPage,
    beforeEnter: authenticated,
  },

  {
    path: '/ideas/',
    component: IdeasPage,
    beforeEnter: authenticated,
  },

  {
    path: '/services/',
    component: ServicesPage,
    beforeEnter: authenticated,
  },

  {
    path: '/services/:id/',
    component: ServicePage,
    beforeEnter: authenticated,
  },

  {
    path: '/coin/',
    component: CoinPage,
    beforeEnter: authenticated,
  },

  {
    path: '/notifications/',
    component: NotificationsPage,
    beforeEnter: authenticated,
  },

  {
    path: '/settings/',
    component: SettingsPage,
    beforeEnter: authenticated,
  },

  {
    path: '/about/',
    component: AboutPage,
    beforeEnter: authenticated,
  },

  {
    path: '/about/record-audio/',
    component: RecordAudioPage,
    beforeEnter: authenticated,
  },

  // Unauthenticated routes

  {
    path: '/initial/',
    component: InitialPage,
    beforeEnter: unauthenticated,
  },

  {
    path: '/login/',
    loginScreen: {
      component: LoginPage,
    },
    beforeEnter: unauthenticated,
  },

  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
