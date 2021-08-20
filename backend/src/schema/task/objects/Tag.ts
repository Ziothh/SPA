import { Field, InputType, ObjectType } from "type-graphql"

@ObjectType()
export class TaskTag {
    @Field(() => String)
    title: string

    @Field(() => String)
    color: string
}

@InputType()
export class TagInput {
    @Field()
    title: string
    
    @Field()
    color: string
}