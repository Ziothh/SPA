import { Collection, DateType, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { Subtask } from "./Subtask";
import { TaskGroup } from "./TaskGroup";
// import { Field, ID, ObjectType } from "type-graphql"; 
import { TaskTag } from "./TaskTag";


// Will compile the class name to lowercase to match the table name
// Will compile variables: testVal => test_val
@ObjectType()
@Entity({ tableName:"tasks" })
export class Task {
    @Field(() => ID)
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property()
    title: string;

    @Field(() => String)
    @Property()
    color: string;

    @Field(() => Date, {nullable: true})
    @Property({type: DateType, nullable: true})
    deadline?: Date;

    @Field(() => [Subtask])
    @OneToMany(() => Subtask, subtask => subtask.task, {orphanRemoval: true})
    subtasks = new Collection<Subtask>(this)
    
    @Field(() => [TaskTag])
    @OneToMany(() => TaskTag, tag => tag.task, {orphanRemoval: true})
    tags = new Collection<TaskTag>(this)

    @Field(() => TaskGroup)
    @ManyToOne(() => TaskGroup)
    group: TaskGroup
    
    constructor(title: string, color: string, group: TaskGroup, deadline?: Date) {
        this.title = title
        this.color = color
        this.group = group
        this.deadline = deadline
    }
}
