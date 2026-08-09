import { Router } from "express";
import saleController from "../../controllers/sales/sale.controller.js";
import { SalesCreateInputSchema, SalesUpdateInputSchema } from "../../generated/zod/index.js";
import { validateMiddleware } from "../../middlewares/validate.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router: Router = Router();

// CREATE a new sale
router.post(
    "/",
    authenticate,
    validateMiddleware(SalesCreateInputSchema),
    saleController.create
);

// GET ALL sales for the logged-in user
router.get(
    "/",
    authenticate,
    saleController.findSalesByUser
);

// GET ALL sales for a specific customer
router.get(
    "/customer/:customerId",
    authenticate,
    saleController.findSalesByCustomer
);

// GET ONE sale by its ID
router.get(
    "/:id",
    authenticate,
    saleController.getById
);

// UPDATE a sale by its ID
router.patch(
    "/:id",
    authenticate,
    validateMiddleware(SalesUpdateInputSchema),
    saleController.updateSale
);

// DELETE a sale by its ID
router.delete(
    "/:id",
    authenticate,
    saleController.deleteSale
);

export default router;