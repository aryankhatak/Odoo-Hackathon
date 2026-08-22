import { Router } from "express";
import crypto from "crypto";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";

const router: Router = Router();

// POST /api/trips/:id/share — generate a public share link (owner only)
router.post("/trips/:id/share", authMiddleware, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);

  const trip = await prisma.trip.findFirst({
    where: { id, userId: req.userId! },
  });
  if (!trip) return res.status(404).json({ error: "Trip not found" });

  const slug = trip.shareSlug ?? crypto.randomBytes(8).toString("base64url");

  const updated = await prisma.trip.update({
    where: { id },
    data: { isPublic: true, shareSlug: slug },
  });

  res.json({ shareSlug: updated.shareSlug, isPublic: true });
});

// GET /api/public/trips/:slug — read-only full itinerary (no auth)
router.get("/public/trips/:slug", async (req, res) => {
  const slug = req.params.slug as string;

  const trip = await prisma.trip.findFirst({
    where: { shareSlug: slug, isPublic: true },
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
  if (!trip) return res.status(404).json({ error: "Shared trip not found" });

  res.json({ trip });
});

// POST /api/public/trips/:slug/copy — copy a shared trip into your own account (requires auth)
router.post(
  "/public/trips/:slug/copy",
  authMiddleware,
  async (req: AuthRequest, res) => {
    const slug = req.params.slug as string;

    const sharedTrip = await prisma.trip.findFirst({
      where: { shareSlug: slug, isPublic: true },
      include: {
        stops: {
          orderBy: { orderIndex: "asc" },
          include: { stopActivities: true },
        },
      },
    });
    if (!sharedTrip) {
      return res.status(404).json({ error: "Shared trip not found" });
    }

    // Create the new trip
    const newTrip = await prisma.trip.create({
      data: {
        userId: req.userId!,
        name: `${sharedTrip.name} (Copy)`,
        startDate: sharedTrip.startDate,
        endDate: sharedTrip.endDate,
        description: sharedTrip.description,
        coverPhotoUrl: sharedTrip.coverPhotoUrl,
      },
    });

    // Copy stops and their activities, remapping stop IDs
    const oldToNewStopId: Record<number, number> = {};
    const sharedStops = (sharedTrip as any).stops as Array<{
      id: number; cityId: number; startDate: Date; endDate: Date; orderIndex: number;
      stopActivities: Array<{ activityId: number; scheduledDate: Date; scheduledTime: string | null; costOverride: any }>;
    }>;

    for (const stop of sharedStops) {
      const newStop = await prisma.stop.create({
        data: {
          tripId: newTrip.id,
          cityId: stop.cityId,
          startDate: stop.startDate,
          endDate: stop.endDate,
          orderIndex: stop.orderIndex,
        },
      });
      oldToNewStopId[stop.id] = newStop.id;

      for (const sa of stop.stopActivities) {
        await prisma.stopActivity.create({
          data: {
            stopId: newStop.id,
            activityId: sa.activityId,
            scheduledDate: sa.scheduledDate,
            scheduledTime: sa.scheduledTime,
            costOverride: sa.costOverride,
          },
        });
      }
    }

    res.status(201).json({ trip: newTrip });
  },
);

export default router;
