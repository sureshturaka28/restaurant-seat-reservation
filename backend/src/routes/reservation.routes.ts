import { Router } from "express";
import {
  createReservation,
  getMyReservations,
  cancelMyReservation,
  getReservationsBySlot,
} from "../controllers/reservation.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createReservation);
router.get("/my", authMiddleware, getMyReservations);
router.delete("/:id", authMiddleware, cancelMyReservation);
router.get("/by-slot", authMiddleware, getReservationsBySlot);

export default router;
