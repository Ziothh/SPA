import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { taskGroupRepo, taskPageRepo, taskRepo, taskTagRepo  } from "./tasks/repos";

export type MyContext = {
    em: EntityManager<IDatabaseDriver<Connection>>
    
    // Task repos
    taskPageRepo: typeof taskPageRepo,
    taskGroupRepo: typeof taskGroupRepo,
    taskRepo: typeof taskRepo,
    taskTagRepo: typeof taskTagRepo,
}