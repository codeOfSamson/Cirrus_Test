import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Review {
  @Field(() => String)
  id: string;

  @Field(() => String)
  reviewerId: string;  // Reference to the Employee who gives feedback

  @Field(() => String)
  employeeId: string;  // Reference to the Employee being reviewed

  @Field(() => String)
  feedback: string;    // The feedback given by the reviewer

  @Field(() => String)
  status: string;    // The feedback given by the reviewer

}
