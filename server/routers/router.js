import { Router } from "express";
import EventController from "../controllers/EventController.js";

const router = new Router();

router.post("/start-event-monitor/:id", EventController.startEventMonitor)
router.post("/stop-event-monitor/:id", EventController.stopEventMonitor)
router.get("/get-event-info/:id", EventController.getEventInfo)

export default router;