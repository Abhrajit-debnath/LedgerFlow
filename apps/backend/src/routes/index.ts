import { Router } from "express";
import authRouter from "./auth/auth.routes.js";
import customerRouter from "./customer/customer.routes.js";
import saleRouter from "./sale/sale.routes.js";
const router: Router = Router();


router.use("/auth", authRouter)
router.use("/customers", customerRouter)
router.use("/sales", saleRouter)


export default router;