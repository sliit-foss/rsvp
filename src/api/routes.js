import { Router } from "express";
import attendeeRouter from "./attendees/routes";
import eventsRouter from "./events/routes";
import authRouter from "./auth/routes";
import { handleHealthRequest } from "./health";

const router = Router();

router.get("/health", handleHealthRequest);
router.use("/user", attendeeRouter);
router.use("/events", eventsRouter);
router.use("/", authRouter);

export default router;
