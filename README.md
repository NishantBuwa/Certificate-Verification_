---
title: Certificate Verification (MERN Stack)
---

# Certificate Verification

A **full‑stack MERN application** that lets administrators issue and verify blockchain‑based certificates (e.g., diplomas, training completions).  Users can search for a certificate by its ID, view verification details, and pay for premium verification services.

## Project Structure

```
certificate-verification/
├─ backend/            # Express API, MongoDB models, payment integration
│   ├─ index.js        # Server entry point
│   ├─ routes/         # API routers (auth, certificate, dashboard, payment)
│   ├─ controller/     # Business logic for each route
│   └─ db.js           # MongoDB connection helper
├─ frontend/           # React 19 UI + Tailwind CSS
│   ├─ src/            # Components, pages, hooks, routing
│   └─ public/         # Static assets (favicon, images)
├─ .env.example        # Template for required environment variables
├─ README.md           # 👉 *You are reading it now*
└─ package.json        # Root scripts, workspace config
```

## How It Works

1. **Authentication** – Admins register and log in via `/api/auth`.  Passwords are hashed with **bcrypt** and JWTs are issued for subsequent calls.
2. **Certificate Storage** – Certificate metadata (owner, blockchain tx hash, status) is stored in MongoDB using **Mongoose** models.
3. **Blockchain Verification** – The back‑end uses the **Tatum SDK** (`@tatumio/tatum`) to query the blockchain for transaction receipts and confirm authenticity.
4. **Payment** – Premium verification requests are processed through **Razorpay** (`razorpay`).
5. **Frontend** – React renders a clean UI, handling login, certificate lookup, dashboard analytics, and payment flow.  Tailwind provides responsive styling.

## Setup & Development Workflow

### Prerequisites
- **Node.js** ≥ 20 (recommended LTS) 
- **npm** (comes with Node) 
- **MongoDB** instance (local or Atlas) 
- **Razorpay** sandbox credentials (if you want to test payments) 
- **Tatum** API key (for blockchain queries)

### 1️⃣ Clone the repo & install dependencies
```bash
git clone <repo‑url>
cd certificate-verification
# Install backend deps
cd backend && npm install && cd ..
# Install frontend deps
cd frontend && npm install && cd ..
```

### 2️⃣ Create an `.env` file
Copy the template and fill in your secrets:
```bash
cp .env.example .env
```
Required variables are:
```
MONGODB_URI=<your‑mongo‑connection>
JWT_SECRET=<strong‑random‑string>
RAZORPAY_KEY_ID=<your‑razorpay‑key-id>
RAZORPAY_KEY_SECRET=<your‑razorpay‑secret>
TATUM_API_KEY=<your‑tatum‑api‑key>
CORS_ORIGIN=http://localhost:3000   # adjust for production URL
```

### 3️⃣ Run the services locally
#### Backend (development mode)
```bash
cd backend
npm install -g nodemon   # if you don't have it globally
nodemon index.js            # listens on PORT 5000 by default
```
#### Frontend
```bash
cd frontend
npm start                   # runs on http://localhost:3000
```
The frontend will proxy API calls to `http://localhost:5000`.

### 4️⃣ Verify the setup
- Open `http://localhost:3000` in a browser. You should see the login page.
- Use Postman or curl to hit `GET http://localhost:5000/health` – you should receive `{ "status": "ok" }`.

### 5️⃣ Development Loop
1. **Make a change** – edit a component, route, or controller.
2. **Save** – `nodemon` / `react-scripts` will hot‑reload automatically.
3. **Test** – run the relevant unit tests (`npm test` in each folder) or manually exercise the UI.
4. **Commit** – follow conventional commits (e.g., `feat: add certificate search`).
5. **Push** – a GitHub Actions workflow (once added) will lint, test, and build automatically.

## Scripts
- **Backend**
  - `npm run dev` – start server with nodemon (if added to `package.json`).
  - `npm test` – placeholder; add Jest tests here.
- **Frontend**
  - `npm start` – start React dev server.
  - `npm run build` – production build placed in `frontend/build`.
  - `npm run lint` – lint with ESLint (set up in future).

## Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feat/your‑feature`).
3. Make your changes, add tests, and ensure `npm run lint && npm test` passes.
4. Open a Pull Request – CI will run lint, tests, and a build preview.

## License
MIT – feel free to use, modify, and share.

---

*This README was generated and formatted to match the project's existing conventions. Feel free to adjust wording or add additional sections (e.g., deployment, FAQ) as the project evolves.*