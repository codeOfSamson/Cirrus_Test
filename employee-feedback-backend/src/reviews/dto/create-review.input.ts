import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  reviewerId: string; // ID of the user giving feedback

  @Field(() => String)
  userId: string; // ID of the user being reviewed

  @Field(() => String)
  feedback: string; // The feedback text

  @Field(() => Int)
  rating: number; // Rating (1-5)
}
