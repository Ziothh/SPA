import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../../types";
import { TaskPage } from "../entities/TaskPage";


// Querys: getting data
// Mutations: updating / creating / deleting data
@Resolver(() => TaskPage)
export class TaskPagesResolver {
    @Query(() => [TaskPage], {nullable: true}) 
    async getAllTaskPages(
        @Ctx() { taskPageRepo }: MyContext
    ): Promise<TaskPage[] | null> {
        return await taskPageRepo.findAll({populate: true})
    }

    @Query(() => TaskPage, {nullable: true}) 
    async getTaskPage(
        @Arg("id") id: number,
        @Ctx() { taskPageRepo }: MyContext
    ): Promise<TaskPage | null> {
        const tp = await taskPageRepo.findOne({id}, {
            populate: true,
        })
        if (!tp) return null
        return tp
    }


    @Mutation(() => TaskPage)
    async updateTaskPage(
        @Arg("id") id: number,
        @Arg("name", {nullable: true}) name: string,
        @Arg("isBookmarked", {nullable: true}) isBookmarked: boolean,
        @Arg("colorClass", {nullable: true}) colorClass: string,
        @Ctx() { taskPageRepo }: MyContext
    ): Promise<TaskPage | gqlError[]> {
        const taskPage = await taskPageRepo.findOne({id})
        
        if(!taskPage) return [{path: "TaskPage", message: "not found"}]
        
        if(name !== undefined) taskPage.name = name
        if(isBookmarked !== undefined) taskPage.isBookmarked = isBookmarked
        if(colorClass !== undefined) taskPage.colorClass = colorClass

        await taskPageRepo.flush()

        return taskPage
    }

    @Mutation(() => TaskPage)
    async createTaskPage(
        @Arg("name") name: string,
        @Arg("colorClass") colorClass: string,
        @Ctx() { taskPageRepo }: MyContext
    ): Promise<TaskPage> {
        const taskPage = await taskPageRepo.create({name, colorClass})
        await taskPageRepo.persistAndFlush(taskPage)
        return taskPage
    }

    

    @Mutation(() => Boolean)
    async deleteTaskPage(
        @Arg("id") id: number,
        @Ctx() { taskPageRepo }: MyContext
    ): Promise<boolean> {
        let taskPage = await taskPageRepo.getReference(id)
        await taskPageRepo.removeAndFlush(taskPage)
        return true
    }
}