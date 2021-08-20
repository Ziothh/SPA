"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants/constants");
const Task_1 = require("../schema/task/entities/Task");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Task_1.Task],
    dbName: "spa_data",
    user: 'root',
    password: 'Louislune44',
    host: "localhost",
    port: 3030,
    type: "mysql",
    debug: !constants_1.__prod__,
};
//# sourceMappingURL=mirko-orm.config.js.map