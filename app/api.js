import { closeMonitor, eventIdInput, monitorContainer, showMonitor, showMonitors, startMonitor, stripperShow } from "./variables.js"

// Vars
const apiUrl = "http://localhost:8800/api"

const monitors = {}

let stripperToggle = false;
const stripperImgFirst = "assets/stripper-show.gif"
const stripperImgSecond = "assets/stripper-at-the-wall.gif"

// Stripper element
const stripper = document.createElement("img")
stripper.src = stripperImgFirst
stripper.style.width = "20%"
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
eventIdInput.addEventListener("input", function () {
	this.value = this.value.replace(/[^0-9]/g, "");
})

// Configuring buttons
startMonitor.addEventListener("click", async () => {
	const eventId = eventIdInput.value
	try {
		if (monitors[`m${eventId}}`]) {
			alert(`Monitor already started! (monitor id: ${eventId})`)
		} else {
			const response = await fetch(`${apiUrl}/start-event-monitor/${eventId}`, {
				method: "POST"
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

showMonitor.addEventListener("click", () => { })

stripperShow.addEventListener("click", () => {

	stripperToggle = !stripperToggle

	if (stripperToggle) {
		monitorContainer.appendChild(stripper)
	} else {
		monitorContainer.removeChild(stripper)
	}

})

showMonitors.addEventListener("click", () => {
	console.log(monitors)
})