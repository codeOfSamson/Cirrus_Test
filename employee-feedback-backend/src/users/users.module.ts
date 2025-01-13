import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './../users/schema/user.schema'
import { UsersResolver } from './users.resolver';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
//import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),  
    JwtModule.register({
      secret: process.env.JWT_SECRET||'04f03127694304565195b006b4597e45ea20ab9dc3f93b05b60d1cb5b70cb35a', // Ensure this matches the secret used to sign the token
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  controllers: [],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
