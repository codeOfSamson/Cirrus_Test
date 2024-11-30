import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './../users/schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(name: string, email: string, role: string): Promise<User> {
    const newUser = new this.userModel({ name, email, role });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
