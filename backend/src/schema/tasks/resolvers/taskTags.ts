import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../../types";
import { TaskTag } from "../entities/TaskTag";

// Querys: getting data
// Mutations: updating / creating / deleting data
@Resolver(() => TaskTag)
export class TaskTagResolver {
    @Query(() => [TaskTag], {nullable: true}) 
    getAllTaskTags(
        @Ctx() { taskTagRepo }: MyContext
    ): Promise<TaskTag[] | null> {
        return taskTagRepo.findAll({populate: true})
    }

    @Query(() => TaskTag, {nullable: true}) 
    getTaskTag(
        @Arg("id") id: number,
        @Ctx() { taskTagRepo }: MyContext
    ): Promise<TaskTag | null> {
        return taskTagRepo.findOne({ id }, {populate: true})
    }

    @Mutation(() => TaskTag) 
    async createTaskTag(
        @Arg("title") title: string,
        @Arg("color") color: string,
        @Arg("taskId") taskId: number,
        @Ctx() { taskRepo, taskTagRepo }: MyContext
    ): Promise<TaskTag | null> {
        const task = await taskRepo.getReference(taskId)
        const newTaskTag = taskTagRepo.create({
            title,
            color,
            task
        })
        taskTagRepo.persist(newTaskTag)
        await taskTagRepo.flush()
        await taskRepo.flush()
        return newTaskTag
    }

    @Mutation(() => TaskTag) 
    async updateTaskTag(
        @Arg("id") id: number,
        @Arg("title", {nullable: true}) title: string,
        @Arg("color", {nullable: true}) color: string,
        @Ctx() { taskTagRepo }: MyContext
    ): Promise<TaskTag | null> {
        const taskTag = await taskTagRepo.findOne(id)
        if(!taskTag) return null
        if (title) taskTag.title = title
        if (color) taskTag.color = color
        await taskTagRepo.flush()
        return taskTag
    }
}