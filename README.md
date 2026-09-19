# myRide - Full-Stack MERN Ride-Hailing Application

**myRide** is an end-to-end, production-ready MERN (MongoDB, Express, React, Node.js) ride-hailing application inspired by Uber. It features real-time WebSocket matching, driver-rider tracking, interactive Leaflet/OpenStreetMap routing, 6-digit OTP ride verification, fare calculation engine, and JWT-based authentication.

---

## 🚀 Features

- 🚗 **Dual Role Ecosystem**: Separate authentication and dashboards for **Riders (Users)** and **Drivers (Captains)**.
- ⚡ **Real-Time WebSockets (Socket.io)**: Live trip requests, captain location streaming, driver acceptance, OTP confirmation, and trip state sync.
- 🗺️ **Interactive OpenStreetMap Integration**: Powered by Leaflet & OSRM with seamless Google Maps API fallback for geocoding, distance matrix, and route calculation out-of-the-box.
- 🔐 **Secure Authentication**: Password hashing with Bcrypt, JWT authentication, and token blacklisting for safe logouts.
- 📱 **Modern Responsive UI**: Built with React (Vite), Tailwind CSS, and Lucide React icons.
- 🔑 **OTP Ride Verification**: Driver must verify the rider's 6-digit OTP before starting a trip.
- 💰 **Dynamic Fare Matrix**: Real-time pricing algorithm for Car, Moto, and Auto based on distance and estimated travel time.

---

## 🛠️ Project Structure

```
myRide/
├── package.json               # Root scripts to run both backend & frontend
├── backend/
│   ├── app.js                 # Express app initialization
│   ├── server.js              # HTTP server & Socket.io setup
│   ├── socket.js              # WebSocket connection logic
│   ├── db/db.js               # MongoDB connection
│   ├── models/                # User, Captain, Ride & BlacklistToken schemas
│   ├── controllers/           # Auth, Map, and Ride business logic
│   ├── services/              # Fare engine, OSM/Google map services
│   └── routes/                # Express API endpoints
└── frontend/
    ├── src/
    │   ├── context/           # User, Captain, and Socket React Contexts
    │   ├── components/        # Leaflet map, Fare options, Driver modals
    │   └── pages/             # Rider & Captain pages (Auth, Home, Riding)
    ├── index.html
    └── vite.config.js
```

---

## 🚦 Getting Started

### 1. Install Dependencies
Run the following from the root directory:
```bash
npm run install-all
```

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=4000
DB_CONNECT=mongodb://127.0.0.1:27017/myride
JWT_SECRET=myride-super-secret-jwt-key-2026
GOOGLE_MAPS_API= # Optional: Leaflet / OpenStreetMap fallback works out of the box!
```

**Frontend (`frontend/.env`):**
```env
VITE_BASE_URL=http://localhost:4000
```

### 3. Start the Application

Start Backend server:
```bash
cd backend
npm run dev
```

Start Frontend development server:
```bash
cd frontend
npm run dev
```

---

## 🔗 Key API Endpoints

- `POST /users/register` - Rider Registration
- `POST /users/login` - Rider Login
- `POST /captains/register` - Driver Registration (with Vehicle details)
- `POST /captains/login` - Driver Login
- `GET /maps/get-suggestions?input=...` - Location Autocomplete
- `GET /rides/get-fare?pickup=...&destination=...` - Dynamic Fare Matrix
- `POST /rides/create` - Create Ride Request & Broadcast to Nearby Drivers
- `POST /rides/confirm` - Accept Ride (Driver)
- `GET /rides/start-ride?rideId=...&otp=...` - Verify OTP & Start Ride
- `POST /rides/end-ride` - Complete Ride & Collect Cash Payment
