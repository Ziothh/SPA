import path from 'path'
import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "../constants/constants";
import { Task, TaskGroup, TaskPage, TaskTag, Subtask } from "../schema/tasks/entities"

export default {
    entities: [ 
        TaskPage, 
        TaskGroup, 
        Task, 
        TaskTag, 
        Subtask
    ],
    
    migrations: {
        path: path.join(__dirname, '../../migrations'), // path to the folder with migrations,
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },

    // configurated with .env 
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    type: process.env.DB_TYPE,
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0]; // Enables the autocompletion for types