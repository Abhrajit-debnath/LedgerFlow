import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../handlers/response.handler.js";
import tokenGenerator from "../utils/token.js";
import JWT from "jsonwebtoken";


// Type augmentation

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string
            } 
        }
    }
}


export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return sendResponse(res, 401, "Unauthorized")
        }

        const decodedToken = tokenGenerator.verifyAccessToken(token);
        req.user = decodedToken as { userId: string };
        next();
    } catch (error) {

       if (error instanceof JWT.JsonWebTokenError) {
            return sendResponse(res, 401, "Invalid token");
        }

        if (error instanceof JWT.TokenExpiredError) {
            return sendResponse(res, 401, "Token expired");
        }
        return sendResponse(res, 500, "Internal Server Error");
     
    }

}