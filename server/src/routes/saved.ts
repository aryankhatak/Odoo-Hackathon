import { Router } from "express";
import { z } from "zod";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";

const router: Router = Router();

// GET /api/saved - list current user's saved items
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const savedItems = await prisma.savedItem.findMany({
    where: { userId: req.userId! },
    include: { city: true },
    orderBy: { createdAt: "desc" },
  });
  res.json({ savedItems });
});

// POST /api/saved - save a destination
const saveSchema = z.object({ cityId: z.number() });
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const parsed = saveSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { cityId } = parsed.data;

  // Verify city exists
  const city = await prisma.city.findUnique({ where: { id: cityId } });
  if (!city) return res.status(404).json({ error: "City not found" });

  try {
    const savedItem = await prisma.savedItem.upsert({
      where: {
        userId_cityId: {
          userId: req.userId!,
          cityId,
        },
      },
      update: {},
      create: {
        userId: req.userId!,
        cityId,
      },
    });
    res.status(201).json({ savedItem });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ error: "Failed to save item" });
  }
});

// DELETE /api/saved/:cityId - unsave a destination
router.delete("/:cityId", authMiddleware, async (req: AuthRequest, res) => {
  const cityId = Number(req.params.cityId);
  try {
    await prisma.savedItem.delete({
      where: {
        userId_cityId: {
          userId: req.userId!,
          cityId,
        },
      },
    });
    res.json({ success: true });
  } catch (error) {
    // Record might not exist, which is fine for a delete
    res.json({ success: true });
  }
});

export default router;

