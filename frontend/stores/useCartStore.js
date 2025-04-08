import {create} from 'zustand'
import {toast} from "react-hot-toast"
import axiosInstance from '../src/lib/axios';

export const useCartStore = create((set, get) => ({
    cart:[],
    coupon:null,
    total:0,
    subtotal:0,

    getCartItems: async () => {
        try {
            const res = await axiosInstance.get("/cart");
            set({cart: res.data})
            get().calculateTotals();
        } catch (error) {
            set({cart: []})
            toast.error(error.response.data.message || "An error occurred")
        }
    },
    getMyCoupon: async () => {
        try {
            console.log("Fetching coupon for user");
            const response = await axiosInstance.get("/coupons");
            console.log("Fetched coupon data:", response.data);
            set({coupon: response.data.coupon});
        } catch (error) {
            console.log("Error fetching coupon:", error)
        }
    },

    applyCoupon: async (code) =>  {
        try {
            const response = await axiosInstance.post("/coupons/validate", {code});
            set({coupon: response.data, isCouponApplied: true})
            get().calculateTotals();
            toast.success("Coupon applied successfully")
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply coupon")
        }
    },

    removeCoupon: () => {
        set({coupon: null, isCouponApplied: false});
        get().calculateTotals();
        toast.success("Coupon removed")
    },


    clearCart: async () => {
        set({cart: [], coupon: null, total: 0, subtotal: 0})
    },

    addToCart: async (product) => {
        try {
            await axiosInstance.post("/cart", {productId: product._id});
            toast.success("Product added to cart")

            set((prevState)=> {
                const existingItem = prevState.cart.find((item) => item._id === product._id);
                const newCart = existingItem ? prevState.cart.map((item) => (item._id === product._id ? {...item, quantity:item.quantity + 1} : item))
                : [...prevState.cart, {...product, quantity: 1}]
                return { cart: newCart}
            })
            get().calculateTotals();
        } catch (error) {
            toast.error(error.response.data.message || "Error adding item to cart")
        }
    }, 

    calculateTotals: () => {
        const {cart, coupon} = get();
        const subtotal = cart.reduce((sum,item) => sum + item.price * item.quantity, 0)
        let total = subtotal
        

        if (coupon){
            const discount = subtotal * (coupon.discountPercentage / 100)
            total = subtotal - discount
        }

        set({subtotal, total})
    }, 
    removeFromCart: async (productId) => {
        await axiosInstance.delete(`/cart`, { data: { productId}} );
        set(prevState => ({cart: prevState.cart.filter(item => item._id !== productId)}))
        get().calculateTotals();
    },
    updateQuantity: async (productId, quantity) => {
        if (quantity === 0) {
            get().removeFromCart(productId)
            return
        }

        await axiosInstance.put(`/cart/${productId}`, {quantity})
        set((prevState) => ({
            cart: prevState.cart.map((item) => (item._id === productId ? {...item, quantity} : item))
        }))
        get().calculateTotals()
    },
}))