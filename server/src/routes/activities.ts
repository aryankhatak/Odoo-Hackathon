import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router: Router = Router();

// GET /api/activities?cityId=&category=&maxCost= — filter activities (public, no auth)
router.get("/activities", async (req, res) => {
  const cityId = req.query.cityId ? Number(req.query.cityId) : undefined;
  const category = req.query.category as string | undefined;
  const maxCost = req.query.maxCost ? Number(req.query.maxCost) : undefined;

  const where: any = {};
  if (cityId) where.cityId = cityId;
  if (category) where.category = category;
  if (maxCost !== undefined) where.cost = { lte: maxCost };

  const activities = await prisma.activity.findMany({
    where,
    include: { city: true },
  });
  res.json({ activities });
});

export default router;
