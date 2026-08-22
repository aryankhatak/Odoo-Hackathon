import { Router } from "express";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";

const router: Router = Router();

// ── Itinerary ───────────────────────────────────────────────────────────

// GET /api/trips/:id/itinerary — day-wise itinerary view
router.get("/:id/itinerary", authMiddleware, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);

  const trip = await prisma.trip.findFirst({
    where: { id, userId: req.userId! },
    include: {
      stops: {
        orderBy: { orderIndex: "asc" },
        include: {
          city: true,
          stopActivities: {
            orderBy: [{ scheduledDate: "asc" }, { scheduledTime: "asc" }],
            include: { activity: true },
          },
        },
      },
    },
  });
  if (!trip) return res.status(404).json({ error: "Trip not found" });

  const itinerary = trip.stops.map((stop) => {
    const dayGroups: Record<string, any[]> = {};
    for (const sa of stop.stopActivities) {
      const dayKey = new Date(sa.scheduledDate).toISOString().split("T")[0]!;
      if (!dayGroups[dayKey]) dayGroups[dayKey] = [];
      dayGroups[dayKey].push({
        id: sa.id,
        activity: sa.activity,
        scheduledDate: sa.scheduledDate,
        scheduledTime: sa.scheduledTime,
        costOverride: sa.costOverride,
      });
    }
    return {
      id: stop.id,
      city: stop.city,
      startDate: stop.startDate,
      endDate: stop.endDate,
      orderIndex: stop.orderIndex,
      days: dayGroups,
    };
  });

  res.json({
    trip: {
      id: trip.id,
      name: trip.name,
      startDate: trip.startDate,
      endDate: trip.endDate,
    },
    itinerary,
  });
});

// ── Budget ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  "sightseeing",
  "food",
  "adventure",
  "culture",
  "other",
] as const;

// GET /api/trips/:id/budget — cost aggregation by category + daily cost array
router.get("/:id/budget", authMiddleware, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);

  const trip = await prisma.trip.findFirst({
    where: { id, userId: req.userId! },
    include: {
      stops: {
        orderBy: { orderIndex: "asc" },
        include: {
          city: true,
          stopActivities: { include: { activity: true } },
        },
      },
    },
  });
  if (!trip) return res.status(404).json({ error: "Trip not found" });

  const categoryTotals: Record<string, number> = {};
  for (const cat of CATEGORIES) categoryTotals[cat] = 0;

  // Build a daily cost map covering every day of the trip
  const dailyCosts: Record<string, number> = {};
  const tripStart = new Date(trip.startDate);
  const tripEnd = new Date(trip.endDate);
  for (let d = new Date(tripStart); d <= tripEnd; d.setDate(d.getDate() + 1)) {
    dailyCosts[d.toISOString().split("T")[0]!] = 0;
  }

  for (const stop of trip.stops) {
    // Per-day stay / transport estimate: city.costIndex applied each night
    const start = new Date(stop.startDate);
    const end = new Date(stop.endDate);
    const nights = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    );
    const dailyStay = Number(stop.city.costIndex);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split("T")[0]!;
      if (dailyCosts[key] !== undefined) {
        dailyCosts[key] += dailyStay;
      }
    }

    // Activity costs
    for (const sa of stop.stopActivities) {
      const cat = sa.activity.category || "other";
      const cost =
        sa.costOverride != null
          ? Number(sa.costOverride)
          : Number(sa.activity.cost);
      categoryTotals[cat] = (categoryTotals[cat] || 0) + cost;

      const dayKey = new Date(sa.scheduledDate).toISOString().split("T")[0]!;
      if (dailyCosts[dayKey] !== undefined) {
        dailyCosts[dayKey] += cost;
      }
    }
  }

  const dailyCostArray = Object.entries(dailyCosts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, cost]) => ({
      date,
      cost: Math.round(cost * 100) / 100,
    }));

  const grandTotal =
    Math.round(dailyCostArray.reduce((sum, d) => sum + d.cost, 0) * 100) / 100;

  res.json({
    categoryTotals,
    dailyCosts: dailyCostArray,
    grandTotal,
  });
});

export default router;
