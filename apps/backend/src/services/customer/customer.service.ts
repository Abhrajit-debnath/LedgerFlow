import { Customer, Prisma } from "../../generated/prisma/client.js";
import { customerRepository } from "../../repositories/customer/customer.repository.js";
import { AppError } from "../../utils/AppError.js";
import { logger } from "../../config/logger.js";

const customerService = {
    create: async (customerData: Prisma.CustomerCreateInput): Promise<Customer> => {
        try {
            logger.info(`Attempting to create customer with phone: ${customerData.phoneNumber}`);

            //  Check if a customer with this phone number already exists
            const existingCustomer = await customerRepository.findByPhone(customerData.phoneNumber);
            if (existingCustomer) {
                throw new AppError('Customer with this phone number already exists', 400);
            }

            const customer = await customerRepository.createCustomer(customerData);
            return customer;
        } catch (error) {
            throw error;
        }
    },

    getAll: async (): Promise<Customer[]> => {
        try {
            logger.info(`Fetching all customers`);
            
            const customers = await customerRepository.getAllCustomers();
            return customers;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id: string): Promise<Customer> => {
        try {
            logger.info(`Fetching customer by ID: ${id}`);
            
            const customer = await customerRepository.findById(id);
            
            if (!customer) {
                throw new AppError('Customer not found', 404);
            }
            
            return customer;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: string, updateData: Prisma.CustomerUpdateInput): Promise<Customer> => {
        try {
            logger.info(`Attempting to update customer ID: ${id}`);

            //  Verify the customer exists before updating
            const existingCustomer = await customerRepository.findById(id);
            
            if (!existingCustomer) {
                throw new AppError('Customer not found', 404);
            }

            //  Perform the update
            const updatedCustomer = await customerRepository.updateCustomer(id, updateData);
            return updatedCustomer;
        } catch (error) {
            throw error;
        }
    }
}

export default customerService;