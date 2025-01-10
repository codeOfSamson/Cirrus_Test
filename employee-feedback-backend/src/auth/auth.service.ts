import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { User } from '../users/schema/user.schema';
import { AuditLogService } from '../audit/audit-log.service';
import { UAParser } from 'ua-parser-js';
import { GeoLocationService } from 'src/geo-location/geo-location.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly auditLogService: AuditLogService,
    private readonly geoLocationService: GeoLocationService, 
  ) {}

  // Validate User (Login Attempt)
  async validateUser(email: string, password: string, req: Request): Promise<any> {
    const timestamp = new Date().toISOString();
    const takeFirstIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
    const ipAddress= takeFirstIp[0]


    const rawUserAgent = req.headers['user-agent'] || 'Unknown';
    const parser = new UAParser(rawUserAgent);
    const parsedUserAgent = parser.getResult();
    
    const userAgentDetails = `Browser: ${parsedUserAgent.browser.name} ${parsedUserAgent.browser.version}, OS: ${parsedUserAgent.os.name} ${parsedUserAgent.os.version}`;
    

    // Get approximate location (using IP-based geolocation service)
    //hardcoding a fake ip for development and dev purposes
    const locationRes = await this.geoLocationService.getGeolocation('128.101.101.101');
    const location = JSON.stringify(locationRes?.data)
   
   // Log the login attempt details
    await this.auditLogService.logAction({
      action: 'VALIDATE_USER',
      timestamp,
      ipAddress,
      userAgent: userAgentDetails,
      location,
      outcome: 'Pending', // Set to 'Success' or 'Failed' based on validation
    });

    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Update the log with a successful outcome
      // await this.auditLogService.logAction({
      //   action: 'VALIDATE_USER',
      //   timestamp,
      //   ipAddress,
      //   userAgent: userAgentDetails,
      //   location,
      //   outcome: 'Success',
      // });

      return user;
    }

    // Update the log with a failed outcome
    // await this.auditLogService.logAction({
    //   action: 'VALIDATE_USER',
    //   timestamp,
    //   ipAddress,
    //   userAgent: userAgentDetails,
    //   location,
    //   outcome: 'Failed',
    // });

    throw new UnauthorizedException('Invalid email or password');
  }

  // Generate JWT token
  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
