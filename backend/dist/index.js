"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/envConfig");
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const mirko_orm_config_1 = __importDefault(require("./config/mirko-orm.config"));
const main = async () => {
    const orm = await core_1.MikroORM.init(mirko_orm_config_1.default);
    process.exit();
};
main().catch(e => console.log(e));
//# sourceMappingURL=index.js.map