import { Collection, DateType, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { TaskGroup } from "./TaskGroup";
// import { Field, ID, ObjectType } from "type-graphql"; 
import { TaskTag } from "./TaskTag";


// Will compile the class name to lowercase to match the table name
// Will compile variables: testVal => test_val
// @ObjectType() //graphql
@ObjectType()
@Entity({ tableName:"tasks" }) //mikro-orm
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

    @Field(() => Date,{nullable: true})
    @Property({type: DateType, nullable: true})
    deadline?: Date;

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

    // @Field(() => [TaskTag], {nullable: true})
    // @OneToMany({ entity: () => TaskTag, mappedBy: 'task', orphanRemoval: true })
    // tags = new Collection<TaskTag>(this)

    // @Field(() => Boolean)
    // @Property()
    // isBookmarked: boolean;

    // @Field(() => [Subtask], {nullable: true})
    // @Property({ nullable: true})
    // subtasks?: Subtask[] | null;

}
