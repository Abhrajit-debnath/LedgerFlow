import {  Prisma, Sales } from '../../generated/prisma/client.js';
import { prisma } from '../../config/db.js';

export class SaleRepository {
    /** Create a new sale */
    async createSale(data: Prisma.SalesCreateInput): Promise<Sales> {
        return prisma.sales.create({ data });
    }

    // /** Find a single sale by id */

    async findById(id: string): Promise<Sales | null> {
        return prisma.sales.findUnique({
            where: { id }
        });
    }

    /** Get all sales belonging to a specific shop owner */

    async findSalesByUser(id: string): Promise<Sales[] | null> {
        return prisma.sales.findMany({
            where: {userId:id },
            orderBy: { createdAt: 'desc' }
        });
    }

    /** Get the transaction ledger for a specific customer */

    async findSalesByCustomer(id: string): Promise<Sales[] | null> {
        return prisma.sales.findMany({
            where: { customerId: id },
            orderBy: { createdAt: 'desc' }
        });
    }

    /** Update a sale (e.g., changing status from PENDING to PAID or updating the amount) */

    async updateSale(id: string, updateData: Prisma.SalesUpdateInput): Promise<Sales> {
        return prisma.sales.update({
            where: { id },
            data: updateData
        });
    }

    async deleteSale(id: string): Promise<Sales> {
        return prisma.sales.delete({
            where: { id }
        });
    }


}


export const saleRepository = new SaleRepository();
