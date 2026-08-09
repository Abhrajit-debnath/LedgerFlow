import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../handlers/response.handler.js";
import SaleService from "../../services/sale/sale.service.js";

const saleController = {
    // CREATE
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sale = await SaleService.create(req.body);
            sendResponse(res, 201, "Sale created successfully", sale);
        } catch (error) {
            next(error);
        }
    },

    // GET ALL SALES BY USER (Logged-in shop owner)
    findSalesByUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Extract the userId from the authenticated token
            const userId = req.user?.userId;
            
            if (!userId) {
                return sendResponse(res, 401, "Unauthorized: No user ID found", null);
            }

            const sales = await SaleService.findSalesByUser(userId);
            sendResponse(res, 200, "Sales retrieved successfully", sales);
        } catch (error) {
            next(error);
        }
    },

    // GET ALL SALES BY CUSTOMER
    findSalesByCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customerId = req.params.customerId;
            
            const sales = await SaleService.findSalesByCustomer(customerId as string);
            sendResponse(res, 200, "Customer sales retrieved successfully", sales);
        } catch (error) {
            next(error);
        }
    },

    // GET ONE (By ID)
    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const saleId = req.params.id;
            
            const sale = await SaleService.findById(saleId as string);
            sendResponse(res, 200, "Sale retrieved successfully", sale);
        } catch (error) {
            next(error);
        }
    },

    // UPDATE
    updateSale: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const saleId = req.params.id;
            const updateData = req.body;

            const sale = await SaleService.updateSale(saleId as string, updateData);
            sendResponse(res, 200, "Sale updated successfully", sale);
        } catch (error) {
            next(error);
        }
    },

    // DELETE
    deleteSale: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const saleId = req.params.id;

            const sale = await SaleService.deleteSale(saleId as string);
            sendResponse(res, 200, "Sale deleted successfully", sale);
        } catch (error) {
            next(error);
        }
    }
};

export default saleController;