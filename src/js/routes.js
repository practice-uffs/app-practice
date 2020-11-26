import InitialPage from '../pages/initial.f7.html'
import HomePage from '../pages/home.f7.html'
import RightPanelPage from '../pages/right-panel.f7.html'

import EnvPage from '../pages/env.f7.html'
import ScanPage from '../pages/scan.f7.html'
import ChatsPage from '../pages/chats.f7.html'
  import ChatPage from '../pages/chat.f7.html'
import NewsPage from '../pages/news.f7.html'
import ProfilePage from '../pages/profile.f7.html'

import IdeasPage from '../pages/ideas.f7.html'
import ServicesPage from '../pages/services.f7.html'
  import ServiceOptionsPage from '../pages/service-options.f7.html'
  import ServicePage from '../pages/service.f7.html'
import CoinPage from '../pages/coin.f7.html'
import NotificationsPage from '../pages/notifications.f7.html'
import SettingsPage from '../pages/settings.f7.html'
import AboutPage from '../pages/about.f7.html'
  import RecordAudioPage from '../pages/record-audio.f7.html'

import TaskCompletedPage from '../pages/task-completed.f7.html'

import LoginPage from '../pages/login.f7.html'

import NotFoundPage from '../pages/404.f7.html'

import storage from '../js/storage.js'
import IsEnabled from './isenabled'

const authenticated = function (to, from, resolve, reject) {
  if (storage.getUserCredentials()) {
    resolve()
  } else {
    reject()
    this.navigate('/initial/')
  }
}

const unauthenticated = function (to, from, resolve, reject) {
  if (!storage.getUserCredentials()) {
    resolve()
  } else {
    reject()
    this.navigate('/')
  }
}

const homePageRoute = function () {
  let route = {
    path: '/',
    component: HomePage,
    beforeEnter: authenticated,
  }

  let tabs = []

  if (IsEnabled.newsPage)
    tabs.push({
      path: '/',
      id: 'news',
      component: NewsPage,
    })

  if (IsEnabled.envPage)
    tabs.push({
      path: '/env/',
      id: 'env',
      component: EnvPage,
    })

  if (IsEnabled.scanPage)
    tabs.push({
      path: '/scan/',
      id: 'scan',
      component: ScanPage,
    })

  if (IsEnabled.chatsPage)
    tabs.push({
      path: '/chats/',
      id: 'chats',
      component: ChatsPage,
    })

  if (IsEnabled.servicesPage)
    tabs.push({
      path: '/services/',
      id: 'services',
      component: ServicesPage,
    })

  route.tabs = tabs

  return route
}

const chatPageRoute = function () {
  let route = {
    path: '/chats/:id/',
    component: ChatPage,
    beforeEnter: authenticated,
  }

  if (IsEnabled.chatPage)
    return route
}

const servicePageRoute = function () {
  let route = {
    path: '/services/:id/',
    component: ServicePage,
    beforeEnter: authenticated,
  }

  if (IsEnabled.servicesPage)
    return route
}

const serviceOptionsPageRoute = function () {
  let route = {
    path: '/services/service-options/',
    component: ServiceOptionsPage,
    beforeEnter: authenticated,
  }

  if (IsEnabled.servicesPage)
    return route
}

const rightPanelRoute = function () {
  let route = {
    path: '/right-panel/',
    panel: {
      component: RightPanelPage,
    },
    beforeEnter: authenticated,
  }

  if (IsEnabled.rightPanel)
    return route
}

const ideasPageRoute = function () {
  let route = {
    path: '/ideas/',
    component: IdeasPage,
    beforeEnter: authenticated,
  }

  if (IsEnabled.ideasPage)
    return route
}

const coinPageRoute = function () {
  let route = {
    path: '/coin/',
    component: CoinPage,
    beforeEnter: authenticated,
  }

  if (IsEnabled.coinPage)
    return route
}

const notificationsPageRoute = function () {
  let route = {
    path: '/notifications/',
    component: NotificationsPage,
    beforeEnter: authenticated,
  }

  if (IsEnabled.notificationsPage)
    return route
}

const settingsPageRoute = function () {
  let route = {
    path: '/settings/',
    component: SettingsPage,
    beforeEnter: authenticated,
  }

  if (IsEnabled.settingsPage)
    return route
}

const aboutPageRoute = function () {
  let route = {
    path: '/about/',
    component: AboutPage,
    beforeEnter: authenticated,
  }

  if (IsEnabled.aboutPage)
    return route
}

const taskCompletedPageRoute = function () {
  let route = {
    path: '/task-completed/',
    component: TaskCompletedPage,
    beforeEnter: authenticated,
  }

  if (IsEnabled.taskCompletedPage)
    return route
}

const recordAudioPageRoute = function () {
  let route = {
    path: '/about/record-audio/',
    component: RecordAudioPage,
    beforeEnter: authenticated,
  }

  if (IsEnabled.recordAudioPage)
    return route
}

const initialPageRoute = function () {
  return {
    path: '/initial/',
    component: InitialPage,
    beforeEnter: unauthenticated,
  }
}

const loginPageRoute = function () {
  return {
    path: '/login/',
    loginScreen: {
      component: LoginPage,
    },
    beforeEnter: unauthenticated,
  }
}

const notFoundPageRoute = function () {
  return {
    path: '(.*)',
    component: NotFoundPage,
  }
}

var routes = [
  // Authenticated routes
  homePageRoute(),
  chatPageRoute(),
  serviceOptionsPageRoute(),
  servicePageRoute(),
  rightPanelRoute(),
  ideasPageRoute(),
  coinPageRoute(),
  notificationsPageRoute(),
  settingsPageRoute(),
  aboutPageRoute(),
  taskCompletedPageRoute(),
  recordAudioPageRoute(),
  // Unauthenticated routes
  initialPageRoute(),
  loginPageRoute(),
  notFoundPageRoute(),
]

// Removing undefined routes
var routes = routes.filter(function (el) {
  return el != null
})

export default routes
