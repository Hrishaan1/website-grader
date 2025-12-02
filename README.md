# Website Grader

Fullstack project: Next.js frontend and Node/Express backend that analyzes websites (speed, mobile, content, SSL) using Puppeteer and Cheerio.

Quick start

1. Backend

cd backend
npm install
npm start

Server runs at http://localhost:5000 and exposes /analyze?url=<url>

2. Frontend

cd frontend
npm install
npm run dev

Open http://localhost:3000. Enter a URL and analyze. The frontend proxies the request to the backend at http://localhost:5000/analyze

Notes
- Puppeteer downloads Chromium; ensure your environment has enough disk space.
- On macOS, you may need to allow network connections for the headless browser.
# Small Business Website Grader

A simple tool that analyzes any small business website and generates a clean, human-readable report with suggestions written in normal English (not technical jargon). The purpose is to help small business owners understand what’s wrong with their websites — and optionally hire you to fix them.

This project has two parts:

- **Frontend** (Next.js + Tailwind CSS)
- **Backend Analyzer** (Node.js + Express + Puppeteer)

---

## Features (MVP)

### ✔ URL Analyzer
Enter any website URL and the backend runs checks for:
- Mobile friendliness (via Puppeteer)
- Load time / speed score
- SSL / HTTPS presence
- Missing contact info on homepage
- Missing business hours
- Missing call-to-action (CTA) elements
- Broken links (simple check)
- Readability / color contrast (basic text analysis)

### ✔ Human-Friendly Report
Results are displayed in clear categories:
- Speed Score  
- Mobile Score  
- Design/Readability Score  
- Content Score  
- Overall Grade (A–F)

### ✔ Optional PDF Export (later)
Allows users to download a report they can share or you can use for outreach.

---

## Project Structure

``` shell
website-grader/
│
├── frontend/                   # Next.js frontend app
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   └── logo.png
│   └── src/
│       ├── pages/
│       │   ├── index.js        # Landing page
│       │   ├── report.js       # Displays analysis report
│       │   └── api/
│       │       └── analyze.js  # Proxy to backend analyzer
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── ScoreCard.jsx
│       │   └── LoadingSpinner.jsx
│       └── styles/
│           └── globals.css
│
├── backend/                    # Node backend analyzer
│   ├── package.json
│   ├── server.js               # Express server
│   ├── analyzer/
│   │   ├── index.js            # Main analyzer logic
│   │   ├── fetchSpeed.js       # Fetch timing
│   │   ├── mobileTest.js       # Mobile viewport tests using Puppeteer
│   │   ├── contentScan.js      # Checks contact info, hours, CTA presence
│   │   ├── sslCheck.js         # Checks HTTPS
│   │   └── score.js            # Calculates A-F score
│   └── utils/
│       └── getHTML.js          # Fetches & sanitizes site HTML
│
└── README.md                   # Project instructions
``` 

---

## Tech Stack

### Frontend
- **Next.js**
- **React**
- **Tailwind CSS**

### Backend
- **Node.js**
- **Express**
- **Puppeteer**
- **Cheerio** for HTML parsing

---

## How to Run

### 1. Install frontend
```bash
cd frontend
npm install
npm run dev
```

### 2. Install Backend
```bash
cd backend
npm install
node server.js
```

### 3. Visit the app
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000/analyze?ur=<your-url>`

---

## Notes
- Puppeteer requires the Chromium binary; first run may take time.
- Some sites block scraping; handle gracefully.
- Only run backend locally or on a server that allows headless browsing.

---

## Purpose

This project was to give small business owners a simple way to understand their website quality - and provide developers with a lead-generation tool. 