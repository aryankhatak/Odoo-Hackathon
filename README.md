# GlobeTrotter 🌍

GlobeTrotter is a full-stack travel planning application built for the Odoo Hackathon. It empowers users to explore new destinations, save their favorite spots, build detailed itineraries, and track their travel budgets seamlessly.

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
