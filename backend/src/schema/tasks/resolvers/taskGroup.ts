import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../../types";
import { TaskGroup } from "../entities/TaskGroup";


// Querys: getting data
// Mutations: updating / creating / deleting data
@Resolver(() => TaskGroup)
export class TaskGroupsResolver {
    @Query(() => [TaskGroup], {nullable: true}) 
    async getAllTaskGroups(
        @Ctx() { taskGroupRepo }: MyContext
    ): Promise<TaskGroup[] | null> {
        return await taskGroupRepo.findAll({populate: true})
    }

    @Query(() => TaskGroup, {nullable: true}) 
    async getTaskGroup(
        @Arg("id") id: number,
        @Ctx() { taskGroupRepo }: MyContext
    ): Promise<TaskGroup | null> {
        return await taskGroupRepo.findOne({id}, {populate: true})
    }

    @Mutation(() => TaskGroup)
    async createTaskGroup(
        @Arg("name") name: string,
        @Arg("pageId") pageId: number,
        @Ctx() { taskGroupRepo, taskPageRepo }: MyContext
    ): Promise<TaskGroup> {
        const page = await taskPageRepo.findOneOrFail(pageId)
        const taskGroup = await taskGroupRepo.create({name, page: page})
        await taskGroupRepo.persist(taskGroup)
        await taskGroupRepo.flush()
        console.log(taskGroup)
        return taskGroup

    }

    @Mutation(() => TaskGroup)
    async updateTaskGroup(
        @Arg("id") id: number,
        @Arg("name") name: string,
        @Ctx() { taskGroupRepo }: MyContext
    ): Promise<TaskGroup | gqlError[]> {
        const taskGroup = await taskGroupRepo.findOne({id})
        if(!taskGroup) return [{path: "TaskGroup", message: "not found"}]
        taskGroup.name = name
        await taskGroupRepo.flush()
        return taskGroup
    }

   

    @Mutation(() => Boolean)
    async deleteTaskGroup(
        @Arg("id") id: number,
        @Ctx() { taskGroupRepo }: MyContext
    ): Promise<boolean> {
        let TaskGroup = await taskGroupRepo.getReference(id)
        await taskGroupRepo.removeAndFlush(TaskGroup)
        return true
    }
}