import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const { name, email, role } = createUserInput;
    return this.usersService.createUser(name, email, role);
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
