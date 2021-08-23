import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../../types";
import { Task } from "../entities/Task";
import { TaskCreateInput } from "../inputs/taskInput";
// import { SubtaskInput } from "../objects/Subtask";
// import { TagInput, TagMutationInput } from "../objects/Tag";

// Querys: getting data
// Mutations: updating / creating / deleting data
@Resolver(() => Task)
export class TasksResolver {
    @Query(() => [Task], {nullable: true}) 
    getAllTasks(
        @Ctx() { taskRepo }: MyContext
    ): Promise<Task[] | null> {
        return taskRepo.findAll({populate: true})
    }

    @Query(() => Task, {nullable: true}) 
    getTask(
        @Arg("id") id: number,
        @Ctx() { taskRepo }: MyContext
    ): Promise<Task | null> {
        return taskRepo.findOne({ id }, {populate: true})
    }

    @Mutation(() => Task) 
    async createTask(
        @Arg("data") taskData: TaskCreateInput,
        @Arg("groupId") groupId: number,
        @Ctx() { taskRepo, taskGroupRepo }: MyContext
    ): Promise<Task | null> {
        const taskGroup = await taskGroupRepo.getReference(groupId)
        const newTask = taskRepo.create({
            ...taskData,
            group: taskGroup
        })
        taskRepo.persist(newTask)
        await taskRepo.flush()
        await taskGroupRepo.flush()
        return newTask
    }


    @Mutation(() => Task) 
    async updateTask(
        @Arg("data") taskData: TaskCreateInput,
        @Arg("groupId") groupId: number,
        @Ctx() { taskRepo, taskGroupRepo }: MyContext
    ): Promise<Task | null> {
        const taskGroup = await taskGroupRepo.getReference(groupId)
        if(!taskGroup) return null
        const newTask = taskRepo.create({
            ...taskData,
            group: taskGroup
        })
        taskRepo.persist(newTask)
        await taskRepo.flush()
        await taskGroupRepo.flush()
        return newTask
    }


    // @Mutation(() => Task) 
    // async createTask(
    //     @Arg("title") title: string,
    //     @Arg("color") color: string,
    //     @Arg("isBookmarked") isBookmarked: boolean,
    //     @Arg("taskset") taskset: string,
    //     @Arg("tags", () => [TagInput], {nullable:true}) tags: TagInput[],
    //     @Arg("deadline",{nullable: true}) deadline: string,
    //     @Arg("subtasks", () => [SubtaskInput], {nullable:true}) subtasks: SubtaskInput[],
    //     @Ctx() { em }: MyContext
    // ): Promise<Task> {
    //     const task = em.create(Task, {
    //         title,
    //         color,
    //         isBookmarked,
    //         taskset,
    //         tags,
    //         deadline,
    //         subtasks,
    //     })
        
    //     await em.persistAndFlush(task) // post to DB
    //     console.log(task);
    //     return task
    // }

    // @Mutation(() => Task, { nullable: true}) // if none is found return null 
    // async updateTask(
    //     @Arg("id") id: number,
    //     @Arg("title", {nullable: true}) title: string,
    //     @Arg("color", {nullable: true}) color: string,
    //     @Arg("isBookmarked", {nullable: true}) isBookmarked: boolean,
    //     @Arg("taskset", {nullable: true}) taskset: string,
    //     @Arg("tagMutation", {nullable: true}) tagMutation: TagMutationInput,
    //     @Arg("deadline",{nullable: true}) deadline: Date,
    //     // @Arg("subtasks", {nullable: true}) subtasks: SubTask[],
    //     @Ctx() { em }: MyContext
    // ): Promise<Task | null> {
    //     const task = await em.findOne(Task, { id })

    //     // If nothing is found return null
    //     if(!task) return null

    //     if (title !== undefined) task.title = title
    //     if (color !== undefined) task.color = color
    //     if (isBookmarked !== undefined) task.isBookmarked = isBookmarked
    //     if (taskset !== undefined) task.taskset = taskset
    //     if (tagMutation !== undefined) {
    //         switch (tagMutation.method) {
    //             case("add"):
    //             const tagToAdd = tagMutation.tag
    //                 if (task.tags) {
    //                     // If tags are not null and the object isn't in the array: yet add it to the array
    //                     if (!objectInArray(task.tags, tagToAdd)) task.tags.push(tagToAdd)
    //                     // If the array already has this tag: throw this error
    //                     else throw new DuplicateTagError("You can't create duplicate tags")
    //                 }
    //                 else task.tags = [tagToAdd]
    //                 break
    //             case("delete"):
    //                 let filteredTags;
    //                 // if (task.tags && (filteredTags = task.tags.filter(tag => !objectsAreEqual(tag, tagMutation.tag)))) {}
    //                 task.tags = (task.tags && (filteredTags = task.tags.filter(tag => !objectsAreEqual(tag, tagMutation.tag))))
    //                     ? filteredTags 
    //                     : null
    //         }
    //     }
    //     if (deadline !== undefined) task.deadline = deadline
    //     // if (subtasks !== undefined) post.subtasks = subtasks
       
       
    //     // Finally update the task
    //     await em.persistAndFlush(task) // post to DB
    //     return task
    // }
}