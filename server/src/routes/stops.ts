import { Router } from "express";
import { z } from "zod";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";

const router: Router = Router();

router.use(authMiddleware);

const createStopSchema = z.object({
  cityId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  orderIndex: z.number().optional(),
});

const updateStopSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  orderIndex: z.number().optional(),
});

// Helper: verify the trip belongs to the logged-in user
async function getOwnedTrip(tripId: number, userId: number) {
  return prisma.trip.findFirst({ where: { id: tripId, userId } });
}

// POST /api/trips/:tripId/stops - add a stop to a trip
router.post("/trips/:tripId/stops", async (req: AuthRequest, res) => {
  const tripId = Number(req.params.tripId);
  const trip = await getOwnedTrip(tripId, req.userId!);
  if (!trip) return res.status(404).json({ error: "Trip not found" });

  const parsed = createStopSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { cityId, startDate, endDate, orderIndex } = parsed.data;

  const stopCount = await prisma.stop.count({ where: { tripId } });

  const stop = await prisma.stop.create({
    data: {
      tripId,
      cityId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      orderIndex: orderIndex ?? stopCount,
    },
    include: { city: true },
  });
  res.status(201).json({ stop });
});

// PATCH /api/stops/:id - update a stop (dates or order)
router.patch("/stops/:id", async (req: AuthRequest, res) => {
  const id = Number(req.params.id);

  const stop = await prisma.stop.findUnique({
    where: { id },
    include: { trip: true },
  });
  if (!stop || stop.trip.userId !== req.userId) {
    return res.status(404).json({ error: "Stop not found" });
  }

  const parsed = updateStopSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const data: any = { ...parsed.data };
  if (data.startDate) data.startDate = new Date(data.startDate);
  if (data.endDate) data.endDate = new Date(data.endDate);

  const updated = await prisma.stop.update({
    where: { id },
    data,
    include: { city: true },
  });
  res.json({ stop: updated });
});

// DELETE /api/stops/:id - remove a stop
router.delete("/stops/:id", async (req: AuthRequest, res) => {
  const id = Number(req.params.id);

  const stop = await prisma.stop.findUnique({
    where: { id },
    include: { trip: true },
  });
  if (!stop || stop.trip.userId !== req.userId) {
    return res.status(404).json({ error: "Stop not found" });
  }

  await prisma.stop.delete({ where: { id } });
  res.json({ success: true });
});

export default router;
