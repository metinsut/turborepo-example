"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
const { OK } = http_status_codes_1.StatusCodes;
router.get('/', (_, res) => {
    res.status(OK).json({ name: 'HELLO WORLD' });
});
exports.default = router;
