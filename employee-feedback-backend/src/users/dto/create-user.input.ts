import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string; // User's name

  @Field(() => String)
  email: string; // User's email

  @Field(() => String)
  role: string; // User's role
}
