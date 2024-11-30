import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './models/review.model';
import { CreateReviewInput } from './dto/create-review.input';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  // Get all reviews
  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  // Create a new review
  async create(createReviewInput: CreateReviewInput): Promise<Review> {
    const createdReview = new this.reviewModel({
      ...createReviewInput,
      createdAt: new Date(),
    });
    return createdReview.save();
  }
}
