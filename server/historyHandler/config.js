export const tournamentIDConfig = {
	"jsonrpc": "2.0",
	"id": 1,
	"method": "frontend/event/get",
	"params": {
		"by": {
			"lang": "uk",
			"head_markets": true,
			"event_id": 1000000
		}
	}
};

export const tournamentDataConfig = {
	"jsonrpc": "2.0",
	"id": 2,
	"method": "frontend/event/get",
	"params": {
		"by": {
			"lang": "uk",
			"head_markets": true,
			"service_id": 0,
			"tournament_id": {
				"$in": [10000]
			}
		}
	}
}

export const fetchConfig = {
	headers: {
		"Content-Type": "application/json",
	}
}