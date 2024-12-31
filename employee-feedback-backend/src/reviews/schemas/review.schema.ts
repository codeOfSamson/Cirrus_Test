import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'src/users/schema/user.schema';
import { Schema as MongooseSchema } from 'mongoose'; // Import Schema from mongoose for ObjectId


export type ReviewDocument = Review & Document;

@Schema()
@ObjectType() // Makes this class a GraphQL Object Type
export class Review {
  @Field(() => ID) // Marks this as a GraphQL ID field
  id: string;

  @Prop({ nullable: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User) // Exposes this as a reference to the User in GraphQL
  reviewer: User; // This field now references a User object

  @Prop({ nullable: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User) // Exposes this as a reference to the User in GraphQL
  reviewee: User; // This field now references a User object

  @Prop({ enum: ['PENDING', 'COMPLETED'], default: 'PENDING' })
  @Field(() => String)
  status: string;

  @Prop()
  @Field(() => String, { nullable: true }) // Nullable in GraphQL
  feedback?: string;

  @Prop()
  @Field(() => Number, { nullable: true }) // Nullable in GraphQL
  rating?: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
