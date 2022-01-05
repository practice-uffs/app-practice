/**
 * Analytics with a grain of salt. Integrates Google Analytics into Framework7.
 * 
 * @author Fernando Bevilacqua <dovyski@gmail.com>
 * @license MIT
 */

export class Abalytics{
	constructor(app) {
		this.app = app;
		app.abalytics = this;
		var self = this;

		self.addScreenTracking();
		self.addTabTracking();
		cordova.plugins.firebase.analytics.setEnabled(true);
	};

	trackScreenView(screenName) {
		var self = this;

		self.track('event', 'screen_view', {
			'screen_name': screenName
		});
	};

	trackTabView(tabName) {
		var self = this;

		self.track('event', 'tab_view', {
			'tab_name': tabName
		});
	};

	addScreenTracking() {
		var self = this;
		var app = self.app;

		app.$$(document).on('page:afterin', function (e) {
			var page = e.detail;

			if (!page || page.direction != 'forward') {
				return;
			}

			self.trackScreenView(page.name);
		});
	};

	addTabTracking() {
		var self = this;
		var app = self.app;

		app.$$(document).on('tab:mounted', function (e) {
			var tab = e.detail;

			if (!tab) {
				return;
			}

			self.trackTabView(tab.id);
		});
	};

	track(type, label, data) {
		if (type != 'event') {
			console.error('invalid event type: ' + type);
			return;
		}

		cordova.plugins.firebase.analytics.logEvent(label, data).then(res => {
			console.log(`[${res}] event: ${label} | `, data);
		});
		if (label == "screen_view") {
			cordova.plugins.firebase.analytics.setCurrentScreen(data.screen_name).then(res => {
				console.log(`[${res}] set current screen: ${data.screen_name}`);
			});
		}

		// | DISABLED |

		// var payload = {
		// 	uuid: Abalytics.getUUI() + (app.device.cordova ? '-c' : '-w'),
		// 	type: type,
		// 	label: label,
		// 	data: data
		// };

		// app.request.post('https://api.app.practice.uffs.cc/v0/analytics', payload, function (data) {
		// 	console.debug('[Abalytics] Payload sent to API: ', data);
		// });
	};
}