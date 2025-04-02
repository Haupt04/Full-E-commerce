import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import productsRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import analyticsRoutes from "./routes/analytic.route.js"
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"


dotenv.config() // Allow us to access the environment variable 

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json({limit: '10mb'})) // ready parse data
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/products",productsRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/coupons", couponRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/analytics", analyticsRoutes)


app.listen(PORT, () => {
    connectDB(); //Connecting Database 
    console.log("Server is running on port:", PORT)
})