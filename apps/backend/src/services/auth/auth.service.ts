import { User, Prisma } from "../../generated/prisma/client.js";
import { authRepository } from "../../repositories/auth/auth.repository.js";
import bcrypt from "bcryptjs";
import { AppError } from "../../utils/AppError.js";
import tokenGenerator from "../../utils/token.js";
import { logger } from "../../config/logger.js";



const authService = {
    register: async (userData: Prisma.UserCreateInput) => {
        try {


            if (!userData.password) {
                throw new AppError('Password is required', 400);
            }

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const dataWithHash = { ...userData, password: hashedPassword };
            const user = await authRepository.createUser(dataWithHash);

            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            throw error;
        }
    },
    login: async (loginData: { phoneNumber: string; password: string }): Promise<{ user: Omit<User, "password">; accessToken: string; refreshToken: string }> => {
        try {

            logger.info(`Attempting login for phone: ${loginData.phoneNumber}`);
          
            const user = await authRepository.findByPhone(loginData.phoneNumber);

             logger.info(`firing`);
            if (!user) {
                throw new AppError('User not found', 404);
            }
            // Verify password
            const isMatch = await bcrypt.compare(loginData.password, (user as any).password);
            if (!isMatch) {
                throw new AppError('Invalid credentials', 401);
            }
            // Generate tokens
            const accessToken = tokenGenerator.generateToken(
                'access',
                { userId: user.id },
                process.env.ACCESS_TOKEN_SECRET as string,
                '15m'
            );
            const refreshToken = tokenGenerator.generateToken(
                'refresh',
                { userId: user.id },
                process.env.REFRESH_TOKEN_SECRET as string,
                '7d'
            );
            // Stripping password before returning
            const { password, ...userWithoutPassword } = user;
            return { user: userWithoutPassword, accessToken, refreshToken };
        } catch (error) {
            throw error;
        }
    }
}

export default authService;