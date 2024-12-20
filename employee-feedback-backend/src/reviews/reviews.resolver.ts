import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './schemas/review.schema';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  async createReview(@Args('createReviewDto') createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewsService.create(createReviewDto);
  }

  @Query(() => [Review])
  async getAllReviews(): Promise<Review[]> {
    return this.reviewsService.findAll()
  }

  @Query(() => Review)
  async getReview(@Args('id') id: string): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Mutation(() => Review)
  async updateReview(
    @Args('id') id: string,
    @Args('updateReviewDto') updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Mutation(() => Boolean)
  async deleteReview(@Args('id') id: string): Promise<boolean> {
    await this.reviewsService.remove(id);
    return true;
  }
}
