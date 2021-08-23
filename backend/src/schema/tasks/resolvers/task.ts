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
        @Arg("id") id: number,
        @Arg("data") newData: TaskCreateInput,
        @Ctx() { taskRepo }: MyContext
    ): Promise<Task | null> {
        const task = await taskRepo.findOne(id)
        if(!task) return null
        if (newData.title) task.title = newData.title
        if (newData.color) task.color = newData.color
        if (newData.deadline) task.deadline = newData.deadline
        await taskRepo.flush()
        return task
    }

    @Mutation(() => Task) 
    async switchTaskGroup(
        @Arg("id") id: number,
        @Arg("groupId") groupId: number,
        @Ctx() { taskRepo, em, taskGroupRepo }: MyContext
    ): Promise<Task | null> {
        const task = await taskRepo.findOne(id)
        const taskGroup = await taskGroupRepo.getReference(groupId)
        if(!task) return null
        task.group = taskGroup
        await em.flush()
        return task
    }
}