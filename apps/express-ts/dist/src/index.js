"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./pre-start"); // Must be the first import
const jet_logger_1 = tslib_1.__importDefault(require("jet-logger"));
const server_1 = tslib_1.__importDefault(require("./server"));
// Constants
const serverStartMsg = 'Express server started on port: ';
const port = process.env.PORT || 3001;
// Start server
server_1.default.listen(port, () => {
    jet_logger_1.default.info(serverStartMsg + port);
});
