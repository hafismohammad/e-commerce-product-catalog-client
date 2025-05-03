# 🛍️ E-Commerce Product Catalog (MERN Stack)

A modern and responsive product catalog system built using the MERN stack (MongoDB, Express, React, Node.js) to manage and display products with filtering and search capabilities.

## 🔧 Tech Stack

- **Frontend**: React, Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Uploads**: Cloudinary + Multer
- **Other**: Centralized error handling, repository pattern, constant status codes

## 🚀 Features

- Product listing with grid view
- Add, edit, delete products
- Form validation
- Search by name, filter by category & price range
- Image upload and hosting on Cloudinary
- User notifications via Toastify
- Confirmation dialogs via SweetAlert2
- Fully responsive design

## 📁 Structure

- `client/`: React app with Redux for state management
- `server/`: Express API using repository pattern
- Centralized error middleware and modular route handling

## 📦 Server API Routes

- `POST /api/products` – Add a product  
- `GET /api/products` – Get all products (supports filtering by category, price, search query)  
- `GET /api/products/:id` – Get a single product by ID  
- `PUT /api/products/:id` – Update a product  
- `DELETE /api/products/:id` – Delete a product 


## 🛠️ Project Setup

### Server

```bash
cd server
npm install
npm run dev  # runs server with nodemon
