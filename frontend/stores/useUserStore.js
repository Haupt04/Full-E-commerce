import { create } from "zustand";
import axios from "../src/lib/axios"
import {toast} from "react-hot-toast" 


export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({name, email, password, confirmPassword}) => {
        set({loading: true});

        if (password !== confirmPassword){
            set({ loading: false});
            return toast.error("Password do not match")
        }

        try {
            const res = await axios.post("/auth/signup", {name, email, password});
            set({ user: res.data, loading: false})
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || "An error occurred");
        }
    },

    login: async ({email, password}) => {
        set({loading: true});

        try {
            const res = await axios.post("/auth/login", {email, password});
            console.log("User is here", res.data)
            set({ user: res.data, loading: false})
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || "An error occurred");
        }
    },

    logout: async () => {
        try {
            await axios.post("/auth/logout");
            set({user: null});
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during logout")
        }
    },

    checkAuth: async () => {
        set({checkingAuth: true})
        try {
            const response = await axios.get("/auth/profile");
            set({ user: response.data, checkingAuth: false});
        } catch (error) {
            set({checkingAuth: false, user:null})
            console.log(error.message)
        }
    },
    refreshToken: async () => {
        // Prevent multiple simultaneous refresh attempts
        if (get().checkingAuth) return ;

        set({checkingAuth: true});
        try {
            const response = await axios.post("/auth/refresh-token")
            set({checkingAuth: false});
            return response.data;
        } catch (error) {
            set({user: null, checkingAuth: false});
            throw error;
        }
    }
}));

 // Refresh Access Token after 15 mins
 let refreshPromise = null;
 
 axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Wait for it to complete if the refresh is already in process
                if (refreshPromise){
                    await refreshPromise;
                    return axios(originalRequest)
                }

                // Create a new refresh token
                refreshPromise = useUserStore.getState().refreshToken()
                await refreshPromise;
                refreshPromise = null;

                return axios(originalRequest)
            } catch (refreshError) {
                // refresh fails then redirect to login
                useUserStore.getState().logout()
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
 )