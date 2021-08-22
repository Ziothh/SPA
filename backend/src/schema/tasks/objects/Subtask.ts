import { Field, InputType, ObjectType } from "type-graphql"

@ObjectType()
export class Subtask {
    @Field(() => String)
    title: string

    @Field(() => String)
    isCompleted: boolean
}

@InputType()
export class SubtaskInput {
    @Field()
    title: string
    
    @Field()
    isCompleted: boolean
}

@InputType()
export class SubtaskMutationInput {
    @Field()
    method: "add" | "delete"

    @Field()
    tag: SubtaskInput
}