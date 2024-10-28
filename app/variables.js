// Get control elements
export const eventIdInput = document.getElementById("event__id__input")
export const repeatTimeInput = document.getElementById("repeat__time__input")
export const timeoutInput = document.getElementById("timeout__input")
export const monitorRangeInput = document.getElementById("monitor__range__input")
export const timeMarker = document.getElementById("time__marker")

export const startMonitor = document.getElementById("start__monitor__button")
export const closeMonitor = document.getElementById("close__monitor__button")
export const showMonitor = document.getElementById("show__monitor__button")
export const showMonitors = document.getElementById("monitors")
export const stripperShow = document.getElementById("stripper__button")

// Get monitor
export const monitorContainer = document.getElementById("monitor__container")
export const monitor = document.getElementById("monitor")

// Utils
export const fetchFolder = async (path, { fetchFiles = false, startsWithRegExp = "" } = {}) => {
	const response = await fetch(path)
	const htmlString = await response.text()
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, "text/html");

	const folder = [...doc.querySelectorAll('a')]
		.map(link => link.innerText)
		.filter(innerText => fetchFiles ?
			innerText.endsWith(".json") :
			startsWithRegExp !== "" && innerText.startsWith(startsWithRegExp)
		)

	return folder
}

export const getEventHistory = async () => {
	const folder = await fetchFolder("data/", { startsWithRegExp: eventIdInput.value })

	let files = []

	if (folder.length > 0) {
		files = await fetchFolder(`data/${folder[0]}`, { fetchFiles: true })
	}

	const dataHistoryPromises = files.map(async (event) => {
		const response = await fetch(`data/${folder}${event}`)
		const data = await response.json()

		return data;
	})

	const dataHistory = await Promise.all(dataHistoryPromises)

	return [dataHistory, folder, files];
}

export const getMarketNames = (markets) => markets.reduce((marketNames, { market_name }) => {
	if (marketNames.length === 0) {
		marketNames.push(market_name)
	} else {
		if (!marketNames.includes(market_name)) {
			marketNames.push(market_name)
		}
	}

	return marketNames
}, [])

export const parseDataHistory = (dataHistory, marketNames) => dataHistory.map(dataSet => {

	const markets = dataSet.result[0].head_markets;

	const marketCollection = marketNames.reduce((marketCollection, name) => {
		marketCollection[name] = [];
		return marketCollection;
	}, {});

	markets.forEach(market => {
		const marketIndex = marketNames.indexOf(market.market_name);
		marketCollection[market.market_name].push(markets[marketIndex].outcomes)
	})

	return marketCollection
})

export const createCoefsTable = (monitor, marketNames, coefsHistory, dataSetIndex = 0) => {
	const marketElements = marketNames.map((name) => {
		const coefElements = coefsHistory[dataSetIndex][name].map(coefsLine => {
			// Coef container element
			const coefsContainer = document.createElement("div")
			coefsContainer.style.display = "flex"
			coefsContainer.style.width = "100%"
			coefsContainer.style.marginTop = "10px"

			const coefsChildren = coefsLine.map(coef => {
				// Coef child element
				const coefChild = document.createElement("div")
				coefChild.style.display = "flex"
				coefChild.style.justifyContent = "space-between"
				coefChild.style.backgroundColor = "#313131"
				coefChild.style.width = "100%"
				coefChild.style.borderRadius = "10px"
				coefChild.style.padding = "4px 8px"
				coefChild.style.margin = "0 5px"

				// Coef name element
				const coefName = document.createElement("span")
				coefName.innerText = coef.outcome_name

				// Coef value element
				const coefValue = document.createElement("span")
				coefValue.innerText = coef.outcome_coef

				coefChild.appendChild(coefName)
				coefChild.appendChild(coefValue)
				return coefChild
			})

			coefsChildren.forEach(coefChild => coefsContainer.appendChild(coefChild))

			return coefsContainer
		})
		const element = document.createElement("div");
		element.style.display = "flex"
		element.style.flexDirection = "column"
		element.style.justifyContent = "start"
		element.style.width = "50%"
		element.style.padding = "10px"

		const title = document.createElement("div")
		title.innerText = name
		title.style.textAlign = "center"
		title.style.verticalAlign = "center"


		element.appendChild(title)
		coefElements.forEach(coefsContainer => element.appendChild(coefsContainer))

		return element
	})

	while (monitor.children.length > 0) {
		monitor.removeChild(monitor.lastChild)
	}

	marketElements.forEach(element => monitor.appendChild(element))
}

export const updateMonitorInfo = () => {

}