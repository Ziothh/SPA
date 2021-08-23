import { EntityRepository } from "@mikro-orm/core"
import DB from "../../config/DB"
import { TaskPage, TaskGroup, Task, TaskTag } from "./entities"

// Repos will be assigned by getTaskRepos, called in config/DB
export let taskPageRepo: EntityRepository<TaskPage>
export let taskGroupRepo: EntityRepository<TaskGroup>
export let taskRepo: EntityRepository<Task>
export let taskTagRepo: EntityRepository<TaskTag>

export default function getTaskRepos() {
    taskPageRepo = DB.em.getRepository(TaskPage)
    taskGroupRepo = DB.em.getRepository(TaskGroup)
    taskRepo = DB.em.getRepository(Task)
    taskTagRepo = DB.em.getRepository(TaskTag)
}