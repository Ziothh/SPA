/// <reference types="tasks"/>
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { TaskTag } from "../objects/Tag";


// Will compile the class name to lowercase to match the table name
// Will compile variables: testVal => test_val
@ObjectType() //graphql
@Entity({ tableName:"tasks" }) //mikro-orm
export class Task {
    @Field(() => ID)
    @PrimaryKey({ })
    id!: number;

    @Field(() => String)
    @Property({type: "text"})
    title: string;

    @Field(() => String)
    @Property()
    taskset:  string

    @Field(() => String)
    @Property({type: "text"})
    color: string;

    @Field(() => [TaskTag], {nullable: true})
    @Property({ nullable: true})
    tags?: TaskTag[];

    // @Field(() => [TaskTag], {nullable: true, name: "tagss"})
    // TaskTags(@Root() task: Task): TaskTag[]  {
    //     return task.tags ? JSON.parse(task.tags) : null
    // }

    @Field({nullable: true})
    @Property({ nullable: true, type: "date" })
    deadline?: Date;

    @Field(() => Boolean)
    @Property()
    isBookmarked: boolean;

    @Field({nullable: true})
    @Property({nullable: true})
    subtasks?: string;

}
