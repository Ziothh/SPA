import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { Task } from "./Task";
import { TaskPage } from "./TaskPage";
@ObjectType({description: "Group of tasks inside a TaskPage"})
@Entity({tableName: "task_groups"})
export class TaskGroup {
    @Field(() => ID)
    @PrimaryKey()
    id!: number

    @Field(() => String)
    @Property({unique: false})
    name: string

    @Field(() => TaskPage)
    @ManyToOne(() => TaskPage)
    page: TaskPage

    @Field(() => [Task])
    @OneToMany(() => Task, task => task.group, {orphanRemoval: true, lazy: true})
    tasks = new Collection<Task>(this)
   
    constructor(name: string, page: TaskPage) {
        this.name = name
        this.page = page
    }
}