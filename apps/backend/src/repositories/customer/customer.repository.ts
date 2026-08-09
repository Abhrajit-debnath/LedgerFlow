import { Customer, Prisma, User } from '../../generated/prisma/client.js';
import { prisma } from '../../config/db.js';

export class CustomerRepository {
    /** Create a new customer */
    async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
        return prisma.customer.create({ data });
    }

    /** Find a customer by a unique identifier */
    async findUnique(where: Prisma.CustomerWhereUniqueInput): Promise<Customer | null> {
        return prisma.customer.findUnique({ where });
    }

    /** Find a customer by phone number */
    async findByPhone(phoneNumber: string): Promise<Customer | null> {
        return prisma.customer.findUnique({ where: { phoneNumber } });
    }

    async getAllCustomers(): Promise<Customer[]> {
        return prisma.customer.findMany();

    }


    async findById(id: string): Promise<Customer | null> {
        return prisma.customer.findUnique({
            where: { id }
        });

    }

    

      async updateCustomer(id: string, updateData:Prisma.CustomerUpdateInput): Promise<Customer> {
        return prisma.customer.update({
            where:{id},
            data: updateData
        });
    }
    

    }


export const customerRepository = new CustomerRepository();
