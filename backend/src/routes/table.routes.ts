import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getTables } from "../controllers/table.controller";

const router = Router();

router.get("/", authMiddleware, getTables);

export default router;
