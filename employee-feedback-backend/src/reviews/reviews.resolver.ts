import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './models/review.model';
import { CreateReviewInput } from './dto/create-review.input';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(() => [Review])
  async getReviews(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Mutation(() => Review)
  async createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ): Promise<Review> {
    return this.reviewsService.create(createReviewInput);
  }
}
