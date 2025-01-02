// audit-log.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLog, AuditLogSchema } from './schemas/audit-log.schema';
import { AuditLogService } from './audit-log.service';
import { AuditLogResolver } from './audit-log.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuditLog.name, schema: AuditLogSchema }]),
  ],
  providers: [AuditLogService, AuditLogResolver],
  exports: [AuditLogService, AuditLogResolver],
})
export class AuditLogModule {}
