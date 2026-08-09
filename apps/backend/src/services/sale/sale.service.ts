import { Customer, Prisma, Sales } from "../../generated/prisma/client.js";
import { customerRepository } from "../../repositories/customer/customer.repository.js";
import { AppError } from "../../utils/AppError.js";
import { logger } from "../../config/logger.js";
import { saleRepository } from "../../repositories/sale/sale.repository.js";

const SaleService = {
    create: async (salesData: Prisma.SalesCreateInput): Promise<Sales> => {
        try {
            logger.info(`Attempting to create sale`);

            const sale = await saleRepository.createSale(salesData);
            return sale;
        } catch (error) {
            throw error;
        }
    },

    findById: async (id: string): Promise<Sales | null> => {
        try {
            logger.info(`Fetching sale by ID: ${id}`);

            const sale = await saleRepository.findById(id);
            return sale;
        } catch (error) {
            throw error;
        }
    },

    findSalesByUser: async (id: string): Promise<Sales[] | null> => {
        try {
            logger.info(`Fetching sales by user ID: ${id}`);

            const sales = await saleRepository.findSalesByUser(id);
            return sales;
        } catch (error) {
            throw error;
        }

    },

    findSalesByCustomer: async (id: string): Promise<Sales[] | null> => {
        try {
            logger.info(`Fetching sales by customer ID: ${id}`);

            const sales = await saleRepository.findSalesByCustomer(id);
            return sales;
        } catch (error) {
            throw error;
        }

    },


    updateSale: async (id: string, updateData: Prisma.SalesUpdateInput): Promise<Sales> => {
        try {
            logger.info(`Attempting to update sale ID: ${id}`);

            //  Verify the sale exists before updating
            const existingSale = await saleRepository.findById(id);

            if (!existingSale) {
                throw new AppError('Sale not found', 404);
            }

            //  Perform the update
            const updatedSale = await saleRepository.updateSale(id, updateData);
            return updatedSale;
        } catch (error) {
            throw error;
        }
    },
    deleteSale: async (id: string): Promise<Sales> => {
        try {
            logger.info(`Attempting to delete sale ID: ${id}`);

            //  Verify the sale exists before deleting
            const existingSale = await saleRepository.findById(id);
            if (!existingSale) {
                throw new AppError('Sale not found', 404);
            }

            //  Perform the deletion
            const deletedSale = await saleRepository.deleteSale(id);
            return deletedSale;
        } catch (error) {
            throw error;
        }
    }
}

export default SaleService;