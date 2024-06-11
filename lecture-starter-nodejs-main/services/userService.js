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

class UserService {
    async getAllUsers() {
        const db = await readDatabase();
        return db.users;
    }

    async getUserById(id) {
        const db = await readDatabase();
        return db.users.find(user => user.id === id);
    }

    async createUser(user) {
        const db = await readDatabase();
        if (db.users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
            throw new Error('User with the same email already exists');
        }
        if (db.users.some(u => u.phoneNumber === user.phoneNumber)) {
            throw new Error('User with the same phone number already exists');
        }
        user.id = db.users.length ? (parseInt(db.users[db.users.length - 1].id) + 1).toString() : '1';
        db.users.push(user);
        await writeDatabase(db);
        return user;
    }

    async updateUser(id, updates) {
        const db = await readDatabase();
        const index = db.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error('User not found');
        }
        const existingUser = db.users[index];

        if (updates.email && db.users.some(u => u.email.toLowerCase() === updates.email.toLowerCase() && u.id !== id)) {
            throw new Error('User with the same email already exists');
        }
        if (updates.phoneNumber && db.users.some(u => u.phoneNumber === updates.phoneNumber && u.id !== id)) {
            throw new Error('User with the same phone number already exists');
        }

        const updatedUser = { ...existingUser, ...updates };
        db.users[index] = updatedUser;
        await writeDatabase(db);
        return updatedUser;
    }

    async deleteUser(id) {
        const db = await readDatabase();
        const index = db.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error('User not found');
        }
        db.users.splice(index, 1);
        await writeDatabase(db);
    }

    async search(userData) {
        const db = await readDatabase();
        return db.users.find(user => user.email === userData.email);
    }
}

const userService = new UserService();

export { userService };
