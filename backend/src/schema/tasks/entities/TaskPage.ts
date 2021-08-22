import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { TaskGroup } from "./TaskGroup";

@Entity({tableName: "task_pages"})
export class TaskPage {
    @PrimaryKey()
    id!: number

    @Property({unique: true})
    name: string

    @Property({type: Boolean})
    isBookmarked = false

    @OneToMany(() => TaskGroup, group => group.page)
    taskGroups = new Collection<TaskGroup>(this)

    constructor(name: string) {
        this.name = name
    }
}