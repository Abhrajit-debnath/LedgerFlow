import { NextFunction, Response, Request } from "express";
import { ZodError } from "zod";
import { ZodSchema } from "zod";
import { AppError } from "../utils/AppError.js";

export const validateMiddleware = (schema: ZodSchema<any>,) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {

            if (error instanceof ZodError) {

                const errorMessages = error.issues.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
                return next(new AppError(`Validation Error : ${errorMessages}`, 400))
            }

            next(error)

        }




    }

}