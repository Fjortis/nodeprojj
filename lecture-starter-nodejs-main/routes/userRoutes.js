// routes/userRoutes.js
import express from 'express';
import { userService } from '../services/userService.js';
import { createUserValid, updateUserValid } from '../middlewares/user.validation.middleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.success(users);
    } catch (error) {
        res.error(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.success(user);
        } else {
            res.notFound();
        }
    } catch (error) {
        res.error(error.message);
    }
});

router.post('/', createUserValid, async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).success(user);
    } catch (error) {
        res.error(error.message);
    }
});

router.patch('/:id', updateUserValid, async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.success(user);
    } catch (error) {
        res.error(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.error(error.message);
    }
});

export { router };
