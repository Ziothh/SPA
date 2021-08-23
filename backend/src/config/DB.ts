import { Connection, EntityManager, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import getTaskRepos from "../schema/tasks/repos";
import mirkoOrmConfig from "./mirko-orm.config";


const DB = {
    connect: async () => {
        const ormInit = await MikroORM.init(mirkoOrmConfig)
        
        // Basic
        DB.orm = ormInit
        DB.em = ormInit.em
    
        // Repos
        getTaskRepos()
    }
} as {
    connect: () => Promise<void>,
    orm: MikroORM<IDatabaseDriver<Connection>>,
    em: EntityManager<IDatabaseDriver<Connection>>
}

export default DB