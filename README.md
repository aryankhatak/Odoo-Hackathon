# GlobeTrotter 🌍

GlobeTrotter is a travel planning web app we built for the Odoo Hackathon. Basically, instead of planning a multi-city trip on 5 different WhatsApp chats and a notes app, you can do it all in one place — pick cities, add activities, see your budget, and share the trip with friends.

## What it actually does

- Sign up / log in
- See a dashboard with your trips and a quick summary of what's coming up
- Explore cities and save the ones you like
- Create a trip and add "stops" (cities) with dates
- Add activities to each stop and build a day-by-day itinerary
- See a calendar view of the whole trip
- See a budget breakdown (how much you're spending on what)
- Share a trip publicly with a link so others can view it

## Tech we used

**Frontend:** React + Vite + TypeScript, styled with Tailwind CSS, charts with Recharts, icons from Lucide.

**Backend:** Node.js + Express (TypeScript), Prisma as the ORM, SQLite as the database (so no need to install a separate DB server), JWT for login sessions, Zod for validating request data, bcrypt for hashing passwords.

## How to run it on your machine

You'll need [Node.js](https://nodejs.org/) installed (v18 or newer). Check with:
\`\`\`bash
node -v
\`\`\`

We open **two terminals** — one for the backend, one for the frontend, and keep both running while you work.

### 1. Get the code
\`\`\`bash
git clone https://github.com/aryankhatak/Odoo-Hackathon.git
cd Odoo-Hackathon
\`\`\`

### 2. Backend (server) — Terminal 1
\`\`\`bash
cd server
npm install
\`\`\`

Now set up the database. This creates a `dev.db` SQLite file and fills it with sample cities and activities so the app isn't empty when you open it:
\`\`\`bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
\`\`\`

Start the server:
\`\`\`bash
npm run dev
\`\`\`

If it worked, you'll see it running on `http://localhost:5000`. You can check it's alive by opening `http://localhost:5000/api/health` in your browser — it should say `{"status":"ok"}`.

### 3. Frontend (client) — Terminal 2 (new terminal, keep server running)
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

This starts on `http://localhost:5173` — open that in your browser and the app should load.

### 4. That's it
Sign up for a new account in the app, and start creating a trip.

## A couple of things to know

- The database is a single file (`server/prisma/dev.db`), not a real server — perfect for local dev/demo, not meant for production as-is.
- If you mess up your local database and want a clean slate, just delete `server/prisma/dev.db` and re-run the `prisma db push` and `seed.ts` commands from step 2.
- Full API endpoint list (all routes, request/response shapes) is in [`server/API.md`](./server/API.md) if you want to poke around with Postman or curl.

## Project structure
\`\`\`
Odoo-Hackathon/
├── client/     → React frontend
├── server/     → Express backend + Prisma schema
└── README.md   → you are here
\`\`\`

## Team

Built by us for the Odoo Hackathon 🚀
