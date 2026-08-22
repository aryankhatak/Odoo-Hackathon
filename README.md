# GlobeTrotter 🌍 | Odoo Hackathon

> A full-stack travel planning platform to create, organize, and share personalized multi-city itineraries with budget tracking and timeline visualization.

**Problem Statement:** GlobeTrotter - Empowering Personalized Travel Planning  
**Repository:** `Odoo-Hackathon` | **Branch:** `setup-backend`

[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=flat&logo=react)](./client)
[![Express](https://img.shields.io/badge/Backend-Express%205-000000?style=flat&logo=express)](./server)
[![Prisma](https://img.shields.io/badge/ORM-Prisma%207-2D3748?style=flat&logo=prisma)](./server/prisma)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178C6?style=flat&logo=typescript)](.)

---

## 📌 Overview

GlobeTrotter simplifies multi-city travel planning. Users can create trips, add stops and cities, schedule activities with custom costs and timings, visualize their journey on a timeline, track budgets with charts, and share itineraries via a public link.

The platform is built with a relational database design to handle complex travel data — trips, stops, cities, activities, and shared links.

## ✨ Features

### Core Modules

- **Authentication:** Secure signup/login with JWT and bcrypt, protected routes
- **Dashboard:** Overview of trips, total budget, destinations count, and recommended cities
- **My Trips:** List all trips with search, edit, delete, and share actions
- **Create / Edit Trip:** Create trip with name, dates, description, and cover photo. Edit support via query params
- **Itinerary Builder:** Add and manage stops, select cities, reorder stops
- **Activity Planner:** Search activities by city, category, cost, and duration. Schedule with date validation (must be within stop dates), time, and cost override
- **Timeline View:** Chronological day-wise view of the complete itinerary
- **Budget & Analytics:** Cost breakdown by category, average cost per day, daily budget limit with over-budget alerts. Charts powered by Recharts (PieChart, BarChart)
- **Public Sharing:** Generate shareable slug-based links, public read-only view, and copy-trip functionality for logged-in users
- **Profile Settings:** Update name, photo, email, and manage account
- **Admin Dashboard:** System analytics — total seeded cities, average cost index, average popularity, Top 10 popular cities and cost index charts

## 🛠️ Tech Stack

**Frontend - `/client`**
- React 19, TypeScript, Vite
- React Router DOM 7, Tailwind CSS 4
- Recharts, Lucide React
- pnpm as package manager

**Backend - `/server`**
- Node.js, Express 5, TypeScript
- Prisma ORM 7 with MariaDB/MySQL adapter
- JWT, bcrypt, Zod validation, CORS, dotenv
- tsx for development

**Database**
- MariaDB / MySQL / PostgreSQL (configurable via Prisma `DATABASE_URL`)

## 📁 Project Structure
