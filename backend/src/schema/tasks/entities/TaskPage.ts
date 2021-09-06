import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { TaskGroup } from "./TaskGroup";

@ObjectType({description: "Pages of tasks, sorted by TaskGroup"})
@Entity({tableName: "task_pages"})
export class TaskPage {
    @Field(() => ID)
    @PrimaryKey()
    id!: number

    @Field(() => String)
    @Property({unique: true})
    name: string

    @Field(() => Boolean)
    @Property({type: Boolean, default: false})
    isBookmarked = false

    @Field(() => String)
    @Property({type: String})
    colorClass: string

    @Field(() => [TaskGroup])
    @OneToMany(() => TaskGroup, group => group.page, {orphanRemoval: true,})
    taskGroups = new Collection<TaskGroup>(this)

    constructor(name: string) {
        this.name = name
    }
}