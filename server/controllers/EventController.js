import EventService from "../services/EventService.js";

class EventController {

	async startEventMonitor(req, res) {
		try {
			const { repeatTime, timeout } = req.body
			await EventService.startEventMonitor(req.params.id, repeatTime, timeout)
			res.send(`Monitor seccessfully started! (monitor id: ${req.params.id})`)
		} catch (error) {
			res.error(error)
		}
	}

	async stopEventMonitor(req, res) {
		try {
			EventService.stopEventMonitor(req.params.id)
			res.send(`Monitor seccessfully stopped! (monitor id: ${req.params.id})`)
		} catch (error) {
			res.error(error)
		}
	}

}

export default new EventController();