import "./config/envConfig" // Get .env variables
import "reflect-metadata"
import { MikroORM } from '@mikro-orm/core'
import mirkoOrmConfig from './config/mirko-orm.config'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { __prod__ } from "./constants/constants"
import {TaskPage} from './schema/tasks/entities'
// import { TasksResolver } from './schema/tasks/resolvers/task'


const main = async () => {
    const orm = await MikroORM.init(mirkoOrmConfig)
    // const app = express()
    // const apolloServer = new ApolloServer({
    //     schema: await buildSchema({
    //         resolvers: [TasksResolver],
    //         validate: false,
    //     },),
    //     context: () => ({ em: orm.em }),
    //     formatError: __prod__ 
    //         ? (err) => ({name: err.name, message: err.message}) 
    //         : undefined
    // })
    // await apolloServer.start()
    // apolloServer.applyMiddleware({ app }) // Creates graphql endpoint for graphs
    // const taskPage = orm.em.create(TaskPage, {
    //     name: "My Page"
    // })
    // await orm.em.persistAndFlush(taskPage) 

    // console.log(await orm.em.findOne(TaskPage, {isBookmarked: false}));

    // const task = orm.em.create(Task, {
    //     title: "TestTask",
    //     color: "red",
    //     taskset: "Main",
    //     deadline: null
    // })

    // await orm.em.persistAndFlush(task) 
    // const task = await orm.em.findOne(Task, {id: 1})

    // // const tag = orm.em.create(TaskTag, {
    // //     title: "My Tag",
    // //     color: "red",
    // //     task: task
    // // })
    // const tag2 = orm.em.create(TaskTag, {
    //     title: "My other other Tag",
    //     color: "blue",
    //     task: task
    // })
    
    // if (task) {
   
        // await task.tags.init()
        // console.log(await task.tags.remove(1))
    // }
    // await orm.em.persistAndFlush(task)
    // console.log(task);

    // app.listen(4000, () => {
    //     console.log("🚀 Server started on localhost:4000");
    // }) 

    
    process.exit()
}


main().catch(e => console.log(e))

