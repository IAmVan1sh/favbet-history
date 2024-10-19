import startMonitor from "../historyHandler/main";
import fs from "fs"

class EventService {

	async startEventMonitor(eventId) {
		return await startMonitor(eventId)
	}

	async stopEventMonitor(eventIntervalId) {
		clearInterval(eventIntervalId)
	}

	async getEventInfo(directoryPath) {
		const path = "../historyHandler/data"
		const entities = fs.readdirSync(directoryPath, { withFileTypes: true })

	}

}

export default new EventService();
