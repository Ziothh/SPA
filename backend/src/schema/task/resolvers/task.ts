import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../entities/Task";
import { MyContext } from "../../types";
import { TagInput } from "../objects/Tag";

// Querys: getting data
// Mutations: updating / creating / deleting data

@Resolver()
export class TasksResolver {
    @Query(() => Task, {nullable: true}) 
    getTask(
        @Arg("id") id: number,
        @Ctx() { em }: MyContext
    ): Promise<Task | null> {
        return em.findOne(Task, { id })
    }

    @Query(() => [Task], {nullable: true}) 
    getAllTasks(
        @Ctx() { em }: MyContext
    ): Promise<Task[] | null> {
        return em.find(Task, {})
    }

    @Mutation(() => Task) 
    async createTask(
        @Arg("title") title: string,
        @Arg("color") color: string,
        @Arg("isBookmarked") isBookmarked: boolean,
        @Arg("taskset") taskset: string,
        @Arg("tags", () => [TagInput], {nullable:true}) tags: TagInput[],
        @Arg("deadline",{nullable: true}) deadline: string,
        @Arg("subtasks", {nullable: true}) subtasks: string,
        @Ctx() { em }: MyContext
    ): Promise<Task> {
        
        const task = em.create(Task, {
            title,
            color,
            isBookmarked,
            taskset,
            tags,
            deadline,
            subtasks,
        })
        
        await em.persistAndFlush(task) // post to DB
        console.log(task);
        return task
    }

    // @Mutation(() => Task, { nullable: true}) // if none is found return null 
    // async updateTask(
    //     @Arg("id") id: number,
    //     @Arg("title", {nullable: true}) title: string,
    //     @Arg("color", {nullable: true}) color: string,
    //     @Arg("isBookmarked", {nullable: true}) isBookmarked: boolean,
    //     @Arg("taskset", {nullable: true}) taskset: string,
    //     @Arg("tags", {nullable: true}) tags: TaskTag,
    //     @Arg("deadline",{nullable: true}) deadline: Date,
    //     @Arg("subtasks", {nullable: true}) subtasks: SubTask[],
    //     @Ctx() { em }: MyContext
    // ): Promise<Task | null> {
    //     const post = await em.findOne(Task, { id })
    //     if(!post) {return null}

    //     if (typeof title !== "undefined") post.title = title
    //     if (typeof color !== "undefined") post.color = color
    //     if (typeof isBookmarked !== "undefined") post.isBookmarked = isBookmarked
    //     if (typeof taskset !== "undefined") post.taskset = taskset
    //     if (typeof tags !== "undefined") post.tags = tags
    //     if (typeof deadline !== "undefined") post.deadline = deadline
    //     if (typeof subtasks !== "undefined") post.subtasks = subtasks

    //     const updatedPost = em.create(Task, {
    //         title,
    //         color,
    //         isBookmarked,
    //         taskset,
    //         tags,
    //         deadline,
    //         subtasks,
    //     })
    //     await em.persistAndFlush(updatedPost) // post to DB
    //     return post
    // }
}