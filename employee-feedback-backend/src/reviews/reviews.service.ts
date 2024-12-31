import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const newReview = new this.reviewModel(createReviewDto);
    console.log('nr', newReview)
    return newReview.save();
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find()
    .populate('reviewer')
    .populate('reviewee')
    .exec();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException(`Review with ID "${id}" not found.`);
    }
    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const updatedReview = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .populate('reviewer') // Populate reviewer field
      .populate('reviewee')
      .exec();

    if (!updatedReview) {
      throw new NotFoundException(`Review with ID "${id}" not found.`);
    }
    return updatedReview;
  }

  async remove(id: string): Promise<void> {
    const result = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Review with ID "${id}" not found.`);
    }
  }
}
