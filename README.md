# 🚀 CU Node Starter

A minimal but powerful Node.js + Express + MySQL + TypeScript + Vite starter template.  
Designed for **fast prototyping, exams, and real-world projects** without wasting time on boilerplate setup.

---

## 📖 Story & Motivation

### 🔹 The Problem
Every time I start a new project (for exams, demos, or practice), I waste time on:
- Installing Express, MySQL, TypeScript configs, and dotenv.
- Writing the same DB connection code again and again.
- Figuring out where to put `index.html`, CSS, and frontend assets.
- Setting up routes, sample HTML, and reusable UI components.
- Repeating **boilerplate work** instead of solving the actual problem.

👉 This slows me down, especially in exams where time is critical.

---

### 🔹 The Goal
CU Node Starter exists to make project setup **fast, minimal, and reusable**:
1. **Minimal but powerful** – no bloated frameworks, just what you need.
2. **Separation of concerns** – clean backend (`/src`) + frontend (`/frontend`) + static build (`/public`).
3. **Fast to start** – CLI asks for project name + DB configs → auto-generates `.env`.
4. **Reusable CSS & HTML** – ready-made forms, buttons, tables, etc.
5. **Exam-friendly** – avoids unnecessary complexity like SSR or advanced frameworks.

---

### 🔹 Design Choices
- **Express + MySQL2** → lightweight, reliable, exam-safe stack.
- **TypeScript** → better code safety, fewer forgotten syntax mistakes.
- **Vite** → blazing-fast frontend build system.
- **/frontend → /public** → Vite compiles frontend into `public`, and Express serves it.
- **Simple Routes** → no extra controllers/services (faster coding under exam pressure).
- **Reusable CSS** → forms, buttons, inputs, tables pre-styled.
- **Sample HTML** → quick starting point to copy/modify.

---

### 🔹 Benefits
- ⏱ **Save time** → start coding the real solution, not boilerplate.
- 📦 **Consistency** → predictable structure across projects.
- 🏫 **Exam-ready** → minimalistic and efficient.
- 🔧 **Extensible** → later add React, Vue, Tailwind, authentication, etc. if needed.

👉 In short: **CU Node Starter = No more wasted setup time. Focus on solving the actual problem.**

---

## 📂 Project Structure

```
project-name/
│── .env
│── package.json
│── tsconfig.json
│── vite.config.ts
│
├── src/                  # Backend code
│   ├── index.ts          # Main entry (Express + routes + DB)
│   ├── routes/           # Express routes
│   │   └── sample.ts
│   ├── db.ts             # MySQL connection
│   └── utils/            # Helper functions (optional)
│
├── frontend/             # Frontend source (compiled by Vite)
│   ├── index.html        # Main entry page
│   ├── css/
│   │   └── styles.css    # Base reusable styles
│   └── ts/
│       └── main.ts       # Example frontend logic
│
└── public/               # Vite build output (served by Express)
    └── ...               # index.html, js, css after build
```

---

## ⚡ Getting Started

1. Install the package:
```bash
npx cu-node-starter
```

2. Answer setup questions:
   - Project name
   - Database name
   - DB user, password, host, port

3. Start coding 🚀

---

## 📝 License
MIT – use it freely for exams, projects, and beyond.
```
