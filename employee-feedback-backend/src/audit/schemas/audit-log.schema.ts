import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class AuditLog {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true }) // GraphQL-compatible annotation
  @Prop({ required: false })
  action: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  userId?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  resource?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  resourceId?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  details?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  ipAddress?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  userAgent?: string; 

  @Field({ nullable: true })
  @Prop({ required: false })
  location?: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  timestamp?: string;

  @Field({ nullable: true })
  @Prop({ required: false, enum: ['Pending', 'Success', 'Failed'] })
  outcome?: string;

  @Field({ nullable: true }) // Timestamp from Mongoose
  createdAt?: Date;

  @Field({ nullable: true }) // Timestamp from Mongoose
  updatedAt?: Date;
}

export type AuditLogDocument = AuditLog & Document;
export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
