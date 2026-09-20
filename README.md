# myRide

A full-stack ride-hailing app inspired by Uber, built with the MERN stack.

## Overview

myRide connects riders and drivers in a real-time ride booking flow with:

- rider and captain authentication
- live ride request matching
- trip status updates via Socket.IO
- fare estimation
- OTP-based ride verification
- map-based pickup and drop locations

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Real-time: Socket.IO
- Maps: Leaflet/OpenStreetMap with Google Maps fallback support

## Features

- Rider signup/login and booking flow
- Captain signup/login and driver dashboard
- Live ride requests and acceptance flow
- Ride tracking and live updates
- Fare calculation based on route distance/time
- OTP verification before trip start
- Secure JWT-based auth

## Project Structure

```bash
myRide/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── server.js
│   └── socket.js
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json
├── README.md
├── vercel.json
└── api/
```

## Getting Started

### 1. Install dependencies

```bash
npm run install-all
```

### 2. Configure environment variables

Create a `.env` file in the `backend` folder:

```env
PORT=4000
DB_CONNECT=mongodb://127.0.0.1:27017/myride
JWT_SECRET=myride-super-secret-jwt-key-2026
GOOGLE_MAPS_API=
```

Create a `.env` file in the `frontend` folder:

```env
VITE_BASE_URL=http://localhost:4000
```

### 3. Run the app

Start the backend:

```bash
npm run backend
```

Start the frontend:

```bash
npm run frontend
```

Then open:

```text
http://localhost:5173
```

## Notes

- MongoDB must be running locally for the backend to connect successfully.
- This is a development setup intended for local use and demo purposes.

## License

ISC
