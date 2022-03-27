"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const functions_1 = require("../shared/functions");
const mock_orm_1 = tslib_1.__importDefault(require("./mock-orm"));
/**
 * Get one user.
 *
 * @param email
 * @returns
 */
function getOne(email) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const db = yield mock_orm_1.default.openDb();
        for (const user of db.users) {
            if (user.email === email) {
                return user;
            }
        }
        return null;
    });
}
/**
 * See if a user with the given id exists.
 *
 * @param id
 */
function persists(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const db = yield mock_orm_1.default.openDb();
        for (const user of db.users) {
            if (user.id === id) {
                return true;
            }
        }
        return false;
    });
}
/**
 * Get all users.
 *
 * @returns
 */
function getAll() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const db = yield mock_orm_1.default.openDb();
        return db.users;
    });
}
/**
 * Add one user.
 *
 * @param user
 * @returns
 */
function add(user) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const db = yield mock_orm_1.default.openDb();
        user.id = (0, functions_1.getRandomInt)();
        db.users.push(user);
        return mock_orm_1.default.saveDb(db);
    });
}
/**
 * Update a user.
 *
 * @param user
 * @returns
 */
function update(user) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const db = yield mock_orm_1.default.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === user.id) {
                db.users[i] = user;
                return mock_orm_1.default.saveDb(db);
            }
        }
    });
}
/**
 * Delete one user.
 *
 * @param id
 * @returns
 */
function deleteOne(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const db = yield mock_orm_1.default.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === id) {
                db.users.splice(i, 1);
                return mock_orm_1.default.saveDb(db);
            }
        }
    });
}
// Export default
exports.default = {
    getOne,
    persists,
    getAll,
    add,
    update,
    delete: deleteOne
};
