// audit-log.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AuditLog extends Document {
  @Prop({ required: false })
  action: string; // e.g., "CREATE_REVIEW", "DELETE_USER"

  @Prop({ required: false })
  userId: string; // The user performing the action

  @Prop({ required: false })
  resource: string; // e.g., "Review", "User"

  @Prop({ required: false })
  resourceId: string; // ID of the affected resource

  @Prop({ required: false })
  details: string; // Optional field for additional context
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
