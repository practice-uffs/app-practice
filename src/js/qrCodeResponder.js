export class QrCodeResponder {
    constructor(app) {
        this.app = app;
        app.qrCodeResponder = this;

        this.actionUrls = {
            "forms": new RegExp('(https?:\/\/)?(practice.uffs.edu.br\/forms)(.*)'),
            "mural": new RegExp('(https?:\/\/)?(practice.uffs.edu.br\/mural)(.*)'),
            "checkin": new RegExp('(https?:\/\/)?(practice.uffs.edu.br\/qr)(.*)'),
            "extUrl": new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'),
            "route": new RegExp('\/[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)?(\_[a-zA-Z0-9]+)?(\/)')
        }
    }

    async check (content){
        var self = this;
        var app = self.app;
        
        var data = {
            "route" : "",
            "extUrl" : "",
            "title" : "",
            "description" : ""
        }

        if (self.actionUrls.forms.test(content)) {
            console.log("link de formulário");
            data.route = "#";
            data.extUrl = content;
            data.title = content;
            data.description = "URL Formulário";
        } else if (self.actionUrls.mural.test(content)) {
            console.log("link de mural");
            data.route = "#";
            data.extUrl = content;
            data.title = content;
            data.description = "URL Mural";
        } else if (self.actionUrls.checkin.test(content)) {
            console.log("link de checkin");

            await app.checkin.requestCheckin(content).then((res) => {
                data.route = "#";
                data.extUrl = "#";
                data.description = content;
                if (res.is_valid) {
                    data.title = 'Check-in Realizado <span class="badge color-green">OK</span>';
                } else {
                    data.title = 'Erro ao realizar Check-in <span class="badge color-red">warning/error</span>';
                }
            }).catch(() => {
                app.dialog.alert("Ocorreu um erro inesperado, tente novamente!");
            });
        } else if (self.actionUrls.extUrl.test(content)) {
            console.log("link de extUrl");
            data.route = "#";
            data.extUrl = content;
            data.title = content;
            data.description = "URL Externa";
        } else if (self.actionUrls.route.test(content)) {
            console.log("link de route");
            data.route = content;
            data.extUrl = "";
            data.title = content;
            data.description = "Aba do App";
        } else {
            console.log("apenas string");
            data.route = "#";
            data.extUrl = "#";
            data.title = content;
            data.description = "Texto";
        }
        return data;
    }

}