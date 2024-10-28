import {
	closeMonitor,
	createCoefsTable,
	eventIdInput,
	getEventHistory,
	getMarketNames,
	monitor,
	monitorContainer,
	monitorRangeInput,
	parseDataHistory,
	repeatTimeInput,
	showMonitor,
	showMonitors,
	startMonitor,
	stripperShow,
	timeMarker,
	timeoutInput,
} from "./variables.js"

const monitors = {}
let timeStamps = [];
let marketNames = [];
let coefsHistory = [];

// Consts
const apiUrl = "http://localhost:8800/api"

let stripperToggle = false;
const stripperImgFirst = "assets/stripper-show.gif"
const stripperImgSecond = "assets/stripper-at-the-wall.gif"

// Stripper element
const stripper = document.createElement("img")
stripper.src = stripperImgFirst
stripper.style.width = "19%"
stripper.style.height = "100%"
stripper.style.borderRadius = "30px"
stripper.style.boxShadow = "0 0 20px 5px white"

stripper.addEventListener("click", function () {
	if ((new RegExp(stripperImgFirst)).test(this.src)) {
		this.src = stripperImgSecond
	} else {
		this.src = stripperImgFirst
	}
})

// Filtering user input
function filterInput() {
	this.value = this.value.replace(/[^0-9]/g, "");
	if (this.value === "") {
		this.value = this.defaultValue
	}
}

eventIdInput.addEventListener("input", filterInput)
repeatTimeInput.addEventListener("input", filterInput)
timeoutInput.addEventListener("input", filterInput)

// Configuring monitor range input
monitorRangeInput.addEventListener("input", event => {
	timeMarker.innerText = timeStamps[event.target.value]

	createCoefsTable(monitor, marketNames, coefsHistory, event.target.value)
})

// Configuring buttons
startMonitor.addEventListener("click", async () => {
	const eventId = eventIdInput.value
	try {
		if (monitors.hasOwnProperty((`m${eventId}`))) {
			alert(`Monitor already started! (monitor id: ${eventId})`)
		} else {
			const response = await fetch(`${apiUrl}/start-event-monitor/${eventId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"repeatTime": repeatTimeInput.value,
					'timeout': timeoutInput.value
				})
			})
			monitors[`m${eventId}`] = eventId

			const message = await response.text()
			alert(message)
		}
	} catch (error) {
		console.log(error)
	}
})

closeMonitor.addEventListener("click", async () => {
	const eventId = eventIdInput.value
	try {
		if (!monitors.hasOwnProperty((`m${eventId}`))) {
			alert(`Monitor not found! (monitor id: ${eventId})`)
		} else {
			const response = await fetch(`${apiUrl}/stop-event-monitor/${monitors[`m${eventId}`]}`, {
				method: "POST"
			})
			delete monitors[`m${eventId}`]

			const message = await response.text()
			alert(message)
		}
	} catch (error) {
		console.log(error)
	}
})

showMonitors.addEventListener("click", () => {
	console.log(monitors)
})

showMonitor.addEventListener("click", async () => {
	const [dataHistory, folder, files] = await getEventHistory()

	timeStamps = files.map(timeStamp => {
		const time = timeStamp.replace(/\.json$/, "").split("-")
		return `${time[0]}/${time[1]}/${time[2]} - ${time[4]}:${time[5]}:${time[6]}`
	})
	timeMarker.innerText = timeStamps[0]


	marketNames = getMarketNames(dataHistory[0].result[0].head_markets)
	coefsHistory = parseDataHistory(dataHistory, marketNames)

	monitorRangeInput.max = coefsHistory.length - 1;
	monitorRangeInput.value = 0;

	createCoefsTable(monitor, marketNames, coefsHistory)
})

stripperShow.addEventListener("click", () => {

	stripperToggle = !stripperToggle

	if (stripperToggle) {
		monitorContainer.appendChild(stripper)
	} else {
		monitorContainer.removeChild(stripper)
	}

})