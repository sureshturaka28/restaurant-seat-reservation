import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import reservationRoutes from "./routes/reservation.routes";
import adminRoutes from "./routes/admin.routes";
import tableRoutes from "./routes/table.routes";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/reservations", reservationRoutes);
app.use("/admin", adminRoutes);

app.use("/tables", tableRoutes);

export default app;
