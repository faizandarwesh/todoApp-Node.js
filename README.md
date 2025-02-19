

# 📝 Todo API - Node.js Learning Project  

A simple **REST API** for managing todos, built with **Node.js, Express, and MongoDB Atlas**.  

## 🚀 Features  
✅ Add a new todo  
✅ Get all todos  
✅ Get a todo  
✅ Update a todo  
✅ Delete a todo  
✅ Delete all todos  
✅ **User authentication (JWT, Refresh Token, Cookies)**  
✅ **Login & Register APIs**  

## 🛠 Tech Stack  
- **Node.js** + **Express.js** (Routing & API)  
- **MongoDB Atlas** (Database) + **Mongoose** (ODM)  
- **jsonwebtoken (JWT)** (Authentication)  
- **bcryptjs** (Password hashing)  
- **cookie-parser** (Storing refresh token)  
- **dotenv** (Environment variables)  
- **cors** (Middleware for CORS handling)  

## 📌 Installation & Setup  

1️⃣ **Clone the repo**  
```sh
git clone https://github.com/yourusername/todo-api.git  
cd todo-api  
```  

2️⃣ **Install dependencies**  
```sh
npm install  
```  

3️⃣ **Set up environment variables** (`.env` file)  
```env
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
REFRESH_TOKEN_SECRET=your_refresh_token_secret  
```  

4️⃣ **Run the server**  
```sh
npm start  # For normal execution  
npm run dev  # With nodemon (auto-restart)  
```  

## 📂 API Endpoints  

### 📝 Todo APIs  

| Method  | Endpoint       | Description |
|---------|--------------|-------------|
| **POST**   | `/api/todos`     | Create a new todo (Auth required) |
| **GET**    | `/api/todos`     | Get all todos (Auth required) |
| **GET**    | `/api/todos/:id` | Get a todo by ID (Auth required) |
| **PUT**    | `/api/todos/:id` | Update a todo (Auth required) |
| **DELETE** | `/api/todos/:id` | Delete a todo (Auth required) |

### 🔐 Authentication APIs  

| Method  | Endpoint       | Description |
|---------|--------------|-------------|
| **POST**   | `/api/auth/register`   | Register a new user |
| **POST**   | `/api/auth/login`      | Login & get JWT tokens |
| **POST**   | `/api/auth/refresh`    | Refresh access token |
| **POST**   | `/api/auth/logout`     | Logout user & clear cookies |

### 🛠 Authentication Flow  
1️⃣ User **registers** using `/api/auth/register` (hashed password stored in DB).  
2️⃣ User **logs in** with `/api/auth/login`, receiving:  
   - **Access Token** (short-lived, used for API requests)  
   - **Refresh Token** (stored in cookies, used for getting new access token)  
3️⃣ When the access token expires, the user calls `/api/auth/refresh` to get a new one.  
4️⃣ User logs out via `/api/auth/logout`, clearing the refresh token.  

## 📂 Project Structure  
```
📦 todo-api  
 ┣ 📂 config         # Database connection  
 ┣ 📂 controllers    # Business logic  
 ┣ 📂 models        # Mongoose schemas  
 ┣ 📂 routes        # API routes  
 ┣ 📂 middleware    # Authentication middleware  
 ┣ 📜 .env          # Environment variables  
 ┣ 📜 server.js     # Main entry point  
```

## 📌 Future Enhancements  
- Implement **pagination** for todos  
- Deploy on **Render/Vercel**  
- Add **role-based authorization**  

### 📜 License  
This project is open-source under the **MIT License**.  
