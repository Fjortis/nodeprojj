import express from 'express';
import { fighterService } from '../services/fighterService.js';
import { createFighterValid, updateFighterValid } from '../middlewares/fighter.validation.middleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const fighters = await fighterService.getAllFighters();
        res.success(fighters);
    } catch (error) {
        res.error(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const fighter = await fighterService.getFighterById(req.params.id);
        if (fighter) {
            res.success(fighter);
        } else {
            res.notFound();
        }
    } catch (error) {
        res.error(error.message);
    }
});

router.post('/', createFighterValid, async (req, res) => {
    try {
        const fighter = await fighterService.createFighter(req.body);
        res.status(201).success(fighter);
    } catch (error) {
        res.error(error.message);
    }
});

router.patch('/:id', updateFighterValid, async (req, res) => {
    try {
        const fighter = await fighterService.updateFighter(req.params.id, req.body);
        res.success(fighter);
    } catch (error) {
        res.error(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await fighterService.deleteFighter(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.error(error.message);
    }
});

export { router };
