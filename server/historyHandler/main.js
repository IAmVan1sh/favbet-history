import { firefox } from "playwright"
import { fetchConfig, tournamentDataConfig, tournamentIDConfig } from "./config.js";
import { fetchEvent, saveEventData } from "./utils.js";

const startMonitor = async (id, repeatTime = 10, timeout = 0) => {

	const browser = await firefox.launch()
	const context = await browser.newContext()
	const page = await context.newPage()

	await page.goto("https://www.favbet.ua/uk/sports/sport/soccer/", {
		waitUntil: "load"
	})

	if (id) {
		tournamentIDConfig.params.by.event_id = id
	}

	const monitor = async () => {
		try {
			console.log("Fetching event (id): ", tournamentIDConfig.params.by.event_id)

			const { result: [{ tournament_id: tournamentId }] } = await fetchEvent(page, tournamentIDConfig, fetchConfig)

			// Resigning tournament_id
			tournamentDataConfig.params.by.tournament_id.$in = [tournamentId]

			// Fetching event's head_markets
			const eventData = await fetchEvent(page, tournamentDataConfig, fetchConfig)

			// Filter response
			if (eventData) {
				eventData.result = eventData.result.filter(event =>
					event.event_id === tournamentIDConfig.params.by.event_id && event.tournament_id === tournamentId
				)
			}

			saveEventData(tournamentIDConfig.params.by.event_id, eventData)
		} catch (error) {
			console.log(error)
		}
	}

	await monitor();

	const interval = setInterval(monitor, repeatTime * 1000)

	if (timeout > 0) {
		setTimeout(() => {
			clearInterval(interval)
			return 0;
		}, timeout * 1000)
	}

	return interval
}

export default startMonitor