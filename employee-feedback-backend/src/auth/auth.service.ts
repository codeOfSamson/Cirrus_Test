import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service'; 
import { User } from '../users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Login Method
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log(user)
    // Fetch user from DB
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result; // Return user details excluding password
    }
    console.log(2, user)

    throw new UnauthorizedException('Invalid email or password');
  }

  // Generate JWT token
  async login(user: User) {
    console.log(3, user)
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
