import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';
import { Review, ReviewSchema } from './schemas/review.schema';
import { AuditLogModule } from 'src/audit/audit-log.module';
import { NLPModule } from 'src/nlp/nlp.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  AuditLogModule,
  NLPModule
],
  providers: [ReviewsResolver, ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
