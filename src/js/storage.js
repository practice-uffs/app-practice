const storage = {
  prodApiURL: "https://mural.practice.uffs.cc/api/",
  testApiURL: "https://qa.mural.practice.uffs.cc/api/",

  api: () => {
    const settings = storage.getSettings();

    if (settings.devMode && settings.testApi) return storage.testApiURL;
    else return storage.prodApiURL;
  },

  init: (app) => {
    storage.app = app;
    app.storage = storage;
  },

  // Value processing methods

  dateDifference: (date) => {
    date = new Date(date);
    const now = new Date();
    return now - date;
  },

  formatDateDifference: (difference) => {
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);

    if (years > 0) {
      return years === 1 ? years + " ano" : years + " anos";
    } else if (months > 0) {
      return months === 1 ? months + " mês" : months + " meses";
    } else if (days > 0) {
      return days === 1 ? days + " dia" : days + " dias";
    } else if (hours > 0) {
      return hours === 1 ? hours + " hora" : hours + " horas";
    } else if (minutes > 0) {
      return minutes === 1 ? minutes + " minuto" : minutes + " minutos";
    } else if (seconds > 0) {
      return seconds === 1 ? seconds + " segundo" : seconds + " segundos";
    } else {
      return "agora mesmo";
    }
  },

  formatDate: (date) => {
    date = date.split(" ");
    date = new Date(Date.parse(date[2] + " " + date[1] + ", " + date[3]));

    const options = { year: "numeric", month: "long", day: "numeric" };
    date = date.toLocaleDateString(undefined, options);

    return date.toUpperCase().charAt(0).toUpperCase() + date.slice(1);
  },

  processHTML: (input) => {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  },

  // LocalStorage methods

  clearAll: () => {
    localStorage.clear();
  },

  // Settings methods

  getSettings: () => {
    let settings = localStorage["settings"];

    if (!settings) {
      settings = {
        offlineStorage: true,
        // Dev options
        devMode: false,
        testApi: false,
      };
      localStorage["settings"] = JSON.stringify(settings);
    } else {
      settings = JSON.parse(settings);
    }

    return settings;
  },

  setSettings: (settings) => {
    localStorage["settings"] = JSON.stringify(settings);
  },

  // User credentials methods

  requestLogin: async (username, password) => {
    return await storage.app.request.promise
      .post(storage.api() + "auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        let data = JSON.parse(res.data);
        if (data.access_token) {
          storage.setUserCredentials(data);
          storage.app.request.setup({
            headers: {
              Authorization: "Bearer " + data.access_token,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  },

  requestLogout: async () => {
    return await storage.app.request.promise
      .post(storage.api() + "auth/logout")
      .then((res) => {
        if (res.data) {
          storage.clearUserCredentials();
          storage.app.request.setup({
            headers: {
              Authorization: "",
            },
          });
          return true;
        } else {
          return false;
        }
      });
  },

  getUserCredentials: () => {
    let userCredentials = localStorage["userCredentials"];

    if (userCredentials) {
      userCredentials = JSON.parse(userCredentials);
      storage.app.request.setup({
        headers: {
          Authorization: "Bearer " + userCredentials.access_token,
        },
      });
      return userCredentials;
    } else {
      storage.app.request.setup({
        headers: {
          Authorization: "",
        },
      });
      return false;
    }
  },

  setUserCredentials: (userCredentials) => {
    localStorage["userCredentials"] = JSON.stringify(userCredentials);
  },

  clearUserCredentials: () => {
    localStorage.removeItem("userCredentials");
  },

  // User data methods

  requestUserData: async () => {
    return await storage.app.request.promise
      .post(storage.api() + "auth/me")
      .then((res) => {
        const userData = JSON.parse(res.data);
        storage.setUserData(userData);
        return userData;
      });
  },

  getUserData: async () => {
    let userData = localStorage["userData"];

    if (!userData) {
      return await storage.requestUserData();
    } else {
      return JSON.parse(userData);
    }
  },

  setUserData: (userData) => {
    localStorage["userData"] = JSON.stringify(userData);
  },

  // Audio recording methods

  getRecordings: () => {
    let recordings = localStorage["recordings"];

    if (!recordings) {
      recordings = [];
      localStorage["recordings"] = JSON.stringify(recordings);
    } else recordings = JSON.parse(recordings);

    return recordings;
  },

  addRecording: (recording) => {
    let recordings = localStorage["recordings"];

    if (!recordings) recordings = [];

    recordings = JSON.parse(recordings);
    recordings.push(recording);

    localStorage["recordings"] = JSON.stringify(recordings);
  },

  clearRecordings: () => {
    localStorage.removeItem("recordings");
  },

  // News methods

  getNews: async () => {
    return await storage.app.request.promise
      .get("https://practice.uffs.cc/feed.xml")
      .then((res) => {
        let xml_parser = require("fast-xml-parser");
        let obj = xml_parser.parse(res.data);
        let news = obj.rss.channel.item;

        for (let i = 0; i < news.length; i++) {
          const content = storage.processHTML(news[i].content);
          news[i].content = content;

          const pubDate = storage.formatDate(news[i].pubDate);
          news[i].pubDate = pubDate;
        }
        return news;
      });
  },

  // Services methods

  getServiceSpecifications: async () => {
    return await storage.app.request.promise
      .get(storage.api() + "specifications")
      .then((res) => {
        // Grouping services by category
        let service_specifications = JSON.parse(res.data);
        service_specifications = service_specifications.reduce((list, x) => {
          (list[x["category_id"]] = list[x["category_id"]] || []).push(x);
          return list;
        }, {});
        return service_specifications;
      });
  },

  getRequestedServices: async () => {
    return await storage.getUserData().then(async (userData) => {
      return await storage.app.request.promise
        .get(storage.api() + "services", { user_id: userData.id })
        .then((res) => {
          let services = JSON.parse(res.data).data;
          for (let i = 0; i < services.length; i++) {
            services[i].timestamp = storage.dateDifference(
              services[i].created_at
            );
            services[i].created_at = storage.formatDateDifference(
              services[i].timestamp
            );
            services[i].user_id = Number(services[i].user_id);
            services[i].category_id = Number(services[i].category_id);
            services[i].location_id = Number(services[i].location_id);
            services[i].specification_id = Number(services[i].specification_id);
            services[i].status = Number(services[i].status);
          }
          services.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
          return services;
        });
    });
  },

  getLocations: async () => {
    return await storage.app.request.promise
      .get(storage.api() + "locations")
      .then((res) => {
        return JSON.parse(res.data);
      });
  },

  postServiceRequest: async (service) => {
    return await storage.getUserData().then(async (userData) => {
      service.user_id = userData.id;
      return await storage.app.request.promise
        .post(storage.api() + "services", service)
        .then((res) => true);
    });
  },

  getServiceById: async (id) => {
    return await storage.getUserData().then(async (userData) => {
      return await storage.app.request.promise
        .get(storage.api() + "service/" + id)
        .then((res) => {
          let service = JSON.parse(res.data);
          service.timestamp = storage.dateDifference(service.created_at);
          service.created_at = storage.formatDateDifference(service.timestamp);
          service.user_id = Number(service.user_id);
          service.category_id = Number(service.category_id);
          service.location_id = Number(service.location_id);
          service.specification_id = Number(service.specification_id);
          service.status = Number(service.status);
          service.type = Number(service.type);
          service.hidden = Number(service.hidden);
          service.user = userData;

          return service;
        });
    });
  },

  getServiceComments: async (service_id) => {
    return await storage.app.request.promise
      .get(storage.api() + "service/" + service_id + "/comments")
      .then((res) => {
        let comments = JSON.parse(res.data).data;
        for (let i = 0; i < comments.length; i++) {
          comments[i].timestamp = storage.dateDifference(comments[i].date);
          comments[i].date = storage.formatDateDifference(
            comments[i].timestamp
          );
        }
        return comments;
      });
  },

  postCommentByServiceId: async (service_id, comment) => {
    return await storage.getUserData().then(async (userData) => {
      comment.user_id = userData.id;
      comment.user = userData.username;

      return await storage.app.request.promise
        .post(storage.api() + "service/" + service_id + "/comments", comment)
        .then((res) => true);
    });
  },
};

export { storage };
