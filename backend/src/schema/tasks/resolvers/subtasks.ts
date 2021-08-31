import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../../types";
import { Subtask } from "../entities";

// Querys: getting data
// Mutations: updating / creating / deleting data
@Resolver(() => Subtask)
export class SubtasksResolver {
    @Query(() => [Subtask], {nullable: true}) 
    getAllSubtasks(
        @Ctx() { subtaskRepo }: MyContext
    ): Promise<Subtask[] | null> {
        return subtaskRepo.findAll({populate: true})
    }

    @Query(() => Subtask, {nullable: true})  
    getSubtask(
        @Arg("id") id: number,
        @Ctx() { subtaskRepo }: MyContext
    ): Promise<Subtask | null> {
        return subtaskRepo.findOne({ id }, {populate: true})
    }

    @Mutation(() => Subtask) 
    async createSubtask(
        @Arg("title") title: string,
        @Arg("taskId") taskId: number,
        @Ctx() { taskRepo, subtaskRepo }: MyContext
    ): Promise<Subtask | null> {
        const task = await taskRepo.getReference(taskId)
        const newSubtask = subtaskRepo.create({
            title,
            task
        })
        subtaskRepo.persist(newSubtask)
        await subtaskRepo.flush()
        await taskRepo.flush()
        return newSubtask
    }

    @Mutation(() => Subtask) 
    async updateSubtask(
        @Arg("id") id: number,
        @Arg("title", {nullable: true}) title: string,
        @Arg("isCompleted", {nullable: true}) isCompleted: boolean,
        @Ctx() { subtaskRepo }: MyContext
    ): Promise<Subtask | null> {
        const subtask = await subtaskRepo.findOne(id)
        if(!subtask) return null
        if (title) subtask.title = title
        if (isCompleted) subtask.isCompleted = isCompleted
        await subtaskRepo.flush()
        return subtask
    }
}