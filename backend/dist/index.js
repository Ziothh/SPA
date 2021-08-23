"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/envConfig");
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const constants_1 = require("./constants/constants");
const DB_1 = __importDefault(require("./config/DB"));
const resolvers_1 = require("./schema/tasks/resolvers");
const taskRepos = __importStar(require("./schema/tasks/repos"));
const main = async () => {
    await DB_1.default.connect();
    const app = express_1.default();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [resolvers_1.TaskPagesResolver],
            validate: false,
        }),
        context: () => (Object.assign({ em: DB_1.default.em }, taskRepos)),
        formatError: constants_1.__prod__
            ? (err) => ({ name: err.name, message: err.message })
            : undefined
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("🚀 Server started on localhost:4000");
    });
};
main().catch(e => {
    switch (e.code) {
        case "ECONNREFUSED":
            console.error("⚠️  Connection refused. Is the MYSQL server running?");
            break;
        default:
            console.error(e);
            break;
    }
});
//# sourceMappingURL=index.js.map