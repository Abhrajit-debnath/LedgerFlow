export class AppError extends Error {

    constructor(message: string, public statusCode: number, public isOperational = true) {

        super(message);
         this.name = 'AppError';

    }
}