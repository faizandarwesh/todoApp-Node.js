# 📝 Todo API - Node.js Learning Project  

A simple **REST API** for managing todos, built with **Node.js, Express, and MongoDB Atlas**.  

## 🚀 Features  
✅ Add a new todo  
✅ Get all todos  
✅ Get a todo     
✅ Update a todo  
✅ Delete a todo  
✅ Delete all todos 

## 🛠 Tech Stack  
- **Node.js** + **Express.js** (Routing & API)  
- **MongoDB Atlas** (Database) + **Mongoose** (ODM)  
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
```  

4️⃣ **Run the server**  
```sh
npm start  # For normal execution  
npm run dev  # With nodemon (auto-restart)  
```  

## 📂 API Endpoints  

| Method | Endpoint       | Description |
|--------|--------------|-------------|
| **POST**   | `/api/todos`     | Create a new todo |
| **GET**    | `/api/todos`     | Get all todos |
| **GET**    | `/api/todos/:id` | Get a todo by ID |
| **PUT**    | `/api/todos/:id` | Update a todo |
| **DELETE** | `/api/todos/:id` | Delete a todo |

## 📂 Project Structure  
```
📦 todo-api  
 ┣ 📂 config         # Database connection  
 ┣ 📂 controllers    # Business logic  
 ┣ 📂 models        # Mongoose schema  
 ┣ 📂 routes        # API routes  
 ┣ 📜 .env          # Environment variables  
 ┣ 📜 server.js     # Main entry point  
```

## 📌 Future Enhancements  
- Add **user authentication** (JWT)  
- Implement **pagination**  
- Deploy on **Render/Vercel**  

### 📜 License  
This project is open-source under the **MIT License**.  

---  
