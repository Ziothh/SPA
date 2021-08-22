"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants/constants");
const entities_1 = require("../schema/tasks/entities");
exports.default = {
    entities: [entities_1.TaskPage, entities_1.TaskGroup, entities_1.Task, entities_1.TaskTag],
    migrations: {
        path: path_1.default.join(__dirname, '../../migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    type: process.env.DB_TYPE,
    debug: !constants_1.__prod__,
};
//# sourceMappingURL=mirko-orm.config.js.map