# Backend Dev Arena ⚡ (LeetCode for Real-World Backend Development)

A practical, self-contained interactive backend learning application modeled after **LeetCode**, but focused purely on **real-world backend engineering situations** (REST API design, idempotency, JWT stateless authentication, database transactions, solving N+1 queries, Redis cache-aside, rate limiters, circuit breakers, and message brokers).

The curriculum directly mirrors the canonical **roadmap.sh Backend Developer Roadmap**.

---

## 🌟 Key Features

1. **Realistic Scenario-Driven Challenges**:
   - Instead of abstract algorithmic puzzles (like reversing linked lists), every challenge is a real-world scenario (e.g. building an idempotent Stripe-like payment processor, implementing an onion middleware pipeline, fixing an ORM N+1 query bug, preventing duplicate charges, or handling upstream circuit breaker trips).
2. **Interactive IDE & Split-Workspace**:
   - **Scenario & Requirements Pane**: Context, real-world relevance, technical specs, RFC standards, progressive hints, and canonical solutions.
   - **Code Editor Pane**: Line numbers, Tab indentation support, syntax helpers, `Cmd/Ctrl + Enter` test shortcut.
   - **Test Runner & Inspector**: Real-time pass/fail assertions, execution duration in milliseconds, intercepted mock console logs, and database mutation diffs (Before vs After).
3. **Interactive Visual Roadmap Track**:
   - High-level progression tree representing the roadmap stages from the PDF:
     - Stage 01: Foundations (Internet & HTTP Protocols)
     - Stage 02: Core Backend & APIs (RESTful Design, Idempotency, Middleware)
     - Stage 03: Security & Data Access (Stateless JWT, CORS, OWASP, SQL & ACID Transactions)
     - Stage 04: Performance & Scale (Redis Cache-Aside, Rate Limiting, Circuit Breakers, Message Queues)
4. **Decoupled Architecture with Built-in Backend Hook Points**:
   - The frontend communicates through a centralized API service adapter (`js/api-client.js`).
   - Out of the box, it operates seamlessly in **Local Browser Mode** using `localStorage` and client-side sandbox execution.
   - A single setting switch redirects all requests to a remote backend (Node.js, Express, Python FastAPI, Go, etc.).

---

## 📂 Project Architecture

```
backend_devdelopment/
├── index.html               # Main application shell with semantic UI & modal dialogs
├── css/
│   └── styles.css           # Modern dark-mode design system, glassmorphism & responsive layouts
├── js/
│   ├── curriculum-data.js   # Challenge definitions mapped to the roadmap.sh PDF
│   ├── api-client.js        # [BACKEND HOOKS]: Unified API adapter layer
│   ├── code-runner.js       # In-browser execution engine, assertions & mock DB inspector
│   ├── roadmap-graph.js     # Interactive visual roadmap tree renderer
│   └── app.js               # Application state, UI tabs, and event handlers
└── README.md                # Documentation & backend integration guide
```

---

## 🚀 Quick Start (Running Locally)

Because the app is built with pure standard web technologies (HTML5, Vanilla CSS, and JavaScript), **no build step or bundler is required**.

### Option A: Open directly in your browser
Double-click `index.html` or open it directly in Chrome, Firefox, Safari, or Edge:
```bash
open index.html
```

### Option B: Serve with any lightweight static server
Using Python (built into macOS and Linux):
```bash
python3 -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

Using Node `npx serve`:
```bash
npx -y serve -p 3000 .
```

---

## 🔌 Connecting a Real Backend Later

All data queries and mutations pass through `js/api-client.js`. To connect your own server:

### 1. Toggle Remote Backend Mode
- In the app header, click **⚙️ Settings** (or the backend status badge).
- Check **"Route API requests to remote backend"**.
- Enter your backend URL (e.g. `http://localhost:4000/api`).
- Click **"Ping Server (GET /health)"** to test your connection, then click **"Save Settings"**.

### 2. API Contract Specification
Your server should implement the following REST endpoints:

| Method | Endpoint | Description | Expected Response Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health & ping check | `{ "status": "ok", "serverTime": "..." }` |
| `GET` | `/api/curriculum/categories` | List of roadmap categories | `[{ id, title, icon, description }, ...]` |
| `GET` | `/api/curriculum/problems` | All problems or filtered by `?category=` | `[{ id, title, category, difficulty, ... }, ...]` |
| `GET` | `/api/curriculum/problems/:id` | Full problem spec by ID | `{ id, scenario, requirements, starterCode, ... }` |
| `GET` | `/api/user/progress` | User progress & streak | `{ "solvedProblemIds": ["http-status-router"], "streakDays": 2 }` |
| `PUT` | `/api/user/progress` | Save updated user progress | Returns updated progress object |

### 3. Starter Server Implementations

#### Node.js / Express Example (`server.js`):
```javascript
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let userProgress = {
  solvedProblemIds: [],
  submissionsCount: 0,
  streakDays: 1
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

app.get('/api/user/progress', (req, res) => {
  res.json(userProgress);
});

app.put('/api/user/progress', (req, res) => {
  userProgress = { ...userProgress, ...req.body };
  res.json(userProgress);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
```

#### Python FastAPI Example (`main.py`):
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = { "solvedProblemIds": [], "submissionsCount": 0, "streakDays": 1 }

@app.get("/api/health")
def health():
    return {"status": "ok", "timestamp": datetime.datetime.utcnow().isoformat()}

@app.get("/api/user/progress")
def get_progress():
    return db

@app.put("/api/user/progress")
def update_progress(data: dict):
    db.update(data)
    return db
```

---

## 📚 Curriculum Alignment with the PDF Roadmap

The challenges included in this application map directly to milestones from the provided roadmap.sh document:

1. **What is HTTP? / Status Codes / Verbs** ➔ `REST Dispatcher & HTTP Status Code Matrix`
2. **Headers & Content Negotiation** ➔ `HTTP Content Negotiation & Header Parsing`
3. **REST & JSON APIs** ➔ `RESTful Pagination, Sorting & Schema Validation`
4. **Idempotency & Open API Specs** ➔ `Idempotent POST API & Duplicate Prevention`
5. **Architectural Patterns / Middleware** ➔ `The Onion Middleware Pipeline (Koa/Express Engine)`
6. **Error Handling & API Security** ➔ `Standardized RFC 7807 Problem Details Error Handler`
7. **Authentication / Stateless JWT** ➔ `Stateless JWT Auth & Signature Verification`
8. **Web Security & CORS / OWASP** ➔ `CORS Middleware & OWASP Security Headers`
9. **Relational Databases & N+1 Problem** ➔ `Solving the Relational N+1 Query Trap`
10. **ACID & Transactions** ➔ `ACID Database Transaction & Fund Transfer`
11. **Caching & Redis** ➔ `Cache-Aside Pattern with Redis & TTL Invalidation`
12. **Scale / Throttling** ➔ `Sliding Window Rate Limiter & HTTP 429`
13. **Resilience / Circuit Breaker** ➔ `Circuit Breaker Pattern for Resilient Microservices`
14. **Message Brokers (RabbitMQ/Kafka)** ➔ `Asynchronous Message Queue with Dead-Letter Handling`
