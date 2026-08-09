import { sendResponse } from "../../handlers/response.handler.js";
import { Request, Response, NextFunction } from "express";
import authService from "../../services/auth/auth.service.js";

const cookieOptions = {
    httpOnly: true, // Prevents client-side JS from accessing the cookies (XSS protection)
    secure: process.env.NODE_ENV === "production", // Requires HTTPS in production
    sameSite: "strict" as const, // Protects against Cross-Site Request Forgery (CSRF)
};



const authController = {

    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
        
          const user = await authService.register(req.body);
          sendResponse(res, 201, "User registered", user);
        } catch (error) {
          next(error);
        }

    },

    login:async(req: Request, res: Response, next: NextFunction) => {

        try {

          const { user, accessToken, refreshToken } = await authService.login(req.body);

          res.cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
          });



          sendResponse(res, 200, "Login successful", { user, accessToken });
        } catch (error) {
          next(error);
        }
    }


}

export default authController;