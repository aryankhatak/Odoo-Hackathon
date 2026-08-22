import { Router } from "express";
import { z } from "zod";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";

const router: Router = Router();

const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  photoUrl: z.string().optional(),
});

// PATCH /api/users/me — update profile
router.patch("/users/me", authMiddleware, async (req: AuthRequest, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const parsed = updateProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const data: Record<string, string> = {};
  if (parsed.data.name !== undefined) data.name = parsed.data.name;
  if (parsed.data.photoUrl !== undefined) data.photoUrl = parsed.data.photoUrl;

  const user = await prisma.user.update({
    where: { id: req.userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      photoUrl: true,
      createdAt: true,
    },
  });
  res.json({ user });
});

// DELETE /api/users/me — delete account (trips cascade-delete via schema)
router.delete("/users/me", authMiddleware, async (req: AuthRequest, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await prisma.user.delete({ where: { id: req.userId } });
  res.json({ success: true });
});

export default router;
