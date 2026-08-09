import jwt, { SignOptions } from 'jsonwebtoken';
import { logger } from '../config/logger.js';
import { AppError } from './AppError.js';

const tokenGenerator = {
    generateToken: (
        tokenType: string,
        payload: object,
        secret: string,
        expiresIn: SignOptions['expiresIn']
    ) => {
        if (!secret || !tokenType) {
            logger.error('Secret or tokenType is missing');

            throw new AppError(
                'Secret or tokenType is missing',
                500
            );
        }

        return jwt.sign(payload, secret, {
            expiresIn,
        });
    },

    verifyToken: (token: string, secret: string) => {
        if (!secret) {
            logger.error('Secret is missing');

            throw new AppError('Secret is missing', 401);
        }

        try {
            return jwt.verify(token, secret);
        } catch (error) {
            logger.error({
                err: error,
                message: 'Token verification failed',
            });



            throw new AppError('Token verification failed', 401);
        }
    },

    verifyAccessToken: (token: string) => {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            logger.error('ACCESS_TOKEN_SECRET is missing');
            throw new AppError('ACCESS_TOKEN_SECRET is missing', 500);
        }

        try {
            return jwt.verify(token, secret);
        } catch (error) {
            logger.error({
                err: error,
                message: 'Access token verification failed',
            });
            throw new AppError('Access token verification failed', 401);
        }
    }
};

export default tokenGenerator;