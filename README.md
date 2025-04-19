**E-Commerce**
![E-commerce](https://github.com/user-attachments/assets/a65a0aed-4fd5-4231-b25f-73204ad06d87)


![E-commerce 2](https://github.com/user-attachments/assets/b9f32345-ee3c-42d6-9cb8-3541e10968fb)

A full-stack e-commerce application built with modern technologies, featuring authentication, product and category management, shopping cart, checkout, admin dashboard, and sales analytics.

## Features

**Tech Stack**: Node.js, MongoDB, Express, Redis, Tailwind CSS  
**Authentication**: JSON Web Tokens (JWT) with refresh and access tokens  
**Payments**: Stripe integration  
**Caching**: Redis  
**Media Uploads**: Cloudinary 


- User registration and login  
- Secure authentication system  
- Browse products by category  
- Add and remove items from shopping cart  
- Apply coupon codes during checkout  
- Stripe-based checkout process  
- Admin dashboard for managing products, categories, and orders  
- View sales analytics and reports  
- Responsive design with Tailwind CSS  
- Caching frequently accessed data using Redis  
- Environment-based configuration support  

## Installation & Setup

1. Clone the repository:
```bash
  git clone https://github.com/your-username/your-repo-name.git
  cd your-repo-name
```

2. Install dependencies:
```bash
  npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary credentials (MongoDB URI, JWT secret, Cloudinary keys, etc.).

4. Start the development server:
```bash
  npm run dev
```

## Project Structure
```
/e-commerce-app
│── backend  # Node.js & Express backend
│── frontend # React.js frontend
│── .env     # Environment variables
│── package.json
│── README.md
```
## Usage

- Users can create an account or use the admin account - which has access to the admin dashboard:
  - **Username:** `korra@gmail.com`
  - **Password:** `123456`

## Deployment
This application is fully deployable. Ensure that your environment variables are correctly configured for production.

It is live on at https://full-e-commerce-jrg5.onrender.com

Note: The website will spin down with inactivity, which can delay requests by 50 seconds or more.

## Acknowledgements
This project was created with the help of the following tutorial:
 FREE Coding Bootcamp - Build 4 Full Stack Projects in 23 Hours ([YouTube Link](https://www.youtube.com/watch?v=MDZC8VDZnV8)) by Codesistency.

