import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Task } from "./Task";

@Entity({ tableName:"task_tags" }) //mikro-orm
export class TaskTag {
    @PrimaryKey({ })
    id!: number;

    @Property({unique: true})
    title: string;

    @Property()
    color: string;

    @ManyToOne(() => Task)
    task: Task;

    constructor(title: string, color: string,  task: Task) {
        this.title = title,
        this.color = color
        this.task = task
    }
}
