import express from "express"
import router from "./routers/Router.js";
import cors from "cors"

const PORT = 8800;
const server = express();

server.use(express.json());
server.use(cors())
server.use("/api", router);

(async () => {
	try {
		server.listen(PORT, () => console.log("Server started on port: ", PORT))
	} catch (error) {
		console.error(error)
	}
})()