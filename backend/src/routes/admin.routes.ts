import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminMiddleware from "../middleware/admin.middleware";
import {
  getAllReservations,
  getReservationsByDate,
  cancelReservationByAdmin,
  updateReservationByAdmin,
  getTables,
  createTable,
  deleteTable,
  toggleReservationStatusByAdmin,
  updateTableByAdmin,
  createReservationByAdmin
} from "../controllers/admin.controller";

const router = Router();


router.use(authMiddleware, adminMiddleware);

// RESERVATIONS 
router.get("/reservations", getAllReservations);

router.get(
  "/reservations/by-date",
  getReservationsByDate
);

router.patch(
  "/reservations/:id",
  updateReservationByAdmin
);

router.delete(
  "/reservations/:id",
  cancelReservationByAdmin
);

//  TABLE 
router.get("/tables", getTables);
router.post("/tables", createTable);
router.delete("/tables/:id", deleteTable);
router.post("/reservations", createReservationByAdmin);
router.patch(
  "/reservations/:id/status",
  toggleReservationStatusByAdmin
);

router.patch("/tables/:id", updateTableByAdmin);


export default router;
