export class Api {
    constructor(app) {
        this.app = app;
        this.app.api = this;

        const settings = this.app.storage.getSettings();
        if (settings.devMode && settings.testApi) {
            this.url = this.app.storage.testApiURL;
        } else {
            this.url = this.app.storage.prodApiURL;
        } 
    }

    async requestLogin(username, password) {
        var self = this;
        var app = self.app;

        return await app.request.promise.post(app.api.url + "auth", {
            "user": username,
            "password": password,
            "app_id": "1"
        }).then( async (res) => {
            let data = JSON.parse(res.data);
            app.storage.setUserData(data.user);
            if (data.passport) {
                app.storage.setUserCredentials(data);
                app.request.setup({
                    headers: {
                        Authorization: "Bearer " + data.passport,
                    },
                });
                const settings = app.storage.getSettings();
                if (settings.allowNotifications) {
                    await self.postFcmToken();
                }
                return true;
            } else {
                return false;
            }
        }).catch((err) => {
            return false;
        });
    };

    async requestLogout() {
        var self = this;
        var app = self.app;

        await self.deleteFcmToken();
        app.storage.removeAllButUserData();
        app.storage.clearUserCredentials();
        app.request.setup({
            headers: {
                Authorization: "",
            },
        });
        return true;
    };

    // News methods
    async getNews() {
        var self = this;
        var app = self.app;

        return await app.request.promise.get("https://practice.uffs.cc/feed.xml")
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
    };

    async requestUserData() {
        var self = this;
        var app = self.app;

        return await app.request.promise.post(app.api.url + "auth/me")
        .then((res) => {
            let data = JSON.parse(res.data);
            if(data.error){
                this.requestLogout().then(res => {
                    if (res) {
                        app.dialog.alert(
                            "Sessão expirada ou inválida, faça login novamente!"
                        );
                        app.views.main.router.navigate("/");
                    }
                });
                return;
            }
            const userData = JSON.parse(res.data);
            app.storage.setUserData(userData);
            return userData;
        });
    };

    async getServiceSpecifications(){
        var self = this;
        var app = self.app;

        return await app.request.promise.get(app.api.url + "specifications")
        .then((res) => {
            let data = JSON.parse(res.data);
            if(data.error){
                storage.requestLogout().then(res => {
                    if (!res) {
                        return;
                    }
                    app.dialog.alert("Sessão expirada ou inválida, faça login novamente!");
                    app.views.main.router.navigate("/");
                })
                return;
            }
            // Grouping services by category
            let service_specifications = JSON.parse(res.data);
            service_specifications = service_specifications.reduce((list, x) => {
                (list[x["category_id"]] = list[x["category_id"]] || []).push(x);
                return list;
            }, {});
            return service_specifications;
        });
    };

    async getRequestedServices(page = 1) {
        var self = this;
        var app = self.app;
        return await app.request.promise
        .get(app.api.url + "mural/orders?page="+page)
        .then((res) => {
            let data = JSON.parse(res.data);
            if(data.error){
                app.storage.requestLogout().then(res => {
                    if (!res) {
                        return;
                    }
                    app.dialog.alert("Sessão expirada ou inválida, faça login novamente!");
                    app.views.main.router.navigate("/");
                })
                return;
            }
            let services = JSON.parse(res.data).data;
            let servicesToSave = [];
            let toReturn = {
                services: [],
                meta: data.meta
            };
            
            for (let i = 0; i < services.length; i++) {
                servicesToSave[i] = {
                    id: services[i].id,
                    status: services[i].status,
                    title: services[i].title,
                    description: services[i].description,
                    created_at: services[i].created_at
                };
                
                toReturn.services[i] = services[i];
            }

            const settings = app.storage.getSettings();
            
            if (settings.offlineStorage) {
                app.storage.setRequestedServices(servicesToSave);
            }
            return toReturn;
        });
    };

    async getLocations(){
        var self = this;
        var app = self.app;
        
        return await app.request.promise.get(app.api.url + "locations").then((res) => {
            let data = JSON.parse(res.data);
            if(data.error){
                app.storage.requestLogout().then(res => {
                    if (!res) {
                        return;
                    }
                    app.dialog.alert("Sessão expirada ou inválida, faça login novamente!");
                    app.views.main.router.navigate("/");
                })
                return;
            }
            return JSON.parse(res.data);
        });
    };


    async postServiceRequest(service){
        var self = this;
        var app = self.app;

        return await app.storage.getUserData().then(async (userData) => {
            service.user_id = userData.id;
            return await app.request.promise.post(app.api.url + "services", service).then((res) => {
                let data = JSON.parse(res.data);
                if(data.error){
                    app.storage.requestLogout().then(res => {
                    if (!res) {
                        return;
                    }
                    app.dialog.alert("Sessão expirada ou inválida, faça login novamente!");
                    app.views.main.router.navigate("/");
                    })
                    return;
                }
                return true;
                });
        });
    };

    async getServiceById(id) {
        var self = this;
        var app = self.app;
        return await app.storage.getUserData().then(async (userData) => {
            return await app.request.promise
            .get(app.api.url + "mural/orders/" + id)
            .then((res) => {
                let data = JSON.parse(res.data);
                if(data.error){
                    app.storage.requestLogout().then(res => {
                        if (!res) {
                            return;
                        }
                        app.dialog.alert("Sessão expirada ou inválida, faça login novamente!");
                        app.views.main.router.navigate("/");
                    })
                    return;
                }
                let service = JSON.parse(res.data);
                
                service.comments.forEach(comment => {
                    comment.user_name = comment.user_id != userData.id ? "Equipe PRACTICE" : userData.name;
                    comment.created_at = new Date(comment.created_at).toLocaleDateString("pt-br", {timeZone: 'UTC'});
                });
                
                service.requested_due_date = new Date(service.requested_due_date).toLocaleDateString("pt-br", {timeZone: 'UTC'});
                service.user = userData;

                const settings = app.storage.getSettings();
                
                if (settings.offlineStorage && !service.error) {
                    app.storage.setServiceDetails(service);
                }
                return service;
            });
        });
    };

    async getServiceComments(service_id){
        var self = this;
        var app = self.app;

        return await app.request.promise.get(app.api.url + "service/" + service_id + "/comments").then((res) => {
            let data = JSON.parse(res.data);
            if(data.error){
                app.storage.requestLogout().then(res => {
                    if (!res) {
                        return;
                    }
                    app.dialog.alert("Sessão expirada ou inválida, faça login novamente!");
                    app.views.main.router.navigate("/");
                });
                return;
            }
            let comments = JSON.parse(res.data).data;
            for (let i = 0; i < comments.length; i++) {
                comments[i].timestamp = app.storage.dateDifference(comments[i].date);
                comments[i].date = app.storage.formatDateDifference(comments[i].timestamp);
            }
            const settings = app.storage.getSettings();

            if (settings.offlineStorage && !comments.error) {
                app.storage.setServiceComments(service_id, comments);
            }
            return comments;
        });
    };

    async postCommentByServiceId(service_id, comment){
        var self = this;
        var app = self.app;

        return await app.storage.getUserData().then(async (userData) => {
            comment.user_id = userData.id;
            comment.user = userData.username;

            return await app.request.promise.post(app.api.url + "service/" + service_id + "/comments", comment).then((res) => {
                let data = JSON.parse(res.data);
                if(data.error){
                    app.storage.requestLogout().then(res => {
                        if (!res) {
                            return;
                        }
                        app.dialog.alert("Sessão expirada ou inválida, faça login novamente!");
                        app.views.main.router.navigate("/");
                    });
                    return;
                }
                return true;
            });
        });
    };

    async postFcmToken(){
        var self = this;
        var app = self.app;

        document.addEventListener('deviceready', () => {
            cordova.plugins.firebase.messaging.getToken().then(async function(token) {
                app.storage.setFcmToken(token);
                const data = {
                    fcm_token: token
                }

                return await storage.app.request.promise.post(app.api.url + "user/channels", data).then( async (res) => {
                    let responseData = JSON.parse(res.data)
                    if(!responseData.id) {
                        return await self.updateFcmToken();
                    }
                }).catch(async (err) => {
                    return await self.updateFcmToken();
                })
            });
        });
    };

    async updateFcmToken(){
        var self = this;
        var app = self.app;

        document.addEventListener('deviceready', async () => {
            cordova.plugins.firebase.messaging.getToken().then(async function (token) {
                app.storage.setFcmToken(token);
                const data = {
                    fcm_token: token
                }
                let userToken = JSON.parse(localStorage["userCredentials"]);
                userToken = "Bearer " + userToken.passport;

                return await app.request.promise({
                    url: app.api.url + "user/channels",
                    method: "PATCH",
                    contentType: "application/json",
                    headers: {
                        Authorization: userToken
                    },
                    data: data,
                }).then((res) => {
                    let responseData = JSON.parse(res.data)
                    if (responseData.error) {
                        app.dialog.alert("Não foi possível ativar as notificações para este dispositivo, tente novamente mais tarde!");
                    }
                }).catch(() => {
                    app.dialog.alert("Não foi possível ativar as notificações para este dispositivo, tente novamente mais tarde!");
                });
            });   
        });
    };

    async deleteFcmToken(){
        var self = this;
        var app = self.app;

        document.addEventListener('deviceready', async () => {
            let userToken = JSON.parse(localStorage["userCredentials"]);
            userToken = "Bearer " + userToken.passport;
            app.storage.removeFcmToken();
            return await app.request.promise({
                url: app.api.url+"user/channels",
                method: "DELETE",
                headers: {
                    Authorization: userToken
                }
            });
        });
    };
};