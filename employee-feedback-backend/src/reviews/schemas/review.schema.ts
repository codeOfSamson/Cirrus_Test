import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

export type ReviewDocument = Review & Document;

@Schema()
@ObjectType() // Makes this class a GraphQL Object Type
export class Review {
  @Field(() => ID) // Marks this as a GraphQL ID field
  id: string;

  @Prop({ required: true })
  @Field(() => String) // Exposes this as a String in the GraphQL schema
  reviewer: string;

  @Prop({ required: true })
  @Field(() => String)
  reviewee: string;

  @Prop({ enum: ['PENDING', 'COMPLETED'], default: 'PENDING' })
  @Field(() => String)
  status: string;

  @Prop()
  @Field(() => String, { nullable: true }) // Nullable in GraphQL
  feedback?: string;@Prop()

  @Field(() => Number, { nullable: true }) // Nullable in GraphQL
  rating?: Number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
