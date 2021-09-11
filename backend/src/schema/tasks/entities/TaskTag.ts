import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { Task } from "./Task";

@ObjectType({description: "Tasktag of a task"})
@Entity({ tableName:"task_tags" })
export class TaskTag {
    @Field(() => ID)
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property()
    title: string;

    @Field(() => String)
    @Property()
    color: string;

    @Field(() => Task)
    @ManyToOne(() => Task)
    task: Task;

    constructor(title: string, color: string,  task: Task) {
        this.title = title,
        this.color = color
        this.task = task
    }
}
