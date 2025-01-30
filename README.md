E-commerce Authentication & Product Upload System

This is a simple e-commerce project that includes user authentication (sign-up and login) and product upload functionality. The system uses session-based authentication.

Features

User Registration

User Login & Logout

Session-based Authentication

Product Upload

Technologies Used

Backend: Node.js, Express.js

Database: MongoDB

Authentication: Express-session

Installation

Clone the Repository

git clone https://github.com/your-username/your-repository.git
cd your-repository

Install Dependencies

npm install

Configure Environment Variables

Create a .env file in the root directory

Add the following variables:

PORT=3000
MONGO_URI = mongodb://localhost:27017/appblog


Run the Server

npm start

The server will run on http://localhost:5000.

API Endpoints

Authentication

POST /api/auth/signup - Register a new user

POST /api/auth/login - Login with email and password

GET /api/auth/logout - Logout the user
delete /users/id  - delete user

Product Upload

POST /api/products/upload - Upload a new product (Authenticated users only)

GET /api/products - Get all uploaded products
delete /api/product/id
put /api/product/id

Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome!

License

This project is licensed under the MIT License.


