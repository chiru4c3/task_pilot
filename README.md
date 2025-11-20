# Task Manager - MERN Stack Application

A full-stack task management application built with MongoDB, Express.js, React.js, and Node.js.

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
npm start
```
Server runs on `http://localhost:3002`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:5173`

## 📋 Features

- ✅ Create, Read, Update, Delete tasks
- ✅ Task status management (Pending/Completed)
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Form validation
- ✅ MongoDB integration
- ✅ RESTful API
- ✅ Error handling

## 🛠️ Tech Stack

**Backend**: Node.js, Express, MongoDB, Mongoose
**Frontend**: React, Vite, CSS3
**Database**: MongoDB Atlas

## 📁 Project Structure

```
task_pilot/
├── backend/
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── controllers/taskController.js
│   ├── db/mockDb.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTask.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── AddTask.css
│   │   │   └── TaskList.css
│   │   ├── services/taskService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/health` | Health check |

## 🌐 Deployment

### Backend on Render
1. Push code to GitHub
2. Go to render.com
3. Create Web Service
4. Connect GitHub repository
5. Set environment variables (MONGO_URI, NODE_ENV)
6. Deploy

Backend URL: `https://task-manager-api.onrender.com`

### Frontend on Vercel
1. Go to vercel.com
2. Import GitHub repository
3. Set root directory: `frontend`
4. Set environment variable (VITE_API_URL)
5. Deploy

Frontend URL: `https://task-manager-xxx.vercel.app`

## 🧪 Testing

### Create Task
```bash
curl -X POST http://localhost:3002/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Testing","status":"Pending"}'
```

### Get All Tasks
```bash
curl http://localhost:3002/api/tasks
```

### Health Check
```bash
curl http://localhost:3002/health
```

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskpilot?retryWrites=true&w=majority
PORT=3002
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com/api/tasks
```

## 🔒 Security

- CORS enabled
- Input validation
- Error handling
- Environment variables protected
- MongoDB authentication

## 📊 Performance

- Backend response: < 100ms
- Frontend load: < 2s
- Optimized queries with indexes
- CSS minified
- JavaScript bundled with Vite

## 🤝 Contributing

Fork, create branch, commit, push, and create pull request.

## 📄 License

MIT License

## 👨‍💻 Author

Chiranjeevi Maktha

---

**Status**: Production Ready ✅
**Version**: 1.0.0
