import { Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './../users/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async createUser(name: string, email: string, password: string, role: string): Promise<User> {
    const newUser = new this.userModel({ name, email, password, role });
    return newUser.save();
  }

  async validateUser(email: string, password: string): Promise<string> {
    const user = await this.findByEmail(email);
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, email: user.email, role: user.role };
      return this.jwtService.sign(payload); 
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async generateToken(user: User): Promise<string> {
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
