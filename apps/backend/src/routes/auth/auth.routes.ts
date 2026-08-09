import { Router } from "express";
import authController from "../../controllers/auth/auth.controller.js";
import { UserCreateInputSchema } from "../../generated/zod/index.js";
import { validateMiddleware } from "../../middlewares/validate.middleware.js";
import { loginSchema } from "../../schemas/auth.schema.js";

const router : Router = Router();


router.post("/register",validateMiddleware(UserCreateInputSchema),authController.register)

router.post("/login",validateMiddleware(loginSchema),authController.login)


export default router;