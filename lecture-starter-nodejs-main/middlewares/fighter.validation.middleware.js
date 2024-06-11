import { FIGHTER } from '../models/fighter.js';

const createFighterValid = (req, res, next) => {
    const { name, health, power, defense } = req.body;

    if (!name || !power || !defense) {
        return res.status(400).json({
            error: true,
            message: 'All fields are required except id and health'
        });
    }

    if (health && (health < 80 || health > 120)) {
        return res.status(400).json({ error: true, message: 'Health must be between 80 and 120' });
    }

    if (power < 1 || power > 100) {
        return res.status(400).json({ error: true, message: 'Power must be between 1 and 100' });
    }

    if (defense < 1 || defense > 10) {
        return res.status(400).json({ error: true, message: 'Defense must be between 1 and 10' });
    }

    next();
};

const updateFighterValid = (req, res, next) => {
    const keys = Object.keys(req.body);

    if (keys.includes('id')) {
        return res.status(400).json({
            error: true,
            message: 'Id should not be present in the request body'
        });
    }

    if (keys.length === 0 || !keys.some(key => key in FIGHTER)) {
        return res.status(400).json({
            error: true,
            message: 'At least one valid field must be present'
        });
    }

    next();
};

export { createFighterValid, updateFighterValid };
