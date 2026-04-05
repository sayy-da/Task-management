
📌 Overview

This is a Task Management backend built using Node.js and MongoDB. Users can create, update, delete, and filter tasks.

🚀 Features Create task Edit task Delete task Filter tasks (All / Pending / In Progress / Completed) Loading, empty, and error states

🧠 SOLID Principles Used

src/
 ├── config/       # Database and environment configuration
 ├── constants/    # App constants and enums
 ├── controller/   # Handles HTTP requests
 ├── entity/       # Mongoose models
 ├── repository/   # Database logic
 ├── routes/       # API endpoints
 ├── service/      # Business logic
 └── app.js        # Express app setup

⚙️ Setup 

npm install 
connect to mongoDB
npm run dev
