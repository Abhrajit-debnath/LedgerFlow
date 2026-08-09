import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { logger } from "../config/logger.js";
import { sendResponse } from "../handlers/response.handler.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        logger.warn({ statusCode: err.statusCode, path: req.url }, err.message);
        
        return sendResponse(res, err.statusCode, err.message);
    }


   if (err instanceof PrismaClientKnownRequestError) {                                                            
        let appError: AppError;                                                                                             
                                                                                                                            
        switch (err.code) {                                                                                                 
          case "P2002":                                                                                                     
            appError = new AppError("Duplicate entry", 409);                                                                
            break;                                                                                                          
          case "P2025":                                                                                                     
            appError = new AppError("Resource not found", 404);                                                             
            break;                                                                                                          
          case "P2000":                                                                                                     
            appError = new AppError("Invalid field length", 400);                                                           
            break;                                                                                                          
          case "P2003":                                                                                                     
            appError = new AppError("Invalid foreign key reference", 400);                                                  
            break;                                                                                                          
                                                                                     
          default:                                                                                                          
                                                                                
            appError = new AppError(                                                                                        
              "Database error – please try again later",                                                                    
              500                                                                                                           
            );                                                                                                              
        }   
        
        
          logger.warn(                                                                                                        
          { prismaCode: err.code, meta: (err as any).meta, path: req.url },                                                 
          err.message                                                                                                       
        );

         return sendResponse(res, appError.statusCode, appError.message);  

    }
    logger.error({ err, path: req.path }, 'Unhandled Internal Server Error');

    return sendResponse(res, 500, 'Internal Server Error');
};