import { Router } from "express";
import { z } from "zod";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";

const router: Router = Router();

const createTripSchema = z.object({
  name: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string().optional(),
  budget: z.number().optional(),
  coverPhotoUrl: z.string().optional(),
});

const updateTripSchema = createTripSchema.partial();

// GET /api/trips - list current user's trips
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const trips = await prisma.trip.findMany({
    where: { userId: req.userId! },
    orderBy: { startDate: "asc" },
    include: { 
      stops: {
        include: {
          city: true,
          stopActivities: {
            include: { activity: true }
          }
        }
      } 
    },
  });
  res.json({ trips });
});

// POST /api/trips - create a trip
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const parsed = createTripSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { name, startDate, endDate, description, budget, coverPhotoUrl } = parsed.data;

  const trip = await prisma.trip.create({
    data: {
      userId: req.userId!,
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      description: description ?? null,
      budget: budget || 0,
      coverPhotoUrl: coverPhotoUrl ?? null,
    },
  });
  res.status(201).json({ trip });
});

// GET /api/trips/:id - get single trip (must belong to user)
router.get("/:id", authMiddleware, async (req: AuthRequest, res) => {
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
  res.json({ trip });
});

// PATCH /api/trips/:id - update trip
router.patch("/:id", authMiddleware, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const parsed = updateTripSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const existing = await prisma.trip.findFirst({
    where: { id, userId: req.userId! },
  });
  if (!existing) return res.status(404).json({ error: "Trip not found" });

  const data: any = { ...parsed.data };
  if (data.startDate) data.startDate = new Date(data.startDate);
  if (data.endDate) data.endDate = new Date(data.endDate);

  const trip = await prisma.trip.update({ where: { id }, data });
  res.json({ trip });
});

// DELETE /api/trips/:id - delete trip
router.delete("/:id", authMiddleware, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.trip.findFirst({
    where: { id, userId: req.userId! },
  });
  if (!existing) return res.status(404).json({ error: "Trip not found" });

  await prisma.trip.delete({ where: { id } });
  res.json({ success: true });
});

export default router;
