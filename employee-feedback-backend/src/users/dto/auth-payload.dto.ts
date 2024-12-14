import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../schema/user.schema';

@ObjectType()
export class AuthPayload {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
