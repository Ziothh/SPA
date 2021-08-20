"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const mirko_orm_config_1 = __importDefault(require("./config/mirko-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const task_1 = require("./schema/task/resolvers/task");
const main = async () => {
    const orm = await core_1.MikroORM.init(mirko_orm_config_1.default);
    const app = express_1.default();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [task_1.TasksResolver],
            validate: false
        }),
        context: () => ({ em: orm.em }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("🚀 Server started on localhost:4000");
    });
};
main().catch(e => console.log(e));
//# sourceMappingURL=index.js.map