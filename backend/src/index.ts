import "reflect-metadata"
import { MikroORM } from '@mikro-orm/core'
import {__prod__} from "./constants/constants"
import mirkoOrmConfig from './config/mirko-orm.config'
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { TasksResolver } from './schema/task/resolvers/task'


const main = async () => {
    const orm = await MikroORM.init(mirkoOrmConfig)
    
    const app = express()
    // app.get("/", (_, res) => res.send("hello"))
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TasksResolver],
            validate: false
        }),
        context: () => ({ em: orm.em }),
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app }) // Creates graphql endpoint for graphs
    

    // const task = orm.em.create(Task, {
    //     title: "TestTask",
    //     color: "red",
    //     taskset: "Main",
    //     deadline: Date.now(),
    //     isBookmarked: false,
    //     subtasks: ["test", "value"],
    //     tags: [],
    // })
    // await orm.em.persistAndFlush(task)
    // console.log(task);
    app.listen(4000, () => {
        console.log("🚀 Server started on localhost:4000");
    }) 
    // await orm.em.persistAndFlush(post) 

    
    // process.exit()
}



main().catch(e => console.log(e))

