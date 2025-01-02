// audit-log.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog } from './audit-log.schema';

@Injectable()
export class AuditLogService {
  constructor(@InjectModel(AuditLog.name) private auditLogModel: Model<AuditLog>) {}

  async logAction(
    // action: string,
    // userId: string,
    resource: string,
    resourceId: string,
    details?: string,
  ): Promise<AuditLog> {
    return this.auditLogModel.create({  resource, resourceId, details });
  }
  //action, userId,
}
