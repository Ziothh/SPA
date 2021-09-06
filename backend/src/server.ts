import "./config/envConfig" // Get .env variables
import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from "cors"
import { buildSchema } from 'type-graphql'
import { __prod__ } from "./constants/constants"
import DB from "./config/DB"
import { TaskPagesResolver, TaskGroupsResolver, TasksResolver, SubtasksResolver, TaskTagResolver } from "./schema/tasks/resolvers"
import * as taskRepos from "./schema/tasks/repos"
import { MyContext } from "./schema/types"


const main = async () => {
    // Init
    await DB.connect()

    const app = express()

    // app.use(cors({
    //     origin: "http://localhost:3000",
    //     // credentials: true
    // }))

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TaskPagesResolver, TaskGroupsResolver, TasksResolver, SubtasksResolver, TaskTagResolver, ],
            validate: false,
        },),
        // Gql context
        context: () => ({ 
            em: DB.em,
            ...taskRepos,
        } as MyContext),
        // Determines how the error will be shown
        formatError: __prod__ 
            ? (err) => ({name: err.name, message: err.message}) 
            : undefined
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app}) // Creates graphql endpoint for graphs
    // cors: false (if expressApp.use(cors))

    app.listen(4000, () => {
        console.log("🚀 Server started on localhost:4000");
    }) 
}


main().catch(e => {
    switch (e.code) {
        case "ECONNREFUSED":
            console.error("⚠️  Connection refused. Is the MYSQL server running?")
            break;
            // ❌⚠️⛔☣️
        default:
            console.error(e)
            break;
    }
})

