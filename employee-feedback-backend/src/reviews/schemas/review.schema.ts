import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ required: true })
  reviewer: string;

  @Prop({ required: true })
  reviewee: string;

  @Prop({ enum: ['PENDING', 'COMPLETED'], default: 'PENDING' })
  status: string;

  @Prop()
  feedback: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
