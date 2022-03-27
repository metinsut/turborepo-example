"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const express_1 = require("express");
const errors_1 = require("../shared/errors");
const user_service_1 = tslib_1.__importDefault(require("../services/user-service"));
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
// Paths
exports.p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id'
};
/**
 * Get all users.
 */
router.get(exports.p.get, (_, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.default.getAll();
    return res.status(OK).json({ users });
}));
/**
 * Add one user.
 */
router.post(exports.p.add, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new errors_1.ParamMissingError();
    }
    // Fetch data
    yield user_service_1.default.addOne(user);
    return res.status(CREATED).end();
}));
/**
 * Update one user.
 */
router.put(exports.p.update, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new errors_1.ParamMissingError();
    }
    // Fetch data
    yield user_service_1.default.updateOne(user);
    return res.status(OK).end();
}));
/**
 * Delete one user.
 */
router.delete(exports.p.delete, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new errors_1.ParamMissingError();
    }
    // Fetch data
    yield user_service_1.default.delete(Number(id));
    return res.status(OK).end();
}));
// Export default
exports.default = router;
