import { userService } from './userService.js';

class AuthService {
    async login(userData) {
        const user = await userService.search({ email: userData.email });
        if (!user) {
            throw new Error('User not found');
        }
        if (user.password !== userData.password) {
            throw new Error('Invalid password');
        }
        return user;
    }
}

const authService = new AuthService();

export { authService };
