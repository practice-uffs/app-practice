export class Checkin{
    constructor(app) {
        this.app = app;
        app.checkin = this;
    }

	async requestCheckin(url) {
		var self = this;
        var app = self.app;

    	return await app.request.promise.post(app.api.url + "checkin", {
        	'url': url,
    	}).then(async (res) => {
			let data = JSON.parse(res.data);
			return data;
    	}).catch(err => err);
    }
}