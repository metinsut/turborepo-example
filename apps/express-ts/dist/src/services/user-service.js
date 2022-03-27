"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_repo_1 = tslib_1.__importDefault(require("../repos/user-repo"));
const errors_1 = require("../shared/errors");
/**
 * Get all users.
 *
 * @returns
 */
function getAll() {
    return user_repo_1.default.getAll();
}
/**
 * Add one user.
 *
 * @param user
 * @returns
 */
function addOne(user) {
    return user_repo_1.default.add(user);
}
/**
 * Update one user.
 *
 * @param user
 * @returns
 */
function updateOne(user) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const persists = yield user_repo_1.default.persists(user.id);
        if (!persists) {
            throw new errors_1.UserNotFoundError();
        }
        return user_repo_1.default.update(user);
    });
}
/**
 * Delete a user by their id.
 *
 * @param id
 * @returns
 */
function deleteOne(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const persists = yield user_repo_1.default.persists(id);
        if (!persists) {
            throw new errors_1.UserNotFoundError();
        }
        return user_repo_1.default.delete(id);
    });
}
// Export default
exports.default = {
    getAll,
    addOne,
    updateOne,
    delete: deleteOne
};
