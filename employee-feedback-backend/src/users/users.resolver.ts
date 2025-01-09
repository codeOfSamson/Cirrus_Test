import { Resolver, Query, Mutation, Args, Context, ObjectType } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthPayload } from './dto/auth-payload.dto';
import { GqlAuthGuard } from 'src/auth/guards/GqlAuthGaurd';
import { UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';


@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  private readonly authService: AuthService
  ) {}


  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const { name, email, password, role } = createUserInput;
    return this.usersService.createUser(name, email, password, role);
  }

  @Mutation(() => AuthPayload)
  async login(
    @Args('email') email: string, 
    @Args('password') password: string,
   // @Args('userId') userId: string
  ) {
   // console.log('made It: userId', userId, '!')
    const user = await this.authService.validateUser(email, password);
    const { access_token } = await this.authService.login(user); // Generate the JWT after validation    
    return {access_token, user}; // Return the JWT as a string
  }

  // Me Query
  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard) // Using custom guard
  async me(@Context('req') req): Promise<User> {
    return req.user; 
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserInput);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
