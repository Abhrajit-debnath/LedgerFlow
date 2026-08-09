import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../handlers/response.handler.js";
import customerService from "../../services/customer/customer.service.js";

const customerController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customer = await customerService.create(req.body);
            sendResponse(res, 201, "Customer created successfully", customer);
        } catch (error) {
            next(error);
        }
    },

    // GET ALL
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
    
            const customers = await customerService.getAll();
            sendResponse(res, 200, "Customers retrieved successfully", customers);
        } catch (error) {
            next(error);
        }
    },

    // GET ONE (By ID)
    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
      
            const customerId = req.params.id;
            
            const customer = await customerService.getById(customerId as string);
            sendResponse(res, 200, "Customer retrieved successfully", customer);
        } catch (error) {
            next(error);
        }
    },

    //  UPDATE
    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customerId = req.params.id;
            const updateData = req.body;

            const customer = await customerService.update(customerId as string, updateData);
            sendResponse(res, 200, "Customer updated successfully", customer);
        } catch (error) {
            next(error);
        }
    }
};

export default customerController;