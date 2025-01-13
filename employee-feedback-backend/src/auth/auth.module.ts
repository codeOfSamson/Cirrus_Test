import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuditLogModule } from 'src/audit/audit-log.module';
import { GeoLocationModule } from 'src/geo-location/geo-location.module';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UsersModule),  // Use forwardRef() to avoid circular dependency
    JwtModule.register({
      secret: process.env.JWT_SECRET || '04f03127694304565195b006b4597e45ea20ab9dc3f93b05b60d1cb5b70cb35a', // Ensure this matches the secret used to sign the token
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
    GeoLocationModule,
    AuditLogModule,
    
    
  
  ],
  providers: [AuthService, JwtStrategy], // Register the strategy
  exports: [AuthService],
})
export class AuthModule {}
