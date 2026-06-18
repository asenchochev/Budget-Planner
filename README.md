# Budget Shopping Planner

Full-stack MERN приложение за управление на месечен бюджет, списък за пазаруване, разходи по категории, сезонни препоръки и каталог с билки.

## Стек

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt, express-validator
**Frontend:** React 18 + Vite, React Router, Context API, Tailwind CSS, Recharts, Axios

## Структура

```
budget-shopping-planner/
├── backend/    # REST API
└── frontend/   # React SPA
```

## Стартиране локално

### 1. Backend

```bash
cd backend
cp .env.example .env     # попълни MONGO_URI и JWT_SECRET
npm install
npm run dev               # стартира на http://localhost:5000
```

Изисква локален `mongod` или MongoDB Atlas connection string в `MONGO_URI`.

### 2. Frontend

```bash
cd frontend
cp .env.example .env     # по подразбиране сочи към localhost:5000/api
npm install
npm run dev               # стартира на http://localhost:5173
```

## API Endpoints (накратко)

| Метод | Endpoint | Описание |
|---|---|---|
| POST | `/api/auth/register` | Регистрация |
| POST | `/api/auth/login` | Вход |
| GET | `/api/auth/me` | Текущ потребител |
| GET/POST | `/api/budget` | Бюджет за месец |
| GET | `/api/budget/history` | История на бюджетите |
| GET/POST | `/api/items` | Списък продукти |
| PUT/DELETE | `/api/items/:id` | Редакция/изтриване |
| PATCH | `/api/items/:id/purchase` | Маркира купено (генерира разход) |
| GET/POST | `/api/expenses` | Разходи |
| GET | `/api/analytics/dashboard` | Статистики за dashboard |
| GET | `/api/seasonal` | Сезонни продукти |
| GET | `/api/herbs` | Каталог с билки |

Всички endpoint-и освен `/auth/register` и `/auth/login` изискват `Authorization: Bearer <token>` хедър.

## Деплой (идея за портфолио)

- Backend → Render / Railway (+ MongoDB Atlas free tier)
- Frontend → Vercel / Netlify (задай `VITE_API_URL` към production backend URL)

## Възможности за разширение

- AI асистент за "smart shopping list" чрез Anthropic API (предложения за заместители на по-евтини/сезонни продукти)
- Push/email напомняния при наближаване на бюджетния лимит
- Export на месечен отчет в PDF
- Multi-currency поддръжка
