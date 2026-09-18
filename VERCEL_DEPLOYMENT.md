# How to Deploy myRide to Vercel

This repository is fully configured for single-repo Vercel deployment with Node.js Express serverless API routes (`/users`, `/captains`, `/maps`, `/rides`) and React Vite frontend.

## 🚀 Quick Deployment Steps

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push Changes to GitHub**:
   Commit and push all changes to your GitHub repository `https://github.com/deepakthakur9199/myRide`.
   ```bash
   git add .
   git commit -m "Fix myRide end-to-end bugs & configure Vercel deployment"
   git push origin main
   ```

2. **Import Project into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new).
   - Import your repository **`deepakthakur9199/myRide`**.
   - Keep Framework Preset as **Other** or **Vite** (Vercel automatically detects `vercel.json`).

3. **Configure Environment Variables**:
   In the Vercel project settings, add the following Environment Variables:
   - `DB_CONNECT`: Your MongoDB Atlas connection URI string (e.g. `mongodb+srv://<user>:<password>@cluster0.mongodb.net/myride`)
   - `JWT_SECRET`: A secure secret string for signing JWT tokens (e.g. `myride_super_secret_jwt_key`)
   - `GOMAPS_API`: (Optional) Your GoMaps / Google Maps API Key. If omitted, built-in fallback coordinates and distances are used automatically.
   - `VITE_BASE_URL`: Leave blank or set to your Vercel deployment URL (e.g. `https://my-ride.vercel.app`).

4. **Deploy**:
   Click **Deploy**. Vercel will build both the frontend static assets and serverless API handlers.

---

### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```
Follow the prompts and add environment variables when prompted or in the Vercel Dashboard settings.

---

## 🛠 Features Fixed & Included
- **End-to-End Ride Flow**: User registration -> Find trip -> Select vehicle -> Create ride -> Captain accept -> OTP verification -> Start ride -> Finish ride.
- **Auto Fallbacks**: Full working map/geocode/distance fallbacks if Google Maps API key is not supplied.
- **Vercel Serverless Ready**: Handled via `api/index.js` and `vercel.json`.
