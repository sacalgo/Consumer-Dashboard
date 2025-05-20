# Customer Dashboard

A monorepo project built using React, Next.js, TypeScript on the frontend and Node.js, Express.js, TypeScript, Kafka on the backend.

## 📁 Folder Structure

```
customer-dashboard/
├── apps/
│   ├── backend/                # Express + Kafka backend service
│   │   ├── src/
│   │   │   ├── kafka/          # Kafka consumer logic
│   │   │   └── index.ts        # Express server entry
│   │   └── tsconfig.json
│   └── frontend/               # Next.js frontend app
│       ├── pages/              # Next.js pages
│       └── tsconfig.json
├── packages/
│   └── shared-types/           # Shared TypeScript interfaces/types
│       ├── index.ts
│       └── package.json
├── docker-compose.yml          # Kafka + Zookeeper setup
├── package.json                # Root config with workspaces
├── tsconfig.json               # Root TypeScript config
└── README.md
```

## 🚀 Project Setup

### 1. Clone the repo

```bash
git clone https://github.com/sacalgo/customer-dashboard.git
cd customer-dashboard
```

### 2. Install dependencies (Root)

```bash
npm install
```

> This will install all dependencies across all workspaces.

### 3. Setup Kafka (using Docker)

Make sure Docker is installed and running.

```bash
docker-compose up -d
```

This sets up:

* Zookeeper on port `2181`
* Kafka on port `9092`

> If Docker isn't running, fix the Docker daemon or restart Docker Desktop.

### 4. Backend Setup

```bash
cd apps/backend
npm install
npm run dev
```

* Express server runs on [http://localhost:3001](http://localhost:3001)
* Live data endpoint: `/live`
* History data endpoint: `/history`

### 5. Frontend Setup

```bash
cd apps/frontend
npm install
npm run dev
```

* Frontend runs on [http://localhost:3000](http://localhost:3000)

## 🔧 Scripts

### Backend

| Script        | Description                    |
| ------------- | ------------------------------ |
| `npm run dev` | Start backend with ts-node-dev |

### Frontend

| Script        | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start Next.js dev server |

## 🧠 Kafka Troubleshooting

* **Docker must be running**: Ensure Docker daemon is active
* **Port issues**: If 9092 or 2181 are in use, update the ports in `docker-compose.yml`
* **Consumer not connecting**: Make sure the backend Kafka client is targeting `localhost:9092`

## 📌 Notes

* Shared types across frontend/backend are managed via the `packages/shared-types` package
* This is a monorepo using `npm workspaces`, no need to `npm install` separately inside packages.

---

Let me know if you'd like to add tests, CI, or deploy instructions!
