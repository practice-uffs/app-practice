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

    setConsent(consent) {
        localStorage["auraConsent"] = JSON.stringify(consent);
    }
    
    getConsent() {
        let data  = localStorage.getItem("auraConsent");
        return JSON.parse(data);
    }
}