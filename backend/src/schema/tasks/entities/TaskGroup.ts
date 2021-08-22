import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Task } from "./Task";
import { TaskPage } from "./TaskPage";

@Entity({tableName: "task_groups"})
export class TaskGroup {
    @PrimaryKey()
    id!: number

    @Property({unique: true})
    name: string

    @ManyToOne(() => TaskPage)
    page: TaskPage

    @OneToMany(() => Task, task => task.group)
    tasks = new Collection<Task>(this)
   
    constructor(name: string, page: TaskPage) {
        this.name = name
        this.page = page
    }
}