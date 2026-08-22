# GlobeTrotter 🌍

GlobeTrotter is a full-stack travel planning application built for the Odoo Hackathon. It empowers users to explore new destinations, save their favorite spots, build detailed itineraries, and track their travel budgets seamlessly.

## 🗺️ User Flow

1. **Sign Up / Login**: Create a personalized account by providing your name, email, and uploading a profile picture via drag-and-drop.
2. **Dashboard Overview**: Land on the interactive Dashboard to get a high-level summary of your travel stats, upcoming trips, and budget utilization.
3. **Explore Destinations**: Navigate to the Explore page to browse a curated list of popular cities, view beautiful imagery, and discover exciting local activities.
4. **Save Favorites**: Click the heart icon on any city or activity to add them to your personalized "Saved" list for future trip planning.
5. **Create a Trip**: Go to "My Trips" and easily create a new journey by specifying a destination name, travel dates, description, and your total allocated budget.
6. **Plan Your Itinerary**: Dive into the Itinerary Builder to add stops (cities) to your trip and schedule specific activities day-by-day, automatically tracking the estimated costs.
7. **Track on Calendar**: Switch to the Calendar view to see a chronological timeline of your upcoming travel plans, flights, and scheduled activities.
8. **Monitor Your Budget**: Visit the Budget insights page to visualize your spending breakdown via interactive charts, ensuring your estimated costs stay well within your planned budget.

## ✨ Features

- **User Authentication**: Secure Sign-Up and Login with profile photo uploads.
- **Interactive Dashboard**: Get a birds-eye view of your upcoming trips, total travel budget, and category-based cost breakdowns.
- **Explore Destinations**: Browse popular cities and discover exciting activities. 
- **Saved Places**: Save your favorite destinations (with heart icons) to revisit them later.
- **Trip Management**: Create and manage trips, set budgets, and track your expenses dynamically.
- **Smart Itinerary Builder**: Plan your days with specific activities, track costs, and organize your schedule.
- **Travel Timeline (Calendar)**: A chronological view of your upcoming flights, transport, and planned activities.

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite)
- **Tailwind CSS** (for responsive and modern UI)
- **Lucide React** (for beautiful iconography)
- **Recharts** (for budget data visualization)

### Backend
- **Node.js & Express.js**
- **Prisma ORM** 
- **SQLite** (Database)
- **Zod** (Data validation)
- **JWT** (Authentication)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   \\\ash
   git clone https://github.com/aryankhatak/Odoo-Hackathon.git
   cd Odoo-Hackathon
   \\\

2. **Setup Backend**
   \\\ash
   cd server
   npm install
   # Initialize the SQLite database and run migrations
   npx prisma generate
   npx prisma db push
   # Seed the database with popular cities
   npx tsx prisma/seed.ts
   # Start the backend server (runs on http://localhost:5000)
   npm run dev
   \\\

3. **Setup Frontend**
   Open a new terminal window:
   \\\ash
   cd client
   npm install
   # Start the Vite development server (runs on http://localhost:5173)
   npm run dev
   \\\

## 📸 Screenshots
*(Add screenshots of your Dashboard, Explore page, and Itinerary Builder here before the demo!)*

## 🏆 Hackathon Details
Created with ❤️ for the Odoo Hackathon. 
