import {createNewCoupon} from '../controllers/payment.controller.js'
import { Coupon } from "../models/coupon.model.js"

export const getCoupon = async (req, res) => {
	 try {
		const coupon = await createNewCoupon(req.user._id);
		res.status(200).json({ message: "Coupon created", coupon });
	  } catch (err) {
		res.status(500).json({ message: "Error creating coupon", error: err.message });
	  }
	};

export const validateCoupon = async (req, res) => {
	try {
		const { code } = req.body;
		const coupon = await Coupon.findOne({ code: code, userId: req.user._id, isActive: true });

		if (!coupon) {
			return res.status(404).json({ message: "Coupon not found" });
		}

		if (coupon.expirationDate < new Date()) {
			coupon.isActive = false;
			await coupon.save();
			return res.status(404).json({ message: "Coupon expired" });
		}

		res.json({
			message: "Coupon is valid",
			code: coupon.code,
			discountPercentage: coupon.discountPercentage,
		});
	} catch (error) {
		console.log("Error in validateCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};