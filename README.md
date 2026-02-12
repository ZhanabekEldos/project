# Blog Project (Backend + Frontend)

Учебный full-stack проект блога с ролевой моделью доступа.

- `blog-backend`: REST API (Node.js, Express, MongoDB, JWT, RBAC)
- `blog-frontend`: простой клиент на Vanilla HTML/CSS/JS

## 1. Цель проекта
Проект реализует базовую платформу блога:
- регистрация и логин пользователей;
- роли пользователей (`admin`, `author`, `reader`);
- управление постами (CRUD + публикация/снятие с публикации);
- комментарии к постам;
- защищенные маршруты по JWT.

## 2. Технологии
### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- `bcrypt` для хеширования паролей
- `express-validator` для валидации
- `cors`, `morgan`, `dotenv`

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES Modules)
- локальное хранение токена в `localStorage`

## 3. Архитектура
### Backend слои
- **Routes**: принимают HTTP-запросы и назначают middleware/controller.
- **Middleware**:
  - `auth.js` — проверка JWT;
  - `requireRole.js` — проверка роли;
  - `errorHandler.js` — единый формат ошибок.
- **Controllers**: бизнес-логика по сущностям (`auth`, `users`, `posts`, `comments`).
- **Models**: схемы MongoDB (`User`, `Post`, `Comment`).

### Схема доступа
- `reader`: чтение постов, создание комментариев.
- `author`: права `reader` + создание/редактирование/удаление своих постов.
- `admin`: полный доступ (включая список пользователей).

## 4. Структура проекта
```text
project/
  blog-backend/
  blog-frontend/
```

## 5. Быстрый запуск
## 5.1. Backend
```powershell
cd "c:\Users\zhana\OneDrive\Рабочий стол\project\blog-backend"
npm install
```

Создайте/проверьте `.env`:
```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/blogdb
JWT_SECRET=super_secret_change_me
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173,http://localhost:5500
```

Запуск:
```powershell
npm run dev
```

Проверка:
- `GET http://localhost:4000/health` → `{ "ok": true }`

## 5.2. Frontend
Из корня проекта:
```powershell
cd "c:\Users\zhana\OneDrive\Рабочий стол\project"
npx http-server . -p 5500
```

Открыть:
- `http://localhost:5500/blog-frontend/index.html`

Важно: не открывать через `file://`, только через локальный сервер.

## 6. API (краткая карта)
Базовый URL: `http://localhost:4000`

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (Bearer token)

### Users
- `GET /api/users/profile` (Bearer)
- `PUT /api/users/profile` (Bearer)
- `GET /api/users` (Bearer, только `admin`)

### Posts
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts` (Bearer, `admin|author`)
- `PUT /api/posts/:id` (Bearer, владелец или `admin`)
- `DELETE /api/posts/:id` (Bearer, владелец или `admin`)
- `PATCH /api/posts/:id/publish` (Bearer, владелец или `admin`)
- `PATCH /api/posts/:id/unpublish` (Bearer, владелец или `admin`)

### Comments
- `GET /api/posts/:id/comments`
- `POST /api/posts/:id/comments` (Bearer)
- `DELETE /api/comments/:id` (Bearer, владелец или `admin`)

## 7. Пример запросов (Postman)
### Регистрация
`POST /api/auth/register`
```json
{
  "username": "eldos",
  "email": "zhanabekeldos@gmail.com",
  "password": "123test",
  "role": "admin"
}
```

### Логин
`POST /api/auth/login`
```json
{
  "email": "zhanabekeldos@gmail.com",
  "password": "123test"
}
```

Ответ содержит `token`. Далее для защищенных маршрутов:
```http
Authorization: Bearer <token>
```

### Создание поста
`POST /api/posts`
```json
{
  "title": "My first post",
  "content": "Post content",
  "excerpt": "Short text",
  "coverImageUrl": "https://example.com/image.jpg",
  "tags": ["node", "express"],
  "category": "backend"
}
```

### Комментарий
`POST /api/posts/:id/comments`
```json
{
  "text": "Great post!"
}
```

## 8. Как демонстрировать проект на защите
Рекомендуемый сценарий demo (3-5 минут):
1. Показать `GET /health`.
2. Зарегистрировать пользователя `author`.
3. Выполнить логин и показать JWT.
4. Создать пост (как `author`).
5. Получить список постов.
6. Опубликовать пост (`publish`).
7. Добавить комментарий под постом.
8. Показать ограничение ролей (например, `reader` не может создать пост).
9. Войти как `admin` и показать `GET /api/users`.

## 9. Что важно для преподавателя (обоснование решений)
- Разделение ответственности по слоям (routes/controllers/models/middleware).
- JWT-аутентификация и role-based access control.
- Валидация входных данных через `express-validator`.
- Защита паролей через `bcrypt`.
- Централизованная обработка ошибок.
- CRUD-операции по основным сущностям + бизнес-операции (`publish/unpublish`).

## 10. Возможные улучшения
- Пагинация и лимиты в `GET /api/posts`.
- Rate limiting для auth-маршрутов.
- Refresh token механизм.
- Unit/integration тесты.
- Docker Compose для API + MongoDB.
- CI pipeline (lint/test/build).

## 11. Частые проблемы
- `Failed to fetch` на фронтенде:
  - проверить `CORS_ORIGIN` в backend `.env`;
  - убедиться, что frontend открыт через `http-server`, а не `file://`.
- `404 Not found`:
  - проверить правильный URL (`/api/...`);
  - убедиться, что запущен именно этот backend на порту `4000`.
- `401 Unauthorized`:
  - отсутствует или неверный `Bearer token`.

## 12. Автор
Учебный проект для демонстрации backend/frontend интеграции и защиты по дисциплине web-разработки.
