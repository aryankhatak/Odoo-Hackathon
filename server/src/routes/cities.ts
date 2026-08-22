import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router: Router = Router();

// GET /api/cities?search=&country= — search cities (public, no auth)
router.get("/cities", async (req, res) => {
  const search = req.query.search as string | undefined;
  const country = req.query.country as string | undefined;

  const where: any = {};
  if (search) where.name = { contains: search };
  if (country) where.country = country;

  const cities = await prisma.city.findMany({
    where,
    orderBy: { popularity: "desc" },
  });
  res.json({ cities });
});

export default router;
