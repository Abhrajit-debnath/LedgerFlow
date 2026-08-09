import { Router } from "express";
import customerController from "../../controllers/customers/customer.controller.js";
import { CustomerCreateInputSchema, CustomerUpdateInputSchema } from "../../generated/zod/index.js";
import { validateMiddleware } from "../../middlewares/validate.middleware.js";

import { authenticate } from "../../middlewares/auth.middleware.js";

const router: Router = Router();

// CREATE a new customer


router.post("/", authenticate, validateMiddleware(CustomerCreateInputSchema), customerController.create)

// GET ALL customers

router.get(
    "/",
    authenticate,
    customerController.getAll
);

// GET ONE customer by their ID

router.get(
    "/:id",
    authenticate,
    customerController.getById
);

// UPDATE a customer by their ID

router.patch(
    "/:id",
    authenticate,
    validateMiddleware(CustomerUpdateInputSchema),
    customerController.update
);



export default router;