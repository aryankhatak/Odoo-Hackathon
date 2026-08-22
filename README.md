# GlobeTrotter 🌍 - Odoo Hackathon

> Personalized, intelligent, collaborative travel planning — built as a full-stack React + Express app.

**Branch:** `setup-backend` | **Stack:** React 19 + Vite + Express 5 + Prisma 7 + TypeScript + pnpm
**Problem Statement:** GlobeTrotter - Empowering Personalized Travel Planning

---

## 🎯 What You Actually Built (from your code)

I read your `client/src/pages/*.tsx` dump — this is not a mockup, it's fully functional:

### Frontend - 8 Pages Implemented

1.  **Login.tsx** - Combined Login/Signup page
    - Detects `/login` vs `/signup` via `useLocation`
    - Calls `api.login()` / `api.signup()` with name/email/password validation
    - `onLoginSuccess` callback, error handling

2.  **Dashboard.tsx** - Home hub
    - `api.getTrips()` + `api.getCities()`
    - Stats: tripCount, totalBudget, destinationsCount
    - Shows recent trips + Top 6 recommended cities (popularity sorted)
    - Welcome with `getCurrentUser()`

3.  **MyTrips.tsx** - Trip management
    - `api.getTrips()` with search filter `searchQuery`
    - Cards with edit, delete (confirmation: "delete this trip and all its stops/activities?"), view, share
    - Icons: Calendar, MapPin, Share2

4.  **CreateTrip.tsx** - Create/Edit trip
    - Supports `?edit=id` via `useSearchParams`
    - Fields: name, startDate, endDate, description, coverPhotoUrl
    - Calls `api.createTrip()`, `api.updateTrip()`, `api.getTrip()`

5.  **TripDetails.tsx** - The core (800+ lines) - Itinerary Builder + Timeline + Budget + Sharing
    - Tabs: `itinerary | timeline | budget | share` with `activeTab` state
    - **Itinerary Tab:** Add city via City Search modal (`isCitySearchOpen`), Add Stop (`api.addStop()`), delete stop (`api.deleteStop()`), update stop (`api.updateStop()`), reorder
    - **Activities:** Search via `api.getActivities()`, schedule with `selectedActivityToSchedule`, validates scheduleDate must be within `stop.startDate` to `stop.endDate`, supports scheduledTime + costOverride (custom price), `api.addStopActivity()`, `api.deleteStopActivity()`
    - **Timeline Tab:** Chronological vertical view of itinerary
    - **Budget Tab:** Uses Recharts `PieChart`, `BarChart` with `ResponsiveContainer`, shows cost breakdown by category, average cost per day, dailyBudgetLimit state (default $150) with over-budget alerts
    - **Share Tab:** `api.shareTrip()` generates slug link, copy with `copied` state

6.  **SharedTrip.tsx** - Public read-only view
    - Route `/shared/:slug`, `useParams slug`
    - `api.getPublicTrip(slug)`, `api.copyPublicTrip()` to clone trip if logged in
    - Shows trip + user who shared it

7.  **Settings.tsx** - Profile
    - `api.getProfile()`, `api.updateProfile()`, `api.deleteAccount()`
    - Editable: name, photoUrl, email, fallback to cached `getCurrentUser()`
    - Props: `onProfileUpdated`, `onAccountDeleted`

8.  **AdminDashboard.tsx** - Analytics
    - `api.getCities()` as system stats
    - Calculates avgCost, avgPop from costIndex/popularity
    - Stats cards: Total Seeded Cities, Average Cost Index, Average Popularity
    - Charts: Top 10 Popular Cities (BarChart) + Top 10 by Cost Index using Recharts

### Backend Routes (from your structure)
`server/src/routes/` → `auth.ts`, `trips.ts`, `stops.ts`, `cities.ts`, `activities.ts`, `stopActivities.ts`, `itinerary.ts`, `sharing.ts`, `users.ts`, `me.ts` + `middleware/auth.ts`

API calls found in frontend: `getCities, getTrip, getTrips, getBudget, getItinerary, getActivities, getProfile, getPublicTrip, createTrip, updateTrip, updateStop, deleteTrip, deleteStop, addStop, addStopActivity, deleteStopActivity, shareTrip, copyPublicTrip, login, signup, updateProfile, deleteAccount`

---

## 🛠️ Tech Stack - Verified

**Client (`/client`):**
- React 19.2.8, React DOM 19.2.8, React Router DOM 7.18.2
- TypeScript 6.0.3, Vite 8.2.2, @vitejs/plugin-react 6.1.0
- Tailwind CSS 4.3.3, @tailwindcss/vite 4.3.3
- Recharts 3.10.1, Lucide React 1.33.0
- pnpm 11.x

**Server (`/server`):**
- Express 5.2.1, TypeScript 7.0.2, tsx 4.23.12
- Prisma 7.9.1, @prisma/client 7.9.1, adapter-mariadb 7.9.1
- bcrypt 6.0.0, jsonwebtoken 9.0.3, zod 4.4.3, cors 2.8.6, dotenv 17.4.2
- pnpm 11.x

**Database:** MariaDB/MySQL (via Prisma `DATABASE_URL`)

## 📁 Project Structure
