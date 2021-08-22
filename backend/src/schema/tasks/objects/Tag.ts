import { Field, ID, InputType, ObjectType } from "type-graphql"

// @ObjectType()
// export class TaskTag {
//     @Field(() => ID)
//     id!: number

//     @Field(() => String)
//     title: string

//     @Field(() => String)
//     color: string
// }

// @InputType()
// export class TagInput {
//     @Field()
//     title: string
    
//     @Field()
//     color: string
// }
// @InputType()
// export class TagMutationInput {
//     @Field()
//     method: "add" | "delete" | "update"

//     @Field()
//     tag: TagInput
// }