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
            let data = JSON.parse(res.data);
            return data.answer;
        }).catch(err => err);
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
}