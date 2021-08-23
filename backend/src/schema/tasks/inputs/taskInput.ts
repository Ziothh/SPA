import { Field, ID, InputType } from "type-graphql";


@InputType({ description: "New Task data" })
export class TaskCreateInput {
    @Field(() => String)
    title: string;

    @Field(() => String)
    color: string;

    @Field(() => Date,{nullable: true})
    deadline?: Date;
}

@InputType({ description: "Updated Task data" })
export class TaskUpdateInput {
    @Field(() => String, {nullable: true})
    title?: string;

    @Field(() => String, {nullable: true})
    color?: string;

    @Field(() => Date, {nullable: true})
    deadline?: Date;

    @Field(() => ID, {nullable: true})
    groupId?: number
}