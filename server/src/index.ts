import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
import authRoutes from "./routes/auth.js";
import meRoutes from "./routes/me.js";
import tripRoutes from "./routes/trips.js";
import stopRoutes from "./routes/stops.js";
import cityRoutes from "./routes/cities.js";
import activityRoutes from "./routes/activities.js";
import stopActivityRoutes from "./routes/stopActivities.js";
import itineraryRoutes from "./routes/itinerary.js";
import sharingRoutes from "./routes/sharing.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", message: (err as Error).message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api", meRoutes);
app.use("/api", cityRoutes);
app.use("/api", activityRoutes);
app.use("/api", sharingRoutes);
app.use("/api/saved", savedRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api", stopRoutes);
app.use("/api", stopActivityRoutes);
app.use("/api/trips", itineraryRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
