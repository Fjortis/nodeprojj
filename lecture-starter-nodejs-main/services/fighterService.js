import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const dbPath = path.resolve('./config/database.json');

const readDatabase = async () => {
    const data = await readFile(dbPath, 'utf-8');
    return JSON.parse(data);
};

const writeDatabase = async db => {
    await writeFile(dbPath, JSON.stringify(db, null, 2));
};

const getAllFighters = async () => {
    const db = await readDatabase();
    return db.fighters;
};

const getFighterById = async id => {
    const fighters = await getAllFighters();
    return fighters.find(fighter => fighter.id === id);
};

const createFighter = async fighter => {
    const db = await readDatabase();
    if (db.fighters.some(f => f.name.toLowerCase() === fighter.name.toLowerCase())) {
        throw new Error('Fighter with the same name already exists');
    }
    fighter.id = db.fighters.length ? (parseInt(db.fighters[db.fighters.length - 1].id) + 1).toString() : '1';
    fighter.health = fighter.health || 85;
    db.fighters.push(fighter);
    await writeDatabase(db);
    return fighter;
};

const updateFighter = async (id, updates) => {
    const db = await readDatabase();
    const index = db.fighters.findIndex(fighter => fighter.id === id);
    if (index === -1) {
        throw new Error('Fighter not found');
    }
    const existingFighter = db.fighters[index];

    if (updates.name && db.fighters.some(f => f.name.toLowerCase() === updates.name.toLowerCase() && f.id !== id)) {
        throw new Error('Fighter with the same name already exists');
    }

    const updatedFighter = { ...existingFighter, ...updates };
    db.fighters[index] = updatedFighter;
    await writeDatabase(db);
    return updatedFighter;
};

const deleteFighter = async id => {
    const db = await readDatabase();
    const index = db.fighters.findIndex(fighter => fighter.id === id);
    if (index === -1) {
        throw new Error('Fighter not found');
    }
    db.fighters.splice(index, 1);
    await writeDatabase(db);
};

export const fighterService = {
    getAllFighters,
    getFighterById,
    createFighter,
    updateFighter,
    deleteFighter
};
