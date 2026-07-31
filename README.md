# Blood Reservoir

A full-stack blood donation and blood bank management platform built on the MERN stack. Blood Reservoir connects patients who need blood with donors and registered blood banks, and gives hospital admins a central dashboard to track requests, inventory, and shipments.

## Overview

Blood Reservoir supports four roles, each with its own registration flow and dashboard:

- **Donor** — registers with blood type and contact details so they can be found when their blood type is needed.
- **Patient** — submits blood requests specifying blood type and quantity, and tracks request status.
- **Blood Bank** — manages bottle stock, receives and replies to hospital requests, and issues invoices.
- **Admin** — oversees donors, patients, and blood banks from a single dashboard, monitors urgent blood shortage notifications, and coordinates fulfillment.

## Features

- Role-based multi-step registration wizards (Donor, Patient, Blood Bank) with profile image upload
- Blood request lifecycle: patient request → admin/blood bank notification → reply → invoice
- Real-time-style inbox and notification system between hospital admins and blood banks
- Admin dashboard with searchable/filterable tables for donors, patients, blood banks, and blood requests
- Blood bottle stock tracking with pricing
- Terms & conditions flow per role before registration
- Responsive, custom-styled UI (no component library) with a consistent red/white design system

## Tech Stack

**Frontend:** React 18, React Router, Axios, Sass (SCSS), react-icons
**Backend:** Node.js, Express, Mongoose (MongoDB)
**Auth & security:** JWT, bcrypt
**File uploads:** Multer (local disk storage)
**Other integrations:** Twilio (SMS), Stripe (payments), Nodemailer

## Project Structure

```
Donor-Reservoir/
├── client/          React frontend (Create React App)
│   ├── src/
│   │   ├── Pages/   Route-level pages, organized by role (Admin, Donor, Patient, BloodBank, Auth)
│   │   └── css/     SCSS stylesheets, mirroring the Pages structure, plus a shared _theme.scss
│   └── package.json
├── server/          Express backend
│   ├── models/      Mongoose schemas (Admin, Donor, Patient, BloodBank, BloodRequest, BloodBottles, notifications)
│   ├── routes/      REST API route handlers
│   ├── middleware/  Auth middleware
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier)

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/Donor-Reservoir.git
cd Donor-Reservoir
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Fill in `server/.env` with your own values — at minimum you'll need `MONGODB_URI` (your MongoDB connection string) and `SESSION_SECRET`/`JWT_SECRET` (any random strings). The optional integrations (Twilio, Stripe, Google OAuth, DigitalOcean Spaces) can be left blank if you're not using those features.

```bash
npm start
```

The API runs on the port set in `.env` (`PORT`, defaults suggested: `5001`).

### 3. Set up the frontend

```bash
cd ../client
npm install
cp .env.example .env
```

Set `REACT_APP_API_URL` in `client/.env` to match your backend's URL (e.g. `http://localhost:5001`), then:

```bash
npm start
```

The app runs at `http://localhost:3000`.

## Environment Variables

**server/.env**

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `PORT` | Port the Express server listens on |
| `SESSION_SECRET` | Secret for session signing |
| `JWT_SECRET` | Secret for signing auth tokens |
| `TWILIO_*`, `STRIPE_*`, `GOOGLE_*`, `DO_SPACES_*` | Optional third-party integrations |

**client/.env**

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Base URL of the backend API |

## Notes

- Uploaded profile images are currently stored on local disk under `server/uploads/` and served statically — swap in the included DigitalOcean Spaces/S3 config (`upload-aws.js`) for production deployments.
- The first Admin account has no self-service signup route; insert one directly into the `admins` collection (see the `Admin` model for required fields) to get started.
