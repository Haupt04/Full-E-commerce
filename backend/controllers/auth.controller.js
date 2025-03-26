import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { redis } from "../lib/redis.js"

const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    })
    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    })

    return {accessToken, refreshToken}
}

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token: ${userId}`, refreshToken, "EX", 7*24*60*60)
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}

export const signup = async (req, res) => {
    try {
        const {email, password, name} = req.body;
        const userExists = await User.findOne({email})

        if (userExists) {
            return res.status(400).json({message: "User already exists"})
        }

        const user = await User.create({name, password,email})
        
        // authenticate user
        const {accessToken, refreshToken} = generateTokens(user._id)
        await storeRefreshToken(user._id, refreshToken);

        setCookies(res, accessToken, refreshToken)

        
        res.status(201).json({user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }, message: "User created successfully"})
    } catch (error) {
        res.status(500).json({message: "Failed to create user"})
        console.log("Error in signup function: ", error.message)
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findById({email})
    } catch (error) {
        
    }
}


export const logout = async (req, res) => {
    try {

    } catch (error) {
        
    }
}