"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const user_router_1 = tslib_1.__importDefault(require("./user-router"));
const rest_router_1 = tslib_1.__importDefault(require("./rest-router"));
// Export the base-router
const baseRouter = (0, express_1.Router)();
// Setup routers
baseRouter.use('/users', user_router_1.default);
baseRouter.use('/api', rest_router_1.default);
// Export default.
exports.default = baseRouter;
