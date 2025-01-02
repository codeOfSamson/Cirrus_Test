// audit-log.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { AuditLogService } from './audit-log.service';
import { AuditLog } from './schemas/audit-log.schema';

@Resolver()
export class AuditLogResolver {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Query(() => [AuditLog], {name: 'getAuditLogs'})
  async getAuditLogs() {
    return this.auditLogService.findAll();
  }
}
