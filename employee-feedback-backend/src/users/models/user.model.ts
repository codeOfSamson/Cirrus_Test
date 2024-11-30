import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string; // User's name

  @Field(() => String)
  email: string; // User's email address
}
