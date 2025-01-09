import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service'; 
import { User } from '../users/schema/user.schema';
import { AuditLogService } from '../audit/audit-log.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly auditLogService: AuditLogService,

  ) {}

  // Login Method
  async validateUser(email: string, password: string): Promise<any> {

    // await this.auditLogService.logAction(
    //   'VALIDATE_USER',
    //   email,
    //   'password',
    //    password,
    //   `${createReviewDto.reviewee}`,
    // );

  const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    throw new UnauthorizedException('Invalid email or password');
  }

  // Generate JWT token
  async login(user: User) {
    console.log(4, user.name)

    const payload = { email: user.email, sub: user.id, role: user.role };
    console.log('PL', payload)
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
