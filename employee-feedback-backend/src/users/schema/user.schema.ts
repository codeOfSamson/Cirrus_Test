import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType() // This decorator makes the class a GraphQL type
export class User {
  @Field(() => ID) // Marks this as the GraphQL ID field
  id: string;

  @Prop({ required: true })
  @Field(() => String) // Marks this as a GraphQL String field
  name: string;

  @Prop({ required: true, unique: true })
  @Field(() => String)
  email: string;

  @Prop({ required: true, enum: ['admin', 'employee'] })
  @Field(() => String)
  role: string; // Role can be "admin" or "employee"
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
