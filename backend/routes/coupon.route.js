import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getCoupon, validateCoupon } from '../controllers/coupon.controller.js';
// import {createNewCoupon} from "../controllers/payment.controller.js"

const router = express.Router();

router.get("/", protectRoute, getCoupon)
router.post("/validate", protectRoute, validateCoupon)
// router.get("/test-coupon",protectRoute, async (req, res) => {
//     try {

//       const coupon = await createNewCoupon(req.user._id);
//       res.status(200).json({ message: "Coupon created", coupon });
//     } catch (err) {
//       res.status(500).json({ message: "Error creating coupon", error: err.message });
//     }
//   });


export default router