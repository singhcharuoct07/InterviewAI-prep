# InterviewAI-prep 🤖

An AI-powered interview preparation platform that helps users practice interviews, generate interview questions, and receive AI-based feedback and reports.

## 🚀 Features

* 🔐 User registration and authentication
* 🧑‍💻 Protected interview routes
* 🤖 AI-powered interview generation and evaluation
* 📄 Resume/PDF processing
* 📝 Interview reports and performance analysis
* 📊 Structured interview feedback
* 🔑 JWT-based authentication
* 📁 File upload support
* 🌐 React-based interactive frontend
* ⚡ Express.js backend API

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Sass
* Three.js
* React Three Fiber

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Multer
* Puppeteer
* Google Gemini / Google GenAI
* Zod

## 📁 Project Structure

```text
InterviewAI-prep/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── route/
│   │   └── services/
│   ├── server.js
│   ├── package.json
│   └── postman_collection.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   └── style/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/singhcharuoct07/InterviewAI-prep.git
cd InterviewAI-prep
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

Open another terminal or return to the project root:

```bash
cd frontend
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_genai_api_key
```

> Never commit your `.env` file or API keys to GitHub.

## ▶️ Running the Application

### Start the backend

From the `backend` directory:

```bash
npm run dev
```

The backend will run using the development server.

### Start the frontend

From the `frontend` directory:

```bash
npm run dev
```

Vite will provide a local development URL in the terminal.

## 🔄 Application Flow

```text
User
 │
 ▼
React Frontend
 │
 │ HTTP Requests
 ▼
Express.js Backend
 │
 ├── Authentication
 │
 ├── Interview APIs
 │
 ├── Resume/File Processing
 │
 ├── AI Service
 │
 ▼
MongoDB
 │
 ▼
Interview Reports
```

## 🧠 AI Interview System

The application integrates Google's GenAI services to support AI-powered interview functionality.

The backend contains a dedicated AI service responsible for communicating with the AI model and processing interview-related requests.

## 📄 Interview Reports

After an interview, the system can generate structured interview reports containing feedback and performance information.

These reports are associated with users and stored through the backend using MongoDB/Mongoose models.

## 🔒 Security

The application includes:

* JWT authentication
* Password hashing with bcrypt
* Protected routes
* Authentication middleware
* Token blacklist handling
* Environment-based secrets
* File upload middleware

## 🧪 API Testing

A Postman collection is included in:

```text
backend/postman_collection.json
```

You can import this collection into Postman to test the backend APIs.

## 📌 Future Improvements

* [ ] Add real-time interview sessions
* [ ] Improve AI-generated interview feedback
* [ ] Add interview difficulty levels
* [ ] Add interview history dashboard
* [ ] Add performance analytics
* [ ] Add voice-based interviews
* [ ] Add coding interview support
* [ ] Deploy frontend and backend
* [ ] Add automated testing
* [ ] Add CI/CD pipeline

## 👨‍💻 Author

**Charu Singh**

GitHub: [@singhcharuoct07](https://github.com/singhcharuoct07)

## ⭐ Contributing

Contributions, suggestions, and improvements are welcome.

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

**InterviewAI-prep** — Practice smarter. Interview better. 🚀
