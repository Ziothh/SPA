import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { Task } from "./Task";

@ObjectType({description: "A subtask of a task"})
@Entity({ tableName: "subtasks" })
export class Subtask {
    @Field(() => ID)
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property()
    title: string;

    @Field(() => String)
    @Property({type: Boolean, default: false})
    isCompleted = false;

    @Field(() => Task)
    @ManyToOne(() => Task)
    task: Task

    constructor(title: string, task: Task) {
        this.title = title
        this.task = task
    }
}
