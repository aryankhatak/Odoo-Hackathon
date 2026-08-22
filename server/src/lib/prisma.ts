import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client.js";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "aryan123",
  database: "globetrotter",
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter }); 