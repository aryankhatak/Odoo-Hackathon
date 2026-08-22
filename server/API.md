# GlobeTrotter API Reference

Base URL: `http://localhost:5000`

All protected routes require a `Bearer <JWT>` token in the `Authorization` header.

---

## Table of Contents

1. [Health](#health)
2. [Auth](#auth)
3. [Me (Profile)](#me-profile)
4. [Users (Settings)](#users-settings)
5. [Trips](#trips)
6. [Stops](#stops)
7. [Stop Activities](#stop-activities)
8. [Cities](#cities)
9. [Activities](#activities)
10. [Itinerary](#itinerary)
11. [Budget](#budget)
12. [Sharing](#sharing)

---

## Health

### `GET /api/health`
- **Auth:** No
- **Response:**
```json
{ "status": "ok", "db": "connected" }
```

---

## Auth

### `POST /api/auth/signup`
- **Auth:** No
- **Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "password": "string (required, min 6 chars)"
}
```
- **Response:** `201`
```json
{
  "token": "string (JWT)",
  "user": { "id": "number", "name": "string", "email": "string" }
}
```

### `POST /api/auth/login`
- **Auth:** No
- **Body:**
```json
{
  "email": "string (required, email format)",
  "password": "string (required)"
}
```
- **Response:**
```json
{
  "token": "string (JWT)",
  "user": { "id": "number", "name": "string", "email": "string" }
}
```

---

## Me (Profile)

### `GET /api/me`
- **Auth:** Yes
- **Response:**
```json
{
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "photoUrl": "string | null",
    "createdAt": "datetime"
  }
}
```

---

## Users (Settings)

### `PATCH /api/users/me`
- **Auth:** Yes
- **Body:**
```json
{
  "name": "string (optional, min 1 char)",
  "photoUrl": "string (optional)"
}
```
- **Response:**
```json
{
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "photoUrl": "string | null",
    "createdAt": "datetime"
  }
}
```

### `DELETE /api/users/me`
- **Auth:** Yes
- **Response:**
```json
{ "success": true }
```
> Deletes the account and cascade-deletes all associated trips, stops, and stop-activities.

---

## Trips

### `GET /api/trips`
- **Auth:** Yes
- **Response:**
```json
{
  "trips": [
    {
      "id": "number",
      "userId": "number",
      "name": "string",
      "startDate": "datetime",
      "endDate": "datetime",
      "description": "string | null",
      "coverPhotoUrl": "string | null",
      "isPublic": "boolean",
      "shareSlug": "string | null",
      "createdAt": "datetime",
      "stops": ["Stop[]"]
    }
  ]
}
```

### `POST /api/trips`
- **Auth:** Yes
- **Body:**
```json
{
  "name": "string (required, min 1 char)",
  "startDate": "string (required, ISO date)",
  "endDate": "string (required, ISO date)",
  "description": "string (optional)",
  "coverPhotoUrl": "string (optional)"
}
```
- **Response:** `201`
```json
{
  "trip": { "id": "number", "name": "string", ... }
}
```

### `GET /api/trips/:id`
- **Auth:** Yes (owner only)
- **Response:**
```json
{
  "trip": {
    "id": "number",
    "name": "string",
    "startDate": "datetime",
    "endDate": "datetime",
    "stops": [
      {
        "id": "number",
        "city": { "id": "number", "name": "string", "country": "string", "costIndex": "number", ... },
        "stopActivities": [
          {
            "id": "number",
            "activity": { "id": "number", "name": "string", "category": "string", "cost": "decimal", ... },
            "scheduledDate": "datetime",
            "scheduledTime": "string | null",
            "costOverride": "decimal | null"
          }
        ]
      }
    ]
  }
}
```

### `PATCH /api/trips/:id`
- **Auth:** Yes (owner only)
- **Body:** (all fields optional)
```json
{
  "name": "string",
  "startDate": "string (ISO date)",
  "endDate": "string (ISO date)",
  "description": "string",
  "coverPhotoUrl": "string"
}
```
- **Response:**
```json
{ "trip": { ... } }
```

### `DELETE /api/trips/:id`
- **Auth:** Yes (owner only)
- **Response:**
```json
{ "success": true }
```

---

## Stops

### `POST /api/trips/:tripId/stops`
- **Auth:** Yes (trip owner only)
- **Body:**
```json
{
  "cityId": "number (required)",
  "startDate": "string (required, ISO date)",
  "endDate": "string (required, ISO date)",
  "orderIndex": "number (optional, defaults to next position)"
}
```
- **Response:** `201`
```json
{
  "stop": {
    "id": "number",
    "tripId": "number",
    "cityId": "number",
    "startDate": "datetime",
    "endDate": "datetime",
    "orderIndex": "number",
    "city": { ... }
  }
}
```

### `PATCH /api/stops/:id`
- **Auth:** Yes (trip owner only)
- **Body:** (all fields optional)
```json
{
  "startDate": "string (ISO date)",
  "endDate": "string (ISO date)",
  "orderIndex": "number"
}
```
- **Response:**
```json
{ "stop": { ... } }
```

### `DELETE /api/stops/:id`
- **Auth:** Yes (trip owner only)
- **Response:**
```json
{ "success": true }
```

---

## Stop Activities

### `POST /api/stops/:stopId/activities`
- **Auth:** Yes (trip owner only)
- **Body:**
```json
{
  "activityId": "number (required)",
  "scheduledDate": "string (required, ISO date)",
  "scheduledTime": "string (optional, e.g. '14:00')",
  "costOverride": "number (optional)"
}
```
- **Response:** `201`
```json
{
  "stopActivity": {
    "id": "number",
    "stopId": "number",
    "activityId": "number",
    "scheduledDate": "datetime",
    "scheduledTime": "string | null",
    "costOverride": "decimal | null",
    "activity": { ... }
  }
}
```

### `DELETE /api/stop-activities/:id`
- **Auth:** Yes (trip owner only)
- **Response:**
```json
{ "success": true }
```

---

## Cities

### `GET /api/cities`
- **Auth:** No
- **Query Parameters:**
  - `search` — case-insensitive partial match on city name
  - `country` — exact match on country
- **Example:** `GET /api/cities?search=par&country=France`
- **Response:**
```json
{
  "cities": [
    {
      "id": "number",
      "name": "string",
      "country": "string",
      "costIndex": "number",
      "popularity": "number",
      "imageUrl": "string | null"
    }
  ]
}
```
> Results are ordered by popularity (descending).

---

## Activities

### `GET /api/activities`
- **Auth:** No
- **Query Parameters:**
  - `cityId` — filter by city ID
  - `category` — filter by category (sightseeing, food, adventure, culture, other)
  - `maxCost` — filter activities with cost ≤ maxCost
- **Example:** `GET /api/activities?cityId=1&category=food&maxCost=50`
- **Response:**
```json
{
  "activities": [
    {
      "id": "number",
      "cityId": "number",
      "name": "string",
      "category": "string",
      "cost": "decimal",
      "durationMinutes": "number",
      "description": "string | null",
      "imageUrl": "string | null",
      "city": { ... }
    }
  ]
}
```

---

## Itinerary

### `GET /api/trips/:id/itinerary`
- **Auth:** Yes (owner only)
- **Response:**
```json
{
  "trip": {
    "id": "number",
    "name": "string",
    "startDate": "datetime",
    "endDate": "datetime"
  },
  "itinerary": [
    {
      "id": "number",
      "city": { "id": "number", "name": "string", "country": "string", ... },
      "startDate": "datetime",
      "endDate": "datetime",
      "orderIndex": "number",
      "days": {
        "2026-09-01": [
          {
            "id": "number",
            "activity": { "id": "number", "name": "string", "category": "string", ... },
            "scheduledDate": "datetime",
            "scheduledTime": "string | null",
            "costOverride": "decimal | null"
          }
        ]
      }
    }
  ]
}
```
> Stops are ordered by `orderIndex`. Within each stop, activities are grouped by day under `days` (keyed by ISO date string).

---

## Budget

### `GET /api/trips/:id/budget`
- **Auth:** Yes (owner only)
- **Response:**
```json
{
  "categoryTotals": {
    "sightseeing": "number",
    "food": "number",
    "adventure": "number",
    "culture": "number",
    "other": "number"
  },
  "dailyCosts": [
    {
      "date": "string (ISO date, e.g. '2026-09-01')",
      "cost": "number (rounded to 2 decimal places)"
    }
  ],
  "grandTotal": "number"
}
```
> - `categoryTotals`: Sum of activity costs per category (uses `costOverride` when present, otherwise the activity's base `cost`).
> - `dailyCosts`: Cost for each day of the trip, including both activity costs and a per-day stay/transport estimate (`city.costIndex` per day).
> - `grandTotal`: Total across all days.

---

## Sharing

### `POST /api/trips/:id/share`
- **Auth:** Yes (owner only)
- **Description:** Generates a random URL-safe share slug and sets `isPublic = true`. If the trip already has a slug, reuses it.
- **Response:**
```json
{
  "shareSlug": "string (URL-safe, e.g. 'aB3kL9mQ')",
  "isPublic": true
}
```

### `GET /api/public/trips/:slug`
- **Auth:** No
- **Description:** Read-only full itinerary view of a shared trip.
- **Response:**
```json
{
  "trip": {
    "id": "number",
    "name": "string",
    "startDate": "datetime",
    "endDate": "datetime",
    "description": "string | null",
    "coverPhotoUrl": "string | null",
    "user": { "id": "number", "name": "string" },
    "stops": [
      {
        "id": "number",
        "city": { ... },
        "orderIndex": "number",
        "startDate": "datetime",
        "endDate": "datetime",
        "stopActivities": [
          {
            "id": "number",
            "activity": { ... },
            "scheduledDate": "datetime",
            "scheduledTime": "string | null",
            "costOverride": "decimal | null"
          }
        ]
      }
    ]
  }
}
```

### `POST /api/public/trips/:slug/copy`
- **Auth:** Yes
- **Description:** Copies a shared trip (including stops and stop-activities) into the authenticated user's account. The new trip name is `"<original name> (Copy)"`.
- **Response:** `201`
```json
{
  "trip": {
    "id": "number",
    "name": "string",
    "startDate": "datetime",
    "endDate": "datetime",
    ...
  }
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "error": "string (message or Zod validation details)"
}
```

Common HTTP status codes:
| Code | Meaning |
|------|---------|
| 400  | Validation error (bad request body) |
| 401  | Missing/invalid/expired JWT token |
| 404  | Resource not found or access denied |
| 409  | Conflict (e.g. email already registered) |
| 500  | Internal server error |
