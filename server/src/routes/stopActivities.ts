import { Router } from "express";
import { z } from "zod";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";

const router: Router = Router();

const attachActivitySchema = z.object({
  activityId: z.number(),
  scheduledDate: z.string(),
  scheduledTime: z.string().optional(),
  costOverride: z.number().optional(),
});

// POST /api/stops/:stopId/activities — attach an activity to a stop
router.post(
  "/stops/:stopId/activities",
  authMiddleware,
  async (req: AuthRequest, res) => {
    const stopId = Number(req.params.stopId);

    const stop = await prisma.stop.findUnique({
      where: { id: stopId },
      include: { trip: true },
    });
    if (!stop || stop.trip.userId !== req.userId) {
      return res.status(404).json({ error: "Stop not found" });
    }

    const parsed = attachActivitySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const { activityId, scheduledDate, scheduledTime, costOverride } =
      parsed.data;

    const stopActivity = await prisma.stopActivity.create({
      data: {
        stopId,
        activityId,
        scheduledDate: new Date(scheduledDate),
        scheduledTime: scheduledTime ?? null,
        costOverride: costOverride ?? null,
      },
      include: { activity: true },
    });
    res.status(201).json({ stopActivity });
  },
);

// DELETE /api/stop-activities/:id — remove an activity from a stop
router.delete(
  "/stop-activities/:id",
  authMiddleware,
  async (req: AuthRequest, res) => {
    const id = Number(req.params.id);

    const sa = await prisma.stopActivity.findUnique({
      where: { id },
      include: { stop: { include: { trip: true } } },
    });
    if (!sa || sa.stop.trip.userId !== req.userId) {
      return res.status(404).json({ error: "StopActivity not found" });
    }

    await prisma.stopActivity.delete({ where: { id } });
    res.json({ success: true });
  },
);

export default router;
