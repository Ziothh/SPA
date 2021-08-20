import { __prod__ } from "../constants/constants";
import { Task } from "../schema/task/entities/Task";
import { MikroORM } from "@mikro-orm/core"
import path from 'path'

export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations,
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [ Task ],
    dbName: "spa_data",
    user: 'root',
    password: 'Louislune44',
    host: "localhost",
    port: 3030,
    type: "mysql",
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0]; // Enables the autocompletion for types