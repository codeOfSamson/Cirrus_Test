import { ObjectType, Field, Int } from '@nestjs/graphql';

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

  @Field(() => Int)
  rating: number;      // Rating (e.g., 1-5 scale)

  @Field(() => Date)
  createdAt: Date;     // Date when the review was created
}
