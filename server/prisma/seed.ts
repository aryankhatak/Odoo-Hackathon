import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "aryan123",
  database: "globetrotter",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter }); 

const cities = [
  { name: "Paris", country: "France", costIndex: 80, popularity: 95 },
  { name: "Tokyo", country: "Japan", costIndex: 75, popularity: 92 },
  { name: "New York", country: "USA", costIndex: 90, popularity: 90 },
  { name: "Rome", country: "Italy", costIndex: 70, popularity: 88 },
  { name: "Bangkok", country: "Thailand", costIndex: 35, popularity: 85 },
  { name: "Barcelona", country: "Spain", costIndex: 60, popularity: 84 },
  { name: "Dubai", country: "UAE", costIndex: 85, popularity: 82 },
  { name: "London", country: "UK", costIndex: 88, popularity: 91 },
  { name: "Bali", country: "Indonesia", costIndex: 30, popularity: 87 },
  { name: "Amsterdam", country: "Netherlands", costIndex: 72, popularity: 79 },
  { name: "Singapore", country: "Singapore", costIndex: 78, popularity: 83 },
  { name: "Istanbul", country: "Turkey", costIndex: 40, popularity: 76 },
  { name: "Cairo", country: "Egypt", costIndex: 32, popularity: 70 },
  { name: "Sydney", country: "Australia", costIndex: 82, popularity: 81 },
  { name: "Prague", country: "Czech Republic", costIndex: 45, popularity: 74 },
  { name: "Kyoto", country: "Japan", costIndex: 65, popularity: 77 },
  { name: "Cape Town", country: "South Africa", costIndex: 42, popularity: 72 },
  { name: "Reykjavik", country: "Iceland", costIndex: 90, popularity: 68 },
];

function sampleActivitiesFor(cityName: string) {
  return [
    { name: `${cityName} City Walking Tour`, category: "sightseeing", cost: 15, durationMinutes: 120, description: `Guided walking tour through the highlights of ${cityName}.` },
    { name: `${cityName} Food Tasting Tour`, category: "food", cost: 40, durationMinutes: 150, description: `Sample local street food and specialties in ${cityName}.` },
    { name: `${cityName} Museum Visit`, category: "culture", cost: 20, durationMinutes: 90, description: `Explore the top museum in ${cityName}.` },
    { name: `${cityName} Adventure Excursion`, category: "adventure", cost: 60, durationMinutes: 240, description: `Outdoor adventure activity near ${cityName}.` },
    { name: `${cityName} Sunset Viewpoint`, category: "sightseeing", cost: 0, durationMinutes: 60, description: `Free scenic viewpoint to catch the sunset in ${cityName}.` },
    { name: `${cityName} Local Market Visit`, category: "other", cost: 10, durationMinutes: 90, description: `Browse a bustling local market in ${cityName}.` },
  ];
}

async function main() {
  console.log("Seeding cities...");
  for (const city of cities) {
    const created = await prisma.city.create({ data: city });
    const activities = sampleActivitiesFor(city.name);
    await prisma.activity.createMany({
      data: activities.map((a) => ({ ...a, cityId: created.id })),
    });
  }
  console.log(`Seeded ${cities.length} cities with activities each.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 