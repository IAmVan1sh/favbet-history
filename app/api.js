// Vars
let stripperToggle = false;
const stripperImgFirst = "assets/stripper-show.gif"
const stripperImgSecond = "assets/stripper-at-the-wall.gif"

// Get control elements
const eventIdInput = document.getElementById("event__id__input");
const startMonitor = document.getElementById("start__monitor__button")
const closeMonitor = document.getElementById("close__monitor__button")
const showMonitor = document.getElementById("show__monitor__button")
const stripperShow = document.getElementById("stripper__button")

// Get monitor
const monitorContainer = document.getElementById("monitor__container")
const monitor = document.getElementById("monitor")

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
startMonitor.addEventListener("click", () => { })

closeMonitor.addEventListener("click", () => { })

showMonitor.addEventListener("click", () => { })

stripperShow.addEventListener("click", () => {

	stripperToggle = !stripperToggle

	if (stripperToggle) {
		monitorContainer.appendChild(stripper)
	} else {
		monitorContainer.removeChild(stripper)
	}

})