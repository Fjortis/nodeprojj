import { USER } from '../models/user.js';

const createUserValid = (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
        return res.status(400).json({ error: true, message: 'All fields are required except id' });
    }

    if (!/^[^@]+@gmail$/.test(email)) {
        return res.status(400).json({ error: true, message: 'Email must be a Gmail address' });
    }

    if (!/^\+380\d{9}$/.test(phoneNumber)) {
        return res.status(400).json({
            error: true,
            message: 'Phone number must be in format +380xxxxxxxxx'
        });
    }

    if (password.length < 3) {
        return res.status(400).json({
            error: true,
            message: 'Password must be at least 3 characters long'
        });
    }

    next();
};

const updateUserValid = (req, res, next) => {
    const keys = Object.keys(req.body);

    if (keys.includes('id')) {
        return res.status(400).json({
            error: true,
            message: 'Id should not be present in the request body'
        });
    }

    if (keys.length === 0 || !keys.some(key => key in USER)) {
        return res.status(400).json({
            error: true,
            message: 'At least one valid field must be present'
        });
    }

    next();
};

export { createUserValid, updateUserValid };
