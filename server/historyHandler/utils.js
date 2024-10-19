import fs from "fs"

export const formatedDate = () => {
	const date = new Date(); // Get date
	const year = date.getFullYear(); // Get the full year
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-11) and pad with leading zero
	const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with leading zero
	const hours = String(date.getHours()).padStart(2, '0'); // Get the hours and pad with leading zero
	const minutes = String(date.getMinutes()).padStart(2, '0'); // Get the minutes and pad with leading zero
	const seconds = String(date.getSeconds()).padStart(2, '0'); // Get the seconds and pad with leading zero

	// Return formatted date string
	return `${year}-${month}-${day}--${hours}-${minutes}-${seconds}`;
}

export const fetchEvent = async (page, body, options) => await page.evaluate(async ({ body, options }) => {
	try {
		const response = await fetch("https://www.favbet.ua/service/lineout/frontend_api2/", {
			method: "POST",
			body: JSON.stringify(body),
			...options
		})
		const data = await response.json()
		return data
	} catch (error) {
		return error
	}
}, { body, options })

export const saveEventData = (eventId, eventData) => {
	const folderPath = `data/${eventId}`;

	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true })
	}

	const currentTime = formatedDate()

	fs.writeFileSync(`${folderPath}/${currentTime}.json`, JSON.stringify(eventData, null, "\t"))
}