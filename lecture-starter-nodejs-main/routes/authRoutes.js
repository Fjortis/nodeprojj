import express from 'express';
import { authService } from '../services/authService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login({ email, password });
        res.data = user;
    } catch (err) {
        res.err = err.message || 'Login failed';
    } finally {
        next();
    }
});

export { router };
