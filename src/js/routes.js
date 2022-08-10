import InitialPage from "../pages/initial.f7.html";
import HomePage from "../pages/home.f7.html";
import RightPanelPage from "../pages/right-panel.f7.html";

import EnvPage from "../pages/env.f7.html";
import AuraPage from "../pages/aura.f7.html";
import ScanPage from "../pages/scan.f7.html";
import ChatsPage from "../pages/chats.f7.html";
import ChatPage from "../pages/chat.f7.html";
import NewsPage from "../pages/news.f7.html";
import ProfilePage from "../pages/profile.f7.html";

import CuIdCardPage from "../pages/cu-id-card.f7.html";
import CuIdCardRequestPage from "../pages/cu-id-card-request.f7.html";
import CuIdCardDetailsPage from "../pages/cu-id-card-details.f7.html";
import CuHomePage from "../pages/cu-home.f7.html";
import CuRoomSchedulingPage from "../pages/cu-room-scheduling.f7.html";
import CuUniversityRestaurantPage from "../pages/cu-university-restaurant.f7.html";

import IdeasPage from "../pages/ideas.f7.html";
import ServicesPage from "../pages/services.f7.html";
import ServiceRequestPage from "../pages/service-request.f7.html";
import ServiceDetailsPage from "../pages/service-details.f7.html";
import CoinPage from "../pages/coin.f7.html";
import NotificationsPage from "../pages/notifications.f7.html";
import SettingsPage from "../pages/settings.f7.html";
import AboutPage from "../pages/about.f7.html";
import RecordAudioPage from "../pages/record-audio.f7.html";

import TaskCompletedPage from "../pages/task-completed.f7.html";

import LoginPage from "../pages/login.f7.html";

import NotFoundPage from "../pages/404.f7.html";

import IsEnabled from "./isenabled";

const authenticated = function (to, from, resolve, reject) {
  let self = this;
  var app = self.app;

  if (app.storage.getUserCredentials()) {
    resolve();
  } else {
    reject();
    self.navigate("/initial/");
  }
};

const unauthenticated = function (to, from, resolve, reject) {
  let self = this;
  var app = self.app;

  if (!app.storage.getUserCredentials()) {
    resolve();
  } else {
    reject();
    self.navigate("/");
  }
};

const homePageRoute = function () {
  let route = {
    path: "/",
    component: HomePage,
    beforeEnter: authenticated,
  };

  let tabs = [];

  if (IsEnabled.servicesPage)
    tabs.push({
      path: "/",
      id: "services",
      component: ServicesPage,
    });

  if (IsEnabled.newsPage)
    tabs.push({
      path: "/news/",
      id: "news",
      component: NewsPage,
    });

  if (IsEnabled.cuIdCardPage)
    tabs.push({
      path: "/cu/id-card/",
      id: "cu-id-card",
      component: CuIdCardPage,
    });

  if (IsEnabled.cuHomePage)
    tabs.push({
      path: "/cu/home/",
      id: "cu-home",
      component: CuHomePage,
    });

  if (IsEnabled.auraPage)
    tabs.push({
      path: "/aura/",
      id: "aura",
      component: AuraPage,
    });

  if (IsEnabled.chatsPage)
    tabs.push({
      path: "/chats/",
      id: "chats",
      component: ChatsPage,
    });

  route.tabs = tabs;

  return route;
};

const chatPageRoute = function () {
  let route = {
    path: "/chats/:id/",
    component: ChatPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.chatPage) return route;
};

const serviceDetailsPageRoute = function () {
  let route = {
    path: "/services/:id/",
    component: ServiceDetailsPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.servicesPage) return route;
};

const serviceRequestPageRoute = function () {
  let route = {
    path: "/services/service-request/",
    component: ServiceRequestPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.servicesPage) return route;
};

const cuPagesRoutes = function () {
  let route = {
    path: "/cu/"
  };

  let modules = [];

  if (IsEnabled.cuIdCardPage) {
    modules.push({
      path: "/id-card/",
      routes: [{
        path: "/request/",
        component: CuIdCardRequestPage,
        beforeEnter: authenticated,
      }, {
        path: "/details/",
        component: CuIdCardDetailsPage,
        beforeEnter: authenticated,
      }]
    });
  }

  if (IsEnabled.cuRoomSchedulingPage) {
    modules.push({
      path: "/room-scheduling/",
      component: CuRoomSchedulingPage
    });
  }

  if (IsEnabled.cuUniversityRestaurantPage) {
    modules.push({
      path: "/university-restaurant/",
      component: CuUniversityRestaurantPage
    });
  }

  route.routes = modules;
  if (IsEnabled.cuPages) return route;
};

const rightPanelRoute = function () {
  let route = {
    path: "/right-panel/",
    panel: {
      component: RightPanelPage,
    },
    beforeEnter: authenticated,
  };

  if (IsEnabled.rightPanel) return route;
};

const ideasPageRoute = function () {
  let route = {
    path: "/ideas/",
    component: IdeasPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.ideasPage) return route;
};

const coinPageRoute = function () {
  let route = {
    path: "/coin/",
    component: CoinPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.coinPage) return route;
};

const notificationsPageRoute = function () {
  let route = {
    path: "/notifications/",
    component: NotificationsPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.notificationsPage) return route;
};

const settingsPageRoute = function () {
  let route = {
    path: "/settings/",
    component: SettingsPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.settingsPage) return route;
};

const aboutPageRoute = function () {
  let route = {
    path: "/about/",
    component: AboutPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.aboutPage) return route;
};

const scanPageRoute = function () {
  let route = {
    path: "/scan/",
    component: ScanPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.scanPage) return route;
};

const envPageRoute = function () {
  let route = {
    path: "/env/",
    component: EnvPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.envPage) return route;
};

const taskCompletedPageRoute = function () {
  let route = {
    path: "/task-completed/",
    component: TaskCompletedPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.taskCompletedPage) return route;
};

const recordAudioPageRoute = function () {
  let route = {
    path: "/about/record-audio/",
    component: RecordAudioPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.recordAudioPage) return route;
};

const initialPageRoute = function () {
  return {
    path: "/initial/",
    component: InitialPage,
    beforeEnter: unauthenticated,
  };
};

const loginPageRoute = function () {
  return {
    path: "/login/",
    component: LoginPage,
    beforeEnter: unauthenticated,
  };
};

const notFoundPageRoute = function () {
  return {
    path: "(.*)",
    component: NotFoundPage,
  };
};

var routes = [
  // Authenticated routes
  homePageRoute(),
  chatPageRoute(),
  serviceRequestPageRoute(),
  serviceDetailsPageRoute(),
  cuPagesRoutes(),
  rightPanelRoute(),
  ideasPageRoute(),
  coinPageRoute(),
  notificationsPageRoute(),
  settingsPageRoute(),
  aboutPageRoute(),
  scanPageRoute(),
  envPageRoute(),
  taskCompletedPageRoute(),
  recordAudioPageRoute(),
  // Unauthenticated routes
  initialPageRoute(),
  loginPageRoute(),
  notFoundPageRoute(),
];

// Removing undefined routes
var routes = routes.filter(function (el) {
  return el != null;
});

export default routes;
