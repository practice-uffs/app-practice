export class Storage{
	constructor(app) {
		this.prodApiURL = "https://mural.practice.uffs.cc/api/";
		this.testApiURL = "https://practice.uffs.edu.br/api/v0/";
		this.app = app;
		app.storage = this;
	}

	// Value processing methods
	dateDifference(date){
		date = new Date(date);
		const now = new Date();
		return now - date;
	};

	formatDateDifference(difference){
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
	};

	formatDate(date){
		date = date.split(" ");
		date = new Date(Date.parse(date[2] + " " + date[1] + ", " + date[3]));

		const options = { year: "numeric", month: "long", day: "numeric" };
		date = date.toLocaleDateString(undefined, options);

		return date.toUpperCase().charAt(0).toUpperCase() + date.slice(1);
	};

	processHTML(input){
		var e = document.createElement("div");
		e.innerHTML = input;
		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	};

	// LocalStorage methods
	clearAll(){
		localStorage.clear();
	};

	removeAllButUserData(){
		const settings = JSON.parse(localStorage.getItem("settings"));
		const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
		const userData = JSON.parse(localStorage.getItem("userData"));

		localStorage.clear();

		this.setUserCredentials(userCredentials);
		this.setSettings(settings);
		this.setUserData(userData);
	};

	// Settings methods
	getSettings(){
		let settings = localStorage["settings"];

		if (!settings) {
			const env = process.env.NODE_ENV || 'development';
			if (env == 'production') {
				settings = {
					offlineStorage: true,
					allowNotifications: true,
					// Dev options
					devMode: false,
					testApi: false,
				};
			} else {
				settings = {
					offlineStorage: true,
					allowNotifications: true,
					// Dev options
					devMode: true,
					testApi: true,
				};
			}
			localStorage["settings"] = JSON.stringify(settings);
		} else {
			settings = JSON.parse(settings);
		}

		return settings;
	};

	setSettings(settings){
		localStorage["settings"] = JSON.stringify(settings);
	};

	// User credentials methods
	getUserCredentials(){
		var self = this;
		var app = self.app;
		
		let userCredentials = localStorage["userCredentials"];

		if (userCredentials) {
			userCredentials = JSON.parse(userCredentials);
			app.request.setup({
				headers: {
					Authorization: "Bearer " + userCredentials.passport,
				},
			});
			return userCredentials;
		} else {
			app.request.setup({
				headers: {
					Authorization: "",
				},
			});
			return false;
		}
	};

	setUserCredentials(userCredentials){
		localStorage["userCredentials"] = JSON.stringify(userCredentials);
	};

	clearUserCredentials(){
		localStorage.removeItem("userCredentials");
		localStorage.removeItem("userData");
	};

	// User data methods
	async getUserData(){
		var self = this;
		var app = self.app;

		let userData = localStorage["userData"];

		if (!userData) {
			return await app.api.requestUserData();
		} else {
			return JSON.parse(userData);
		}
	};

	setUserData(userData){
		localStorage["userData"] = JSON.stringify(userData);
	};

	// Audio recording methods
	getRecordings(){
		let recordings = localStorage["recordings"];

		if (!recordings) {
			recordings = [];
			localStorage["recordings"] = JSON.stringify(recordings);
		} else recordings = JSON.parse(recordings);

		return recordings;
	};

	addRecording(recording){
		let recordings = localStorage["recordings"];

		if (!recordings) recordings = [];

		recordings = JSON.parse(recordings);
		recordings.push(recording);

		localStorage["recordings"] = JSON.stringify(recordings);
	};

	clearRecordings(){
		localStorage.removeItem("recordings");
	};

	// Services methods
	setRequestedServices(services){
		localStorage["requestedServices"] = JSON.stringify(services);
	};

	getRequestedServicesFromLocalstorage(){
		let services = localStorage.getItem("requestedServices");
		return JSON.parse(services);
	};

	setServiceDetails(service){
		let storagedService = localStorage.getItem("serviceDetails"+service.id);
		storagedService = JSON.parse(storagedService);
		localStorage["serviceDetails"+service.id] =  JSON.stringify({...storagedService, service: service});
	};

	getServiceDetailsFromLocalstorage(service_id){
		let service = localStorage.getItem("serviceDetails"+service_id);
		service = JSON.parse(service);
		if (service) {
			return service.service;
		}
	};

	setServiceComments(service_id, comments){
		let service = localStorage.getItem("serviceDetails"+service_id);
		service = JSON.parse(service);
		service = {...service, comments: comments};
		localStorage["serviceDetails"+service_id] =  JSON.stringify(service);
	};

	getServiceCommentsFromLocalstorage(service_id){
		let serviceDetails = localStorage.getItem("serviceDetails"+service_id);
		serviceDetails = JSON.parse(serviceDetails);
		if (serviceDetails) {
			return serviceDetails.comments;
		}
	};

	setFcmToken(fcmToken){
		localStorage["fcmToken"] = JSON.stringify(fcmToken);
	};

	removeFcmToken(){
		localStorage.removeItem("fcmToken");
	};
};