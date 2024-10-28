import startMonitor from "../historyHandler/main.js";

class EventService {

	monitors;

	constructor() {
		this.monitors = {};
	}

	async startEventMonitor(eventId, repeatTime, timeout) {
		this.monitors[`m${eventId}`] = await startMonitor(Number(eventId), repeatTime, timeout)
	}

	async stopEventMonitor(eventId) {
		clearInterval(this.monitors[`m${eventId}`])
		delete this.monitors[`m${eventId}`]
	}

}

export default new EventService();