import fs from "fs"

const dataStringified = fs.readFileSync("data/41317643/2024-10-15--11-48-28.json", "utf-8");
const data = JSON.parse(dataStringified)

const markets = data.result[0].head_markets

if (markets) {
	markets.forEach(market => {
		console.log("Name: " + market.market_name)
		if (market.outcomes) {
			market.outcomes.forEach(coef => {
				console.log(coef.outcome_name + " : " + coef.outcome_coef)
			})
		} else {
			console.log("No coefs was found")
		}
	})
}