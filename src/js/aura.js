export class Aura{
    constructor(app) {
        this.app = app;
        this.app.aura = this;
    }

    async requestAnswer(input) {
        var self = this;
        var app = self.app;

        let encodeInput = encodeURI(input);
        return await app.request.promise.get(app.api.url + "aura/nlp/qna/" + encodeInput)
		.then(async (res) => {
			if (typeof cordova !== 'undefined') {
				cordova.plugins.firebase.analytics.logEvent("aura", {
					"request_answer": input
				}).then(res => {
					console.log(`[${res}] aura: request_answer=${input}`);
				})
			}
            let data = JSON.parse(res.data);
            return data.answer;
        }).catch(err => err);
    }

    setConsent(consent) {
        localStorage["auraConsent"] = JSON.stringify(consent);
    }
    
    getConsent() {
        let data  = localStorage.getItem("auraConsent");
        return JSON.parse(data);
    }

    addMessageToChat(message) {
        var self = this;
        var app = self.app;
        const settings = app.storage.getSettings();
        if (!settings.offlineStorage) {
            return;
        }

        let chat = JSON.parse(localStorage.getItem("auraChat"));

        if (!chat) {
            chat = [];
        }
        if (chat.length >= 200) {
            chat.shift();
        }

        chat.push(message);

        localStorage["auraChat"] =  JSON.stringify(chat);
    }

    getChat() {
        let chat = JSON.parse(localStorage.getItem("auraChat"));
		return chat;
    }

    clearChat() {
        localStorage.removeItem("auraChat");
    }
}